import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame, CanvasContext } from 'react-three-fiber';
import { CENTER_RADIUS } from '../../utils/constants';
import { assertExists } from '../../utils/utils';

export const BULLET_RADIUS = CENTER_RADIUS / 20;

const BULLET_SPEED = 100;
const MAX_DISPLACEMENT = BULLET_SPEED;

interface BulletTransform {
    initialPosition: THREE.Vector3;
    rad: number;
}

export interface BulletProps {
    id: number;
    isLive: boolean;
    initialPosition: THREE.Vector3;
    mesh: React.RefObject<THREE.Mesh>;
    dispose(): void;
}

export const Bullet: React.FC<BulletProps> = ({ mesh, isLive, dispose, initialPosition }) => {
    const transform = useRef<BulletTransform>(initialTransform(initialPosition));

    useEffect(() => {
        transform.current = initialTransform(initialPosition);
    }, [initialPosition]);

    useFrame((_state: CanvasContext, delta: number) => {
        assertExists(mesh.current);
        if (!isLive) {
            return;
        }

        transform.current.rad -= THREE.MathUtils.clamp(delta * BULLET_SPEED, 0, MAX_DISPLACEMENT);

        const { rad, initialPosition } = transform.current;

        if (rad < CENTER_RADIUS) {
            transform.current = initialTransform(initialPosition);
            dispose();
            return;
        }

        mesh.current.position.copy(initialPosition);
        mesh.current.position.setLength(rad);
    });

    return (
        <mesh ref={mesh} visible={isLive}>
            <sphereBufferGeometry attach="geometry" args={[BULLET_RADIUS, 5, 3]} />
            <meshBasicMaterial attach="material" color={0xfafafa} wireframe={true} />
        </mesh>
    );
};

const initialTransform = (initialPosition: THREE.Vector3): BulletTransform => ({
    initialPosition,
    rad: initialPosition.length(),
});
