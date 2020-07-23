import * as THREE from 'three';
import { chance } from './utils';

export class Vectors {
    static randomUnit = (): THREE.Vector3 => {
        return new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
    };

    static randomOrthogonalUnit = (vec: THREE.Vector3): THREE.Vector3 => {
        const x = new THREE.Vector3(1, 0, 0);
        const y = new THREE.Vector3(0, 1, 0);
        const z = new THREE.Vector3(0, 0, 1);

        const mostPerpendicular = [y, z].reduce((best, current) => {
            if (vec.dot(best) > vec.dot(current)) {
                return current;
            }
            return best;
        }, x);

        if (chance(0.5)) {
            mostPerpendicular.negate();
        }

        return new THREE.Vector3().crossVectors(vec, mostPerpendicular);
    };

    static lerpRotateTowards = (
        origin: THREE.Vector3,
        dest: THREE.Vector3,
        alpha: number
    ): THREE.Vector3 => {
        const axis = new THREE.Vector3().crossVectors(origin, dest);
        const maxAngle = origin.angleTo(dest);
        const angle = maxAngle * alpha;

        const newVector = origin.clone();
        newVector.applyAxisAngle(axis, angle);
        return newVector.normalize();
    };
}
