import React from 'react';
import { CENTER_RADIUS } from '../utils/constants';

export const Center: React.FC = () => {
    return (
        <mesh visible={true} position={[0, 0, 0]}>
            <sphereBufferGeometry attach="geometry" args={[CENTER_RADIUS, 16, 12]} />
            <meshBasicMaterial attach="material" color={0xfa2b2b} wireframe={true} />
        </mesh>
    );
};
