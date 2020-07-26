import { useState, useRef, useCallback } from 'react';

type SetWithTimeoutAction = () => void;

export const useToggleAfterTimeout = (timeout: number): [boolean, SetWithTimeoutAction] => {
    const [value, setValue] = useState<boolean>(false);
    const timeoutId = useRef<number>();

    const setWithTimeout = useCallback(() => {
        setValue(true);

        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setValue(false);
        }, timeout) as any;
    }, [timeout]);

    return [value, setWithTimeout];
};
