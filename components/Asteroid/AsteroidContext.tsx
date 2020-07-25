import React, { useRef, useContext, useEffect } from 'react';
import * as THREE from 'three';
import { createVoidContext } from '../../utils/voidContext';

type AsteroidContext = React.MutableRefObject<Set<React.MutableRefObject<THREE.Mesh | undefined>>>;

const AsteroidContextValue = React.createContext<AsteroidContext>(createVoidContext());

export const AsteroidContextProvider: React.FC = ({ children }) => {
    const value = useRef(new Set<React.MutableRefObject<THREE.Mesh>>());

    return <AsteroidContextValue.Provider value={value}>{children}</AsteroidContextValue.Provider>;
};

export const useLiveAsteroids = (): AsteroidContext => {
    return useContext(AsteroidContextValue);
};

export const useAsteroidRegister = (
    mesh: React.MutableRefObject<THREE.Mesh | undefined>,
    isLive: boolean
): void => {
    const liveAsteroids = useLiveAsteroids();

    useEffect(() => {
        if (isLive) {
            liveAsteroids.current.add(mesh);
        }

        return () => {
            liveAsteroids.current.delete(mesh);
        };
    }, [isLive]);
};
