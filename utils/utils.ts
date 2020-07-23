type RepeatFunction = (index: number) => void;

export const repeat = (times: number, f: RepeatFunction) => {
    for (let i = 0; i < times; i++) {
        f(i);
    }
};

export type nil = null | undefined;

export const isNil = <T>(value: T | nil): value is nil => {
    return value === null || value === undefined;
};

export function assertExists<T>(value: T | nil): asserts value is T {
    if (isNil(value)) {
        throw new Error('Unexpected nil value');
    }
}

export const chance = (p: number): boolean => {
    return Math.random() < p;
};
