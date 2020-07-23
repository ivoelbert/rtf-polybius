import { useState } from 'react';
import { AsteroidProps } from './Asteroid';
import { Arrays } from '../../utils/arrayUtils';
import { Vectors } from '../../utils/vectorUtils';

const MAX_ASTEROIDS = 50;

export type SpawnAsteroidAction = () => void;
export type DisposeAsteroidAction = (id: number) => void;

type NonDisposable<T> = Omit<T, 'dispose'>;

export interface AsteroidContext {
    asteroidProps: AsteroidProps[];
    spawnAsteroid(): void;
}

export const useAsteroids = (): AsteroidContext => {
    const [liveAsteroids, setLiveAsteroids] = useState<NonDisposable<AsteroidProps>[]>(() => {
        return Arrays.tabulate(MAX_ASTEROIDS, (index) => ({
            id: index,
            isLive: false,
            normalVector: Vectors.randomUnit(),
        }));
    });

    const spawnAsteroid = (): void => {
        const asteroidIndex = liveAsteroids.findIndex((props) => props.isLive === false);
        if (asteroidIndex < 0) {
            return;
        }

        const newLiveAsteroids = [...liveAsteroids];
        newLiveAsteroids[asteroidIndex].isLive = true;
        newLiveAsteroids[asteroidIndex].normalVector = Vectors.randomUnit();

        setLiveAsteroids(newLiveAsteroids);
    };

    const disposeAsteroid = (index: number): void => {
        const newLiveAsteroids = [...liveAsteroids];
        newLiveAsteroids[index].isLive = false;
        setLiveAsteroids(newLiveAsteroids);
    };

    const asteroidProps = liveAsteroids.map((props) => ({
        ...props,
        dispose: () => disposeAsteroid(props.id),
    }));

    return { asteroidProps, spawnAsteroid };
};
