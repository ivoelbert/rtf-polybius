import React from 'react';
import { AsteroidContextProvider } from '../Asteroid/AsteroidContext';
import { BulletContextProvider } from '../Bullets/BulletContext';
import { Collider } from '../Collider';

export const EntitiesProvider: React.FC = ({ children }) => {
    return (
        <AsteroidContextProvider>
            <BulletContextProvider>
                <Collider>{children}</Collider>
            </BulletContextProvider>
        </AsteroidContextProvider>
    );
};
