import React from 'react';
import { Bullet } from './Bullet';
import { useLiveBullets } from './BulletContext';

export const Bullets: React.FC = () => {
    const { bulletProps } = useLiveBullets();

    const asteroids = bulletProps.map((props) => {
        return <Bullet key={props.id} {...props} />;
    });

    return <>{asteroids}</>;
};
