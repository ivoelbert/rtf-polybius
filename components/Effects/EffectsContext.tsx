import React, { useContext } from 'react';
import { createVoidContext } from '../../utils/voidContext';

type startGlitchAction = () => void;

interface EffectsContext {
    isGlitchActive: boolean;
    startGlitch: startGlitchAction;
}

const EffectsContextValue = React.createContext<EffectsContext>(createVoidContext());

export const EffectsContextProvider: React.FC = ({ children }) => {
    //const [isGlitchActive, startGlitch] = useToggleAfterTimeout(500);

    const value = {
        isGlitchActive: false,
        startGlitch: () => void 0,
    };

    return <EffectsContextValue.Provider value={value}>{children}</EffectsContextValue.Provider>;
};

export const useEffects = (): EffectsContext => {
    return useContext(EffectsContextValue);
};
