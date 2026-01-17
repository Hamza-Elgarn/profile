'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Dynamically import 3D components (no SSR)
const Scene = dynamic(() => import('./3d/Scene'), { ssr: false });
const HeroModel = dynamic(() => import('./3d/HeroModel'), { ssr: false });
const ParticleField = dynamic(() => import('./3d/ParticleField'), { ssr: false });

export default function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const firstNameRef = useRef<HTMLSpanElement>(null);
    const lastNameRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const orbContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Master timeline for coordinated animations
        const tl = gsap.timeline({ delay: 0.3 });

        // 1. First, pulse the orbs outward (burst effect)
        tl.fromTo(
            orbContainerRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
        )
            // 2. First name bursts in with scale
            .fromTo(
                firstNameRef.current,
                { scale: 0.5, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
                '-=1' // Overlap with orb animation
            )
            // 3. Last name slides up and fades in
            .fromTo(
                lastNameRef.current,
                { scale: 0.5, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
                '-=0.5'
            )
            // 4. Subtitle fades in
            .fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.3'
            )
            // 5. Scroll indicator appears
            .fromTo(
                scrollIndicatorRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
                '-=0.2'
            );

        // Continuous floating animation for scroll indicator
        gsap.to(scrollIndicatorRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'power1.inOut'
        });

        // Subtle breathing animation for orbs
        gsap.to(orbContainerRef.current, {
            scale: 1.05,
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: 'sine.inOut'
        });
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#050510]">
            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0">
                <Scene>
                    <ParticleField />
                    <HeroModel />
                </Scene>
            </div>

            {/* Centered Neon Orbs Container - Behind Name */}
            <div
                ref={orbContainerRef}
                className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
                style={{ opacity: 0 }}
            >
                {/* Blue/Cyan Orb - Left of Center */}
                <div
                    className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 243, 255, 0.8) 0%, rgba(0, 243, 255, 0.3) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                        left: '20%',
                        transform: 'translateX(-50%)'
                    }}
                />
                {/* Orange Orb - Right of Center */}
                <div
                    className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 87, 34, 0.8) 0%, rgba(255, 87, 34, 0.3) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                        right: '20%',
                        transform: 'translateX(50%)'
                    }}
                />
            </div>

            {/* Content Layer - Text on Top */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
                {/* Main Title - Bold & Prominent */}
                <h1
                    ref={titleRef}
                    className="hero-title mb-4"
                >
                    <span
                        ref={firstNameRef}
                        className="block"
                        style={{ opacity: 0 }}
                    >
                        HAMZA
                    </span>
                    <span
                        ref={lastNameRef}
                        className="block text-[var(--neon-orange)]"
                        style={{ opacity: 0 }}
                    >
                        ELGARN
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="subtitle mb-12"
                    style={{ opacity: 0 }}
                >
                    Creative Developer • Python • C • UI/UX
                </p>

                {/* Scroll indicator */}
                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-12 flex flex-col items-center gap-3"
                    style={{ opacity: 0 }}
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                        Scroll to explore
                    </span>
                    <div className="h-12 w-[1px] bg-gradient-to-b from-[var(--neon-orange)] to-transparent" />
                </div>
            </div>
        </section>
    );
}
