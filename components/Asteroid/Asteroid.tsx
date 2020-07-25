import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame, CanvasContext } from 'react-three-fiber';
import { CENTER_RADIUS, MAX_RADIUS, MIN_RADIUS } from '../../utils/constants';
import { assertExists } from '../../utils/utils';
import { Vectors } from '../../utils/vectorUtils';
import { useSpring, a, config } from 'react-spring/three';

export const ASTEROID_RADIUS = CENTER_RADIUS / 3;

const ANG_VELOCITY = 1;
const RAD_VELOCITY = 1;
const MAX_ANG_STEP = 0.2;
const MAX_RAD_STEP = MIN_RADIUS;

interface AsteroidTranform {
    ang: number;
    rad: number;
    initialPosition: THREE.Vector3;
}

export interface AsteroidProps {
    id: number;
    normalVector: THREE.Vector3;
    isLive: boolean;
    mesh: React.RefObject<THREE.Mesh>;
    dispose(): void;
}

export const Asteroid: React.FC<AsteroidProps> = ({ mesh, normalVector, isLive, dispose }) => {
    const transform = useRef<AsteroidTranform>(initialTransform(normalVector));

    const { spring } = useSpring({
        spring: Number(isLive),
        config: config.stiff,
    });

    useEffect(() => {
        transform.current = initialTransform(normalVector);
    }, [normalVector]);

    useFrame((_state: CanvasContext, delta: number) => {
        assertExists(mesh.current);
        if (!isLive) {
            return;
        }

        transform.current.rad += THREE.MathUtils.clamp(delta * RAD_VELOCITY, 0, MAX_RAD_STEP);
        transform.current.ang += THREE.MathUtils.clamp(delta * ANG_VELOCITY, 0, MAX_ANG_STEP);

        const { rad, ang, initialPosition } = transform.current;

        if (rad > MAX_RADIUS) {
            transform.current = initialTransform(normalVector);
            dispose();
            return;
        }

        mesh.current.position.copy(initialPosition);
        mesh.current.position.setLength(rad);
        mesh.current.position.applyAxisAngle(normalVector, ang);
    });

    return (
        <a.mesh ref={mesh} scale-x={spring} scale-y={spring} scale-z={spring}>
            <sphereBufferGeometry attach="geometry" args={[ASTEROID_RADIUS, 10, 6]} />
            <meshBasicMaterial attach="material" color={0x2bfa2b} wireframe={true} />
        </a.mesh>
    );
};

const initialTransform = (normalVector: THREE.Vector3): AsteroidTranform => ({
    ang: 0,
    rad: CENTER_RADIUS,
    initialPosition: Vectors.randomOrthogonalUnit(normalVector),
});
