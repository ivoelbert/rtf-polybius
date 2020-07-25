import { useState, createRef, useRef } from 'react';
import { BulletProps } from './Bullet';
import { Arrays } from '../../utils/arrayUtils';
import * as THREE from 'three';

const MAX_BULLETS = 10;

export type SpawnBulletAction = (position: THREE.Vector3) => void;
export type DisposeBulletAction = (id: number) => void;

type BaseAsteroidProps = Omit<BulletProps, 'dispose' | 'mesh'>;

export interface BulletData {
    bulletProps: BulletProps[];
    spawnBullet: SpawnBulletAction;
    disposeBullet: DisposeBulletAction;
}

export const useBullets = (): BulletData => {
    const [liveBullets, setLiveBullets] = useState<BaseAsteroidProps[]>(() => {
        return Arrays.tabulate(MAX_BULLETS, (index) => ({
            initialPosition: new THREE.Vector3(),
            id: index,
            isLive: false,
        }));
    });

    const spawnBullet = (position: THREE.Vector3): void => {
        const bulletIndex = liveBullets.findIndex((props) => props.isLive === false);
        if (bulletIndex < 0) {
            return;
        }

        const newLiveBullets = [...liveBullets];
        newLiveBullets[bulletIndex].isLive = true;
        newLiveBullets[bulletIndex].initialPosition = position;

        setLiveBullets(newLiveBullets);
    };

    const disposeBullet = (index: number): void => {
        const newLiveBullets = [...liveBullets];
        newLiveBullets[index].isLive = false;
        setLiveBullets(newLiveBullets);
    };

    const refs = useRef(liveBullets.map(() => createRef<THREE.Mesh>()));

    const bulletProps = liveBullets.map((props, index) => ({
        ...props,
        mesh: refs.current[index],
        dispose: () => disposeBullet(props.id),
    }));

    return { bulletProps, spawnBullet, disposeBullet };
};
