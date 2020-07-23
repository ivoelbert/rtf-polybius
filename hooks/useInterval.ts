import { useEffect, useRef } from 'react';

type Callback = () => void;

export const useInterval = (callback: Callback, delay: number): void => {
    const savedCallback = useRef<Callback>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        if (delay !== null && savedCallback.current !== undefined) {
            let id = setInterval(savedCallback.current, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
