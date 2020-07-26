import React from 'react';
import { AsteroidContextProvider } from '../Asteroid/AsteroidContext';
import { BulletContextProvider } from '../Bullets/BulletContext';
import { Collider } from '../Collider';
import { ShipContextProvider } from '../Ship/ShipContext';
import { EffectsContextProvider } from '../Effects/EffectsContext';

export const EntitiesProvider: React.FC = ({ children }) => {
    return (
        <AsteroidContextProvider>
            <BulletContextProvider>
                <ShipContextProvider>
                    <EffectsContextProvider>
                        <Collider>{children}</Collider>
                    </EffectsContextProvider>
                </ShipContextProvider>
            </BulletContextProvider>
        </AsteroidContextProvider>
    );
};
