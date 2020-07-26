import React, { useContext } from 'react';
import { createVoidContext } from '../../utils/voidContext';
import { useTimeoutTrigger } from '../../hooks/useTimeoutTrigger';

type startGlitchAction = () => void;

interface EffectsContext {
    isGlitchActive: boolean;
    startGlitch: startGlitchAction;
}

const EffectsContextValue = React.createContext<EffectsContext>(createVoidContext());

export const EffectsContextProvider: React.FC = ({ children }) => {
    const [isGlitchActive, startGlitch] = useTimeoutTrigger(500);

    const value = {
        isGlitchActive,
        startGlitch,
    };

    return <EffectsContextValue.Provider value={value}>{children}</EffectsContextValue.Provider>;
};

export const useEffects = (): EffectsContext => {
    return useContext(EffectsContextValue);
};
