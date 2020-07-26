import React from 'react';
import { useLiveAsteroids } from './Asteroid/AsteroidContext';
import { useLiveBullets } from './Bullets/BulletContext';
import { ASTEROID_RADIUS } from './Asteroid/Asteroid';
import { BULLET_RADIUS } from './Bullets/Bullet';
import { assertExists } from '../utils/utils';
import { useFrame } from 'react-three-fiber';
import { useShip } from './Ship/ShipContext';
import { SHIP_RADIUS } from './Ship/Ship';

const useCollider = () => {
    const { asteroidProps } = useLiveAsteroids();
    const { bulletProps } = useLiveBullets();
    const { mesh: shipMesh } = useShip();

    useFrame(() => {
        const liveAsteroids = asteroidProps.filter((props) => props.isLive);
        const liveBullets = bulletProps.filter((props) => props.isLive);

        assertExists(shipMesh.current);
        const shipPosition = shipMesh.current.position;

        for (const asteroid of liveAsteroids) {
            assertExists(asteroid.mesh.current);
            const asteroidPosition = asteroid.mesh.current.position;

            for (const bullet of liveBullets) {
                assertExists(bullet.mesh.current);
                const bulletPosition = bullet.mesh.current.position;

                if (asteroidPosition.distanceTo(bulletPosition) < ASTEROID_RADIUS + BULLET_RADIUS) {
                    asteroid.dispose();
                    bullet.dispose();
                }
            }

            if (shipPosition.distanceTo(asteroidPosition) < ASTEROID_RADIUS + SHIP_RADIUS) {
                asteroid.dispose();
                console.log('OOPS!');
            }
        }
    });
};

export const Collider: React.FC = ({ children }) => {
    useCollider();

    return <>{children}</>;
};
