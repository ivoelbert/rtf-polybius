import React from 'react';
import { Center } from '../Center';
import { Ship } from '../Ship';
import { Effects } from '../Effects';
import { Asteroids } from '../Asteroid/Asteroids';
import { EntitiesProvider } from './EntitiesProvider';
import { Bullets } from '../Bullets/Bullets';

export const Entities: React.FC = () => {
    return (
        <EntitiesProvider>
            <Center />
            <Asteroids />
            <Ship />
            <Bullets />
            <Effects />
        </EntitiesProvider>
    );
};
