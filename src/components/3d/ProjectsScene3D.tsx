'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import GlassCapsule from './GlassCapsule';
import { projects } from '@/lib/projects';

// Cursor-following light component
function CursorLight() {
    const lightRef = useRef<THREE.PointLight>(null);
    const { viewport } = useThree();

    useFrame(({ pointer }) => {
        if (lightRef.current) {
            const x = (pointer.x * viewport.width) / 2;
            const y = (pointer.y * viewport.height) / 2;
            lightRef.current.position.set(x, y, 3);
        }
    });

    return (
        <>
            <pointLight
                ref={lightRef}
                color="#FF5722"
                intensity={2}
                distance={10}
            />
            <pointLight
                position={[-3, 2, 2]}
                color="#00D4FF"
                intensity={1}
                distance={8}
            />
        </>
    );
}

// Background particles for depth
function BackgroundParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 200;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

        const color = Math.random() > 0.5 ? new THREE.Color('#FF5722') : new THREE.Color('#00D4FF');
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ProjectsScene3D() {
    // Calculate capsule positions in a circular/floating arrangement
    const capsulePositions: [number, number, number][] = [
        [-2.5, 0.3, 0],   // Tijara-POS (left)
        [2.5, 0.3, 0],    // Suraya (right)
        [0, -0.5, -1],    // School Transit (center back)
    ];

    return (
        <div className="h-[80vh] w-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 15]} />

                <ambientLight intensity={0.2} />
                <CursorLight />

                <Suspense fallback={null}>
                    <BackgroundParticles />

                    {projects.map((project, index) => (
                        <Float
                            key={project.slug}
                            speed={1.5}
                            rotationIntensity={0.2}
                            floatIntensity={0.3}
                        >
                            <GlassCapsule
                                position={capsulePositions[index]}
                                title={project.title}
                                slug={project.slug}
                                imagePath={project.images[0]}
                                index={index}
                            />
                        </Float>
                    ))}
                </Suspense>

                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.8} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
