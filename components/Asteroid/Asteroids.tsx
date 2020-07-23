import React from 'react';
import { Asteroid } from './Asteroid';
import { useInterval } from '../../hooks/useInterval';
import { useAsteroids } from './useAsteroids';

export const Asteroids: React.FC = () => {
    const { asteroidProps, spawnAsteroid } = useAsteroids();

    useInterval(spawnAsteroid, 5000);

    const asteroids = asteroidProps.map((props) => {
        return <Asteroid key={props.id} {...props} />;
    });

    return <>{asteroids}</>;
};
