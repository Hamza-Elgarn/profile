'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1000;

export default function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);

    // Generate random positions
    const particles = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);

        const colorOrange = new THREE.Color('#FF5722');
        const colorBlue = new THREE.Color('#00D4FF');
        const colorWhite = new THREE.Color('#ffffff');

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;

            // Spread particles in a large sphere
            const radius = 15 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random colors
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.2) {
                color = colorOrange;
            } else if (colorChoice < 0.4) {
                color = colorBlue;
            } else {
                color = colorWhite;
            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        return { positions, colors };
    }, []);

    // Set buffer attributes after mount
    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                'position',
                new THREE.BufferAttribute(particles.positions, 3)
            );
            geometryRef.current.setAttribute(
                'color',
                new THREE.BufferAttribute(particles.colors, 3)
            );
        }
    }, [particles]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Slow rotation
            pointsRef.current.rotation.y += delta * 0.02;
            pointsRef.current.rotation.x += delta * 0.01;

            // Subtle breathing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
            pointsRef.current.scale.setScalar(scale);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry ref={geometryRef} />
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
