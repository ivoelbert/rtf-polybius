import React, { useContext, useRef } from 'react';
import { createVoidContext } from '../../utils/voidContext';

interface ShipContext {
    mesh: React.MutableRefObject<THREE.Mesh | undefined>;
}

const ShipContextValue = React.createContext<ShipContext>(createVoidContext());

export const ShipContextProvider: React.FC = ({ children }) => {
    const mesh = useRef<THREE.Mesh | undefined>();
    const value = {
        mesh,
    };

    return <ShipContextValue.Provider value={value}>{children}</ShipContextValue.Provider>;
};

export const useShip = (): ShipContext => {
    return useContext(ShipContextValue);
};
