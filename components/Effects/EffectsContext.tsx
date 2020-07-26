import React, { useContext, useState } from 'react';
import { createVoidContext } from '../../utils/voidContext';

type startGlitchAction = () => void;

interface EffectsContext {
    isGlitchActive: boolean;
    startGlitch: startGlitchAction;
}

const EffectsContextValue = React.createContext<EffectsContext>(createVoidContext());

export const EffectsContextProvider: React.FC = ({ children }) => {
    const [isGlitchActive, setIsGlitchActive] = useState(false);

    const startGlitch = () => setIsGlitchActive(true);

    const value = {
        isGlitchActive,
        startGlitch,
    };

    return <EffectsContextValue.Provider value={value}>{children}</EffectsContextValue.Provider>;
};

export const useEffects = (): EffectsContext => {
    return useContext(EffectsContextValue);
};
