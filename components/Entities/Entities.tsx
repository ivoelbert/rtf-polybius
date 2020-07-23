import React from 'react';
import { Center } from '../Center';
import { Ship } from '../Ship';
import { Effects } from '../Effects';
import { Asteroids } from '../Asteroid/Asteroids';

export const Entities: React.FC = () => {
    return (
        <>
            <Center />
            <Asteroids />
            <Ship />
            <Effects />
        </>
    );
};
