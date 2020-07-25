import { isNil } from '../utils/utils';
import { useEffect, useRef } from 'react';
import { useSpring, SpringValues, config } from 'react-spring';

interface AnimationConfig {
    mass: number;
    tension: number;
    friction: number;
    clamp: boolean;
}

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

type AnimatedMovements =
    | Movements.up
    | Movements.down
    | Movements.left
    | Movements.right
    | Movements.forwards
    | Movements.backwards
    | Movements.rollLeft
    | Movements.rollRight;

type SnapMovements = Movements.shoot;

type AnimatedMoveState = Record<AnimatedMovements, number>;
type SnapMoveState = Record<SnapMovements, number>;

const IDLE_ANIMATED_MOVE_STATE: AnimatedMoveState & { config: Partial<AnimationConfig> } = {
    [Movements.up]: 0,
    [Movements.down]: 0,
    [Movements.left]: 0,
    [Movements.right]: 0,
    [Movements.forwards]: 0,
    [Movements.backwards]: 0,
    [Movements.rollLeft]: 0,
    [Movements.rollRight]: 0,
    config: config.default,
};

const IDLE_SNAP_MOVE_STATE: SnapMoveState = {
    [Movements.shoot]: 0,
};

// TODO: This would look horrible if we introduce more snap movements
const isSnap = (movement: Movements): movement is SnapMovements => {
    return movement === Movements.shoot;
};

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
type MoveStateSpring = SpringValues<
    Pick<OverwriteKeys<AnimatedMoveState, React.CSSProperties>, AnimatedMovements>
>;

export const readMovementSpring = (moveState: MoveStateSpring): AnimatedMoveState => ({
    [Movements.up]: moveState[Movements.up].get(),
    [Movements.down]: moveState[Movements.down].get(),
    [Movements.left]: moveState[Movements.left].get(),
    [Movements.right]: moveState[Movements.right].get(),
    [Movements.forwards]: moveState[Movements.forwards].get(),
    [Movements.backwards]: moveState[Movements.backwards].get(),
    [Movements.rollLeft]: moveState[Movements.rollLeft].get(),
    [Movements.rollRight]: moveState[Movements.rollRight].get(),
});

/**
 * the useControls hook returns a spring to animate MoveStates.
 */
export const useControls = (
    keyMapping: KeyMapping
): [MoveStateSpring, React.MutableRefObject<SnapMoveState>] => {
    const [animatedMoveState, setAnimated] = useSpring<AnimatedMoveState>(
        () => IDLE_ANIMATED_MOVE_STATE
    );

    const snapMoveState = useRef<SnapMoveState>(IDLE_SNAP_MOVE_STATE);

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent): void => {
            const movement = keyMapping[e.code];

            if (isNil(movement)) {
                return;
            }

            if (isSnap(movement)) {
                snapMoveState.current[movement] = 1;
            } else {
                setAnimated({ [movement]: 1 });
            }
        };

        const keyUpHandler = (e: KeyboardEvent): void => {
            const movement = keyMapping[e.code];

            if (isNil(movement)) {
                return;
            }

            if (isSnap(movement)) {
                snapMoveState.current[movement] = 0;
            } else {
                setAnimated({ [movement]: 0 });
            }
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);
        };
    }, [keyMapping, setAnimated]);

    return [animatedMoveState, snapMoveState];
};
