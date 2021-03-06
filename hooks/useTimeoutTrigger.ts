import { useState } from 'react';

type TriggerAction = () => void;

export const useTimeoutTrigger = (delay: number): [boolean, TriggerAction] => {
    const [value, setValue] = useState(false);

    const trigger = () => {
        setValue(true);

        // TODO: Find out why setTimeout blows up vercel
        let interval = setInterval(() => {
            setValue(false);
            clearInterval(interval);
        }, delay);
    };

    return [value, trigger];
};
