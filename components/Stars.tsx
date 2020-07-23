import React, { useMemo } from 'react';
import { repeat } from '../utils/utils';
import { CENTER_RADIUS } from '../utils/constants';
import * as THREE from 'three';

const starsGeometryFactory = (): THREE.Geometry => {
    const starsGeometry = new THREE.Geometry();

    repeat(1000, (i: number) => {
        const vertex = new THREE.Vector3(
            THREE.MathUtils.randFloat(-1, 1),
            THREE.MathUtils.randFloat(-1, 1),
            THREE.MathUtils.randFloat(-1, 1)
        );
        const distance = THREE.MathUtils.randFloat(CENTER_RADIUS * 20, CENTER_RADIUS * 100);
        vertex.multiplyScalar(distance);

        starsGeometry.vertices.push(vertex);
    });

    return starsGeometry;
};

export const Stars: React.FC = () => {
    const geom1 = useMemo(starsGeometryFactory, []);
    const geom2 = useMemo(starsGeometryFactory, []);
    const geom3 = useMemo(starsGeometryFactory, []);
    const geom4 = useMemo(starsGeometryFactory, []);
    const geom5 = useMemo(starsGeometryFactory, []);
    const geom6 = useMemo(starsGeometryFactory, []);

    return (
        <group>
            <points geometry={geom1}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={1}
                    color={0xfafafa}
                />
            </points>
            <points geometry={geom2}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={2}
                    color={0xfafafa}
                />
            </points>
            <points geometry={geom3}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={1}
                    color={0xd4d4d4}
                />
            </points>
            <points geometry={geom4}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={2}
                    color={0xd4d4d4}
                />
            </points>
            <points geometry={geom5}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={1}
                    color={0x9a9a9a}
                />
            </points>
            <points geometry={geom6}>
                <pointsMaterial
                    attach="material"
                    sizeAttenuation={false}
                    size={2}
                    color={0x9a9a9a}
                />
            </points>
        </group>
    );
};
