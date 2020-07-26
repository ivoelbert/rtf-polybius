import React from 'react';
import { Center } from '../Center';
import { Effects } from '../Effects/Effects';
import { Asteroids } from '../Asteroid/Asteroids';
import { EntitiesProvider } from './EntitiesProvider';
import { Bullets } from '../Bullets/Bullets';
import { Ship } from '../Ship/Ship';

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
