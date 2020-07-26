import React, { useRef, useMemo } from 'react';
import {
    useControls,
    KEYBOARD_MAPPING,
    Movements,
    readMovementSpring,
} from '../../hooks/useControls';
import { useFrame, useThree } from 'react-three-fiber';
import { assertExists } from '../../utils/utils';
import { MIN_RADIUS, MAX_RADIUS } from '../../utils/constants';
import * as THREE from 'three';
import { Vectors } from '../../utils/vectorUtils';
import { useLiveBullets } from '../Bullets/BulletContext';
import { useShip } from './ShipContext';

const MOVEMENT_EPSILON = 0.00001;

export const SHIP_RADIUS = 2;

/**
 * Consider making these stateful.
 * i.e: powerups could increase speed.
 */
const ORBIT_SPEED = 0.03;
const ROLL_SPEED = 0.03;
const FORWARDS_SPEED = 0.5;
const SHOT_RECOVERY_TIME = 0.15;
const CAMERA_DISTANCE = 2;
const CAMERA_INTERTIA_FACTOR = 0.8;

export const Ship: React.FC = () => {
    const { mesh } = useShip();
    const [moveStateSpring, moveStateSnap] = useControls(KEYBOARD_MAPPING);
    const { camera } = useThree();
    const shipGeometry = useShipGeometry();
    const shotDelta = useRef<number>(0);
    const { spawnBullet } = useLiveBullets();

    useFrame((_state, delta) => {
        updateDepth();
        updateOrbit();
        updateShots(delta);
        updateCamera();
    });

    const updateDepth = (): void => {
        assertExists(mesh.current);
        const moveState = readMovementSpring(moveStateSpring);

        const depthMovement = moveState[Movements.backwards] - moveState[Movements.forwards];
        if (Math.abs(depthMovement) > MOVEMENT_EPSILON) {
            const zOffset = depthMovement * FORWARDS_SPEED;

            let objectRadius = mesh.current.position.length();

            if (objectRadius + zOffset < MIN_RADIUS) {
                objectRadius = MIN_RADIUS;
            } else if (objectRadius + zOffset > MAX_RADIUS) {
                objectRadius = MAX_RADIUS;
            } else {
                objectRadius += zOffset;
            }

            mesh.current.position.setLength(objectRadius);
        }
    };

    const updateOrbit = (): void => {
        assertExists(mesh.current);
        const moveState = readMovementSpring(moveStateSpring);

        const xAxis = new THREE.Vector3();
        const yAxis = new THREE.Vector3();
        const zAxis = new THREE.Vector3();
        mesh.current.matrix.extractBasis(xAxis, yAxis, zAxis);

        const verticalOrbit = moveState[Movements.up] - moveState[Movements.down];
        const horizontalOrbit = moveState[Movements.right] - moveState[Movements.left];

        const verticalVector = xAxis.clone();
        verticalVector.multiplyScalar(verticalOrbit);
        const horizontalVector = yAxis.clone();
        horizontalVector.multiplyScalar(horizontalOrbit);

        const directionVector = new THREE.Vector3()
            .addVectors(verticalVector, horizontalVector)
            .clampLength(0, 1);
        const rotationAngle = directionVector.length();

        if (rotationAngle > MOVEMENT_EPSILON) {
            directionVector.normalize();
            mesh.current.position.applyAxisAngle(directionVector, rotationAngle * ORBIT_SPEED);
        }

        const roll = moveState[Movements.rollRight] - moveState[Movements.rollLeft];
        yAxis.applyAxisAngle(zAxis, roll * ROLL_SPEED);
        mesh.current.up.copy(yAxis);
        mesh.current.lookAt(0, 0, 0);
    };

    const updateShots = (delta: number) => {
        assertExists(shotDelta.current);
        assertExists(mesh.current);

        shotDelta.current += delta;

        if (
            shotDelta.current > SHOT_RECOVERY_TIME &&
            moveStateSnap.current[Movements.shoot] === 1
        ) {
            shotDelta.current = 0;
            spawnBullet(mesh.current.position.clone());
        }
    };

    const updateCamera = () => {
        assertExists(mesh.current);
        const followedPosition = mesh.current.position.clone();
        followedPosition.add(followedPosition.clone().normalize().multiplyScalar(CAMERA_DISTANCE));
        const newPosition = new THREE.Vector3().lerpVectors(
            camera.position,
            followedPosition,
            CAMERA_INTERTIA_FACTOR
        );
        camera.position.copy(newPosition);

        const newUp = Vectors.lerpRotateTowards(camera.up, mesh.current.up, CAMERA_INTERTIA_FACTOR);
        camera.up.copy(newUp);
        camera.lookAt(0, 0, 0);
    };

    return (
        <mesh ref={mesh} visible={true} geometry={shipGeometry} position={[0, 0, MIN_RADIUS]}>
            <meshBasicMaterial attach="material" color={0xfafafa} wireframe={true} />
        </mesh>
    );
};

const useShipGeometry = (): THREE.BufferGeometry => {
    return useMemo(() => {
        const geometry = new THREE.BufferGeometry();

        const frontPoint = [0, 0, 1];
        const backTop = [0, 0.25, 0];
        const backLeft = [-0.5, -0.25, 0];
        const backRight = [0.5, -0.25, 0];

        const vertices = new Float32Array([
            ...frontPoint,
            ...backTop,
            ...backLeft,

            ...frontPoint,
            ...backTop,
            ...backRight,

            ...frontPoint,
            ...backLeft,
            ...backRight,

            ...backTop,
            ...backLeft,
            ...backRight,
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        return geometry;
    }, []);
};
