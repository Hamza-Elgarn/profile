'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text, useTexture, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface GlassCapsuleProps {
    position: [number, number, number];
    title: string;
    slug: string;
    imagePath: string;
    index: number;
}

export default function GlassCapsule({ position, title, slug, imagePath, index }: GlassCapsuleProps) {
    const groupRef = useRef<THREE.Group>(null);
    const glassRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const { viewport } = useThree();

    // Load project thumbnail
    const texture = useTexture(imagePath);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Base rotation offset for variety
    const baseRotation = useMemo(() => ({
        y: (index * Math.PI * 0.3) + Math.random() * 0.5
    }), [index]);

    // Animation frame
    useFrame((state, delta) => {
        if (!groupRef.current || !glassRef.current || !glowRef.current) return;

        // Floating animation
        const time = state.clock.elapsedTime;
        groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.1;

        // Hover rotation
        if (hovered) {
            groupRef.current.rotation.y += delta * 0.3;
        } else {
            // Slow idle rotation
            groupRef.current.rotation.y += delta * 0.05;
        }

        // Glow intensity
        const targetOpacity = hovered ? 0.6 : 0.2;
        const glowMaterial = glowRef.current.material as THREE.MeshBasicMaterial;
        glowMaterial.opacity = THREE.MathUtils.lerp(glowMaterial.opacity, targetOpacity, delta * 5);

        // Scale on hover
        const targetScale = hovered ? 1.08 : 1;
        groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 5)
        );
    });

    const handleClick = () => {
        setClicked(true);
        router.push(`/projects/${slug}`);
    };

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={[0, baseRotation.y, 0]}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                document.body.style.cursor = 'auto';
            }}
            onClick={handleClick}
        >
            {/* Outer glow sphere */}
            <mesh ref={glowRef} scale={[1.3, 1.6, 1.3]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#FF5722"
                    transparent
                    opacity={0.2}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Glass capsule shell */}
            <mesh ref={glassRef}>
                <capsuleGeometry args={[0.8, 1.2, 16, 32]} />
                <MeshTransmissionMaterial
                    backside
                    samples={4}
                    thickness={0.5}
                    chromaticAberration={0.1}
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.2}
                    temporalDistortion={0.1}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                    color="#1a1a2e"
                    transmission={0.95}
                    roughness={0.1}
                    ior={1.5}
                />
            </mesh>

            {/* Inner content - Project image */}
            <mesh ref={innerRef} position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
                <planeGeometry args={[1.2, 0.8]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    opacity={hovered ? 1 : 0.8}
                    emissive={new THREE.Color('#FF5722')}
                    emissiveIntensity={hovered ? 0.3 : 0.1}
                />
            </mesh>

            {/* Project title */}
            <Text
                position={[0, -0.6, 0.5]}
                fontSize={0.15}
                color={hovered ? '#FF5722' : '#ffffff'}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.woff"
                maxWidth={1.4}
            >
                {title}
            </Text>

            {/* Inner glow ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.6, 0.02, 16, 100]} />
                <meshBasicMaterial
                    color={hovered ? '#FF5722' : '#00D4FF'}
                    transparent
                    opacity={hovered ? 0.8 : 0.4}
                />
            </mesh>

            {/* Energy particles around capsule */}
            {hovered && (
                <CapsuleParticles />
            )}
        </group>
    );
}

// Particles that appear on hover
function CapsuleParticles() {
    const particlesRef = useRef<THREE.Points>(null);
    const count = 30;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const r = 1 + Math.random() * 0.3;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.cos(phi);
            pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#FF5722"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}
