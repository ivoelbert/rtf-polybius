import React from 'react';
import { Asteroid } from './Asteroid';
import { useInterval } from '../../hooks/useInterval';
import { useLiveAsteroids } from './AsteroidContext';

export const Asteroids: React.FC = () => {
    const { asteroidProps, spawnAsteroid } = useLiveAsteroids();

    useInterval(spawnAsteroid, 5000);

    const asteroids = asteroidProps.map((props) => {
        return <Asteroid key={props.id} {...props} />;
    });

    return <>{asteroids}</>;
};
