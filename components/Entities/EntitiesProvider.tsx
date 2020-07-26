import React from 'react';
import { AsteroidContextProvider } from '../Asteroid/AsteroidContext';
import { BulletContextProvider } from '../Bullets/BulletContext';
import { Collider } from '../Collider';
import { ShipContextProvider } from '../Ship/ShipContext';
import { EffectsContextProvider } from '../Effects/EffectsContext';

export const EntitiesProvider: React.FC = ({ children }) => {
    return (
        <EffectsContextProvider>
            <AsteroidContextProvider>
                <BulletContextProvider>
                    <ShipContextProvider>
                        <Collider>{children}</Collider>
                    </ShipContextProvider>
                </BulletContextProvider>
            </AsteroidContextProvider>
        </EffectsContextProvider>
    );
};
