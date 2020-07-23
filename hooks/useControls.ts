import { isNil } from '../utils/utils';
import { useEffect } from 'react';
import { useSpring, AnimatedValue } from 'react-spring';

// All posible inputs
export enum Movements {
    up = 'MOVEMENT_up',
    down = 'MOVEMENT_down',
    left = 'MOVEMENT_left',
    right = 'MOVEMENT_right',
    forwards = 'MOVEMENT_forwards',
    backwards = 'MOVEMENT_backwards',
    rollLeft = 'MOVEMENT_rollLeft',
    rollRight = 'MOVEMENT_rollRight',
    shoot = 'MOVEMENT_shoot',
}

export const IDLE_MOVE_STATE: MoveState = {
    [Movements.up]: 0,
    [Movements.down]: 0,
    [Movements.left]: 0,
    [Movements.right]: 0,
    [Movements.forwards]: 0,
    [Movements.backwards]: 0,
    [Movements.rollLeft]: 0,
    [Movements.rollRight]: 0,
    [Movements.shoot]: 0,
};

/**
 * for each possible movement we have a number in [0, 1] instead of a boolean
 * so we can support analog input
 */
export type MoveState = Record<Movements, number>;

// Map key codes to movements
export type KeyMapping = Record<string, Movements>;

// Default keyboard binding
export const KEYBOARD_MAPPING: KeyMapping = {
    KeyW: Movements.up,
    KeyS: Movements.down,
    KeyA: Movements.left,
    KeyD: Movements.right,
    KeyI: Movements.forwards,
    KeyK: Movements.backwards,
    KeyJ: Movements.rollLeft,
    KeyL: Movements.rollRight,
    Space: Movements.shoot,
};

type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] };
type MoveStateSpring = AnimatedValue<
    Pick<OverwriteKeys<MoveState, React.CSSProperties>, Movements>
>;

export const readMovementSpring = (moveState: MoveStateSpring): MoveState => ({
    [Movements.up]: moveState[Movements.up].getValue(),
    [Movements.down]: moveState[Movements.down].getValue(),
    [Movements.left]: moveState[Movements.left].getValue(),
    [Movements.right]: moveState[Movements.right].getValue(),
    [Movements.forwards]: moveState[Movements.forwards].getValue(),
    [Movements.backwards]: moveState[Movements.backwards].getValue(),
    [Movements.rollLeft]: moveState[Movements.rollLeft].getValue(),
    [Movements.rollRight]: moveState[Movements.rollRight].getValue(),
    [Movements.shoot]: moveState[Movements.shoot].getValue(),
});

/**
 * the useControls hook returns a spring to animate MoveStates.
 */
export const useControls = (keyMapping: KeyMapping) => {
    const [moveState, set] = useSpring(() => IDLE_MOVE_STATE);

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent): void => {
            const movement = keyMapping[e.code];

            if (isNil(movement)) {
                return;
            }

            set({ [movement]: 1 });
        };

        const keyUpHandler = (e: KeyboardEvent): void => {
            const movement = keyMapping[e.code];

            if (isNil(movement)) {
                return;
            }

            set({ [movement]: 0 });
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [keyMapping, set]);

    return moveState;
};
