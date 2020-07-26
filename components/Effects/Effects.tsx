import * as THREE from 'three';
import React, { useRef, useMemo, useEffect } from 'react';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { assertExists } from '../../utils/utils';
import { useEffects } from './EffectsContext';

type Object3D<T, P> = ReactThreeFiber.Object3DNode<T, P>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            effectComposer: Object3D<EffectComposer, typeof EffectComposer>;
            renderPass: Object3D<RenderPass, typeof RenderPass>;
            unrealBloomPass: Object3D<UnrealBloomPass, typeof UnrealBloomPass>;
            glitchPass: Object3D<GlitchPass, typeof GlitchPass>;
        }
    }
}

extend({ EffectComposer, RenderPass, UnrealBloomPass, GlitchPass });

export const Effects: React.FC = () => {
    const composer = useRef<EffectComposer>();
    const { scene, gl, size, camera } = useThree();
    const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size]);

    useEffect(() => {
        assertExists(composer.current);
        composer.current.setSize(size.width, size.height);
    }, [size]);

    useFrame(() => {
        assertExists(composer.current);
        composer.current.render();
    }, 2);

    const { isGlitchActive } = useEffects();

    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[aspect, 1.1, 1, 0]} />
            <glitchPass attachArray="passes" goWild={true} enabled={isGlitchActive} />
        </effectComposer>
    );
};
