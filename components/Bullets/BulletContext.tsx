import React, { useContext } from 'react';
import { createVoidContext } from '../../utils/voidContext';
import { BulletData, useBullets } from './useBullets';

type BulletContext = BulletData;

const BulletContextValue = React.createContext<BulletContext>(createVoidContext());

export const BulletContextProvider: React.FC = ({ children }) => {
    const value = useBullets();

    return <BulletContextValue.Provider value={value}>{children}</BulletContextValue.Provider>;
};

export const useLiveBullets = (): BulletContext => {
    return useContext(BulletContextValue);
};
