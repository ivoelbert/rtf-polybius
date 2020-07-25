import React, { useContext } from 'react';
import { createVoidContext } from '../../utils/voidContext';
import { AsteroidData, useAsteroids } from './useAsteroids';

type AsteroidContext = AsteroidData;

const AsteroidContextValue = React.createContext<AsteroidContext>(createVoidContext());

export const AsteroidContextProvider: React.FC = ({ children }) => {
    const value = useAsteroids();

    return <AsteroidContextValue.Provider value={value}>{children}</AsteroidContextValue.Provider>;
};

export const useLiveAsteroids = (): AsteroidContext => {
    return useContext(AsteroidContextValue);
};
