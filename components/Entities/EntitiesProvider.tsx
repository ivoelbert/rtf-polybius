import React from 'react';
import { AsteroidContextProvider } from '../Asteroid/AsteroidContext';

export const EntitiesProvider: React.FC = ({ children }) => {
    return <AsteroidContextProvider>{children}</AsteroidContextProvider>;
};
