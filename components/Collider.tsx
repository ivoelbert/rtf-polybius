import React from 'react';
import { useLiveAsteroids } from './Asteroid/AsteroidContext';
import { useLiveBullets } from './Bullets/BulletContext';
import { ASTEROID_RADIUS } from './Asteroid/Asteroid';
import { BULLET_RADIUS } from './Bullets/Bullet';
import { assertExists } from '../utils/utils';
import { useFrame } from 'react-three-fiber';

const useCollider = () => {
    const { asteroidProps } = useLiveAsteroids();
    const { bulletProps } = useLiveBullets();

    useFrame(() => {
        const liveAsteroids = asteroidProps.filter((props) => props.isLive);
        const liveBullets = bulletProps.filter((props) => props.isLive);

        for (const asteroid of liveAsteroids) {
            for (const bullet of liveBullets) {
                assertExists(asteroid.mesh.current);
                assertExists(bullet.mesh.current);

                const asteroidPosition = asteroid.mesh.current.position;
                const bulletPosition = bullet.mesh.current.position;

                if (asteroidPosition.distanceTo(bulletPosition) < ASTEROID_RADIUS + BULLET_RADIUS) {
                    asteroid.dispose();
                    bullet.dispose();
                }
            }
        }
    });
};

export const Collider: React.FC = ({ children }) => {
    useCollider();

    return <>{children}</>;
};
