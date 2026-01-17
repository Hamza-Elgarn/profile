'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, TorusKnot, Icosahedron, Octahedron, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Individual glass block component
function GlassBlock({
    position,
    rotation,
    scale,
    geometry = 'box'
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    geometry?: 'box' | 'icosahedron' | 'octahedron';
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialRotation = useRef(rotation);
    const time = useRef(Math.random() * 100);

    useFrame((_, delta) => {
        if (meshRef.current) {
            time.current += delta * 0.3;
            meshRef.current.rotation.x = initialRotation.current[0] + Math.sin(time.current) * 0.1;
            meshRef.current.rotation.y = initialRotation.current[1] + Math.cos(time.current * 0.7) * 0.1;
        }
    });

    const material = (
        <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            transmission={0.95}
            roughness={0.1}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.3}
            anisotropy={0.5}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationDistance={0.5}
            attenuationColor="#FF5722"
        />
    );

    if (geometry === 'icosahedron') {
        return (
            <Icosahedron ref={meshRef} position={position} rotation={rotation} scale={scale} args={[1, 0]}>
                {material}
            </Icosahedron>
        );
    }

    if (geometry === 'octahedron') {
        return (
            <Octahedron ref={meshRef} position={position} rotation={rotation} scale={scale} args={[1, 0]}>
                {material}
            </Octahedron>
        );
    }

    return (
        <Box ref={meshRef} position={position} rotation={rotation} scale={scale} args={[1, 1, 1]}>
            {material}
        </Box>
    );
}


// Glowing connector point (simplified from lines)
function ConnectorPoint({ position }: { position: THREE.Vector3 }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
                color="#FF5722"
                emissive="#FF5722"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}


// Core ring component
function CoreRing() {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <TorusKnot
            ref={ringRef}
            args={[1.2, 0.1, 128, 16, 2, 3]}
        >
            <meshStandardMaterial
                color="#00D4FF"
                emissive="#00D4FF"
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
            />
        </TorusKnot>
    );
}

// Main hero model - the procedural digital sculpture
export default function HeroModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();
    const [hovered, setHovered] = useState(false);

    // Mouse tracking
    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });
    const targetScale = useRef(1);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Check proximity for hover effect
            const distance = Math.sqrt(mouse.current.x ** 2 + mouse.current.y ** 2);
            setHovered(distance < 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Generate block positions
    const blocks = useMemo(() => {
        const items: Array<{
            position: [number, number, number];
            rotation: [number, number, number];
            scale: number;
            geometry: 'box' | 'icosahedron' | 'octahedron';
        }> = [];

        // Central cluster
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 1.5 + Math.random() * 0.5;
            items.push({
                position: [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius * 0.5,
                    (Math.random() - 0.5) * 1.5
                ],
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ],
                scale: 0.3 + Math.random() * 0.3,
                geometry: i % 3 === 0 ? 'icosahedron' : i % 3 === 1 ? 'octahedron' : 'box'
            });
        }

        // Outer floating blocks
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 + 0.3;
            const radius = 2.5 + Math.random() * 0.5;
            items.push({
                position: [
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius * 0.6,
                    (Math.random() - 0.5) * 2
                ],
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ],
                scale: 0.15 + Math.random() * 0.2,
                geometry: 'box'
            });
        }

        return items;
    }, []);

    // Generate connector points between blocks
    const connectorPoints = useMemo(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i < blocks.length - 1; i++) {
            if (Math.random() > 0.5) {
                const start = new THREE.Vector3(...blocks[i].position);
                const end = new THREE.Vector3(...blocks[(i + 1) % blocks.length].position);
                // Create midpoint
                points.push(new THREE.Vector3(
                    (start.x + end.x) / 2,
                    (start.y + end.y) / 2,
                    (start.z + end.z) / 2
                ));
            }
        }
        return points;
    }, [blocks]);

    useFrame((_, delta) => {
        if (groupRef.current) {
            // Parallax rotation
            targetRotation.current.x = mouse.current.y * 0.3;
            targetRotation.current.y = mouse.current.x * 0.3;

            // Smooth lerp
            groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
            groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;

            // Scale on hover
            targetScale.current = hovered ? 1.1 : 1;
            const currentScale = groupRef.current.scale.x;
            const newScale = currentScale + (targetScale.current - currentScale) * 0.1;
            groupRef.current.scale.setScalar(newScale);

            // Slow rotation
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    // Responsive scaling
    const responsiveScale = Math.min(viewport.width / 10, 1);

    return (
        <group ref={groupRef} scale={responsiveScale}>
            <CoreRing />

            {blocks.map((block, i) => (
                <GlassBlock
                    key={i}
                    position={block.position}
                    rotation={block.rotation}
                    scale={block.scale}
                    geometry={block.geometry}
                />
            ))}

            {connectorPoints.map((point, i) => (
                <ConnectorPoint key={i} position={point} />
            ))}

            {/* Central glowing core */}
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#FF5722"
                    emissive="#FF5722"
                    emissiveIntensity={hovered ? 2 : 1}
                    metalness={0}
                    roughness={0.3}
                />
            </mesh>
        </group>
    );
}
