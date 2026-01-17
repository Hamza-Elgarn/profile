'use client';

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    category: string;
    images: string[];
    index: number;
    slug?: string;
}

export default function ProjectCard({
    title,
    description,
    techStack,
    category,
    images,
    index,
    slug = title.toLowerCase().replace(/\s+/g, '-')
}: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Animation refs
    const detailsRef = useRef<HTMLDivElement>(null);
    const slideshowRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-advance slideshow when hovered
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovered && images.length > 0) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 2000);
        } else {
            setCurrentImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    // Handle animations on hover state change
    useEffect(() => {
        if (!detailsRef.current || !slideshowRef.current || !titleRef.current) return;

        if (isHovered) {
            // Show Slideshow - Hide Details
            gsap.to(detailsRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: 'power2.inOut'
            });
            gsap.to(slideshowRef.current, {
                opacity: 1,
                scale: 1.1, // Slight zoom effect
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(titleRef.current, {
                y: -10,
                scale: 1.1,
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            // Show Details - Hide Slideshow
            gsap.to(detailsRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.out'
            });
            gsap.to(slideshowRef.current, {
                opacity: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.in'
            });
            gsap.to(titleRef.current, {
                y: 0,
                scale: 1,
                textShadow: 'none',
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, [isHovered]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !contentRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(contentRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.1,
            ease: 'power1.out',
            overwrite: 'auto'
        });

        if (glowRef.current) {
            gsap.to(glowRef.current, {
                x: x,
                y: y,
                duration: 0.1,
                ease: 'power1.out',
                overwrite: 'auto'
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);

        if (contentRef.current) {
            gsap.to(contentRef.current, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
                overwrite: 'auto'
            });
        }
    };

    const linkUrl = `/projects/${slug}`;

    return (
        <div
            ref={cardRef}
            className="card-3d group relative h-full min-h-[400px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
                perspective: '1000px',
                animationDelay: `${index * 0.1}s`
            }}
        >
            <Link
                href={linkUrl}
                className="glass-card pointer-events-auto relative z-20 block h-full w-full overflow-hidden transition-none"
                style={{
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* 1. Immersive Slideshow Background */}
                <div
                    ref={slideshowRef}
                    className="absolute inset-0 z-0 opacity-0 pointer-events-none"
                    style={{ willChange: 'opacity, transform' }}
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${title} screenshot ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={i === 0 && index < 2}
                            />
                            {/* Dark gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                        </div>
                    ))}
                </div>

                {/* 2. Glass Overlay */}
                <div
                    ref={contentRef}
                    className="relative z-10 h-full w-full p-8"
                >
                    {/* Cursor Glow */}
                    <div
                        ref={glowRef}
                        className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-orange)] opacity-0 blur-[60px] transition-opacity duration-300 group-hover:opacity-25"
                        style={{ top: 0, left: 0 }}
                    />

                    {/* Content Container */}
                    <div className="flex h-full flex-col justify-between relative z-20">

                        {/* Header Section */}
                        <div>
                            {/* Category & Badge */}
                            <div className="mb-4 flex items-center justify-between">
                                <span className="inline-block rounded-full border border-[var(--neon-orange)]/30 bg-[var(--neon-orange)]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--neon-orange)] backdrop-blur-md">
                                    {category}
                                </span>
                                {/* Slideshow Indicator (Visible on Hover) */}
                                <div className={`flex gap-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                    {images.slice(0, 4).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 w-4 rounded-full transition-colors ${i === currentImageIndex ? 'bg-[var(--neon-orange)]' : 'bg-white/20'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Title (Standard, no Glitch) */}
                            <h3
                                ref={titleRef}
                                className="heading-md mb-2 text-white transition-colors duration-300"
                            >
                                {title}
                            </h3>
                        </div>

                        {/* Details Section (Fades out on Hover) */}
                        <div ref={detailsRef} className="transform will-change-transform">
                            <p className="mb-6 text-base leading-relaxed text-white/70">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 'Explore Project' Action */}
                        <div className={`mt-6 flex items-center gap-2 text-sm font-medium text-[var(--neon-orange)] transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <span>Explore Project</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
