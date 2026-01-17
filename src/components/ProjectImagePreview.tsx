'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ProjectImagePreviewProps {
    images: string[];
    projectTitle: string;
    isVisible: boolean;
    mousePosition: { x: number; y: number };
}

export default function ProjectImagePreview({
    images,
    projectTitle,
    isVisible,
    mousePosition
}: ProjectImagePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Update position based on mouse
    useEffect(() => {
        if (!isVisible) return;

        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

        // Position the preview to follow cursor with offset
        let x = mousePosition.x + 30;
        let y = mousePosition.y - 50;

        // Keep within viewport bounds
        const containerWidth = 450;
        const containerHeight = 380;

        if (x + containerWidth > viewportWidth - 20) {
            x = mousePosition.x - containerWidth - 30;
        }
        if (y + containerHeight > viewportHeight - 20) {
            y = viewportHeight - containerHeight - 20;
        }
        if (y < 20) {
            y = 20;
        }
        if (x < 20) {
            x = 20;
        }

        setPosition({ x, y });
    }, [mousePosition, isVisible]);

    useEffect(() => {
        if (!containerRef.current || !imagesRef.current) return;

        if (isVisible) {
            // Show container with animation
            gsap.to(containerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });

            // Stagger animate images
            const imageElements = imagesRef.current.children;
            gsap.fromTo(
                imageElements,
                {
                    y: 40,
                    opacity: 0,
                    rotateX: -20,
                    scale: 0.85
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.45,
                    stagger: 0.07,
                    ease: 'power3.out',
                    delay: 0.08
                }
            );
        } else {
            // Hide with animation
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                ease: 'power2.in'
            });
        }
    }, [isVisible]);

    if (images.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed z-[9999]"
            style={{
                left: position.x,
                top: position.y,
                opacity: 0,
                transform: 'scale(0.9)',
                willChange: 'transform, opacity'
            }}
        >
            {/* Main glass container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-black/80 p-5 shadow-2xl backdrop-blur-xl"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(255, 87, 34, 0.15)'
                }}
            >
                {/* Gradient glow effects */}
                <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[var(--neon-orange)] opacity-25 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[var(--electric-blue)] opacity-20 blur-3xl" />

                {/* Header with macOS style window controls */}
                <div className="relative mb-5 flex items-center gap-3">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-sm" />
                        <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-sm" />
                        <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-sm" />
                    </div>
                    <div className="ml-3 flex-1 rounded-lg bg-white/5 px-4 py-1.5">
                        <span className="text-xs font-medium text-white/60">{projectTitle} - Gallery Preview</span>
                    </div>
                </div>

                {/* Images grid */}
                <div
                    ref={imagesRef}
                    className="relative grid grid-cols-2 gap-3"
                    style={{ perspective: '800px' }}
                >
                    {images.slice(0, 4).map((image, index) => (
                        <div
                            key={index}
                            className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5"
                            style={{
                                transformStyle: 'preserve-3d',
                                width: '180px'
                            }}
                        >
                            <Image
                                src={image}
                                alt={`${projectTitle} preview ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="180px"
                            />
                            {/* Shine overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-60" />

                            {/* Image number badge */}
                            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer with hint */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{images.length} images</span>
                    </div>

                    {images.length > 4 && (
                        <span className="text-xs text-[var(--neon-orange)]">
                            +{images.length - 4} more
                        </span>
                    )}
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--neon-orange)]/60 to-transparent" />
            </div>
        </div>
    );
}
