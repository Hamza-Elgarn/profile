'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

// Stats data
const stats = [
    { value: '1000+', label: 'Coding Hours', position: 'top-left' },
    { value: '10+', label: 'Projects Built', position: 'top-right' },
    { value: '5+', label: 'Technologies', position: 'bottom-left' },
    { value: '2+', label: 'Years Experience', position: 'bottom-right' },
];

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<(HTMLDivElement | null)[]>([]);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    
    // Performance optimization: Disable heavy 3D scene on mobile
    const [isMobile, setIsMobile] = useState<boolean>(true); // Default true to prevent hydration mismatch and heavy load

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkMobile();
        
        // Listen for resizes
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Text content animation
        if (textRef.current) {
            const children = textRef.current.children;
            tl.fromTo(
                children,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
        }

        // Photo animation
        if (photoRef.current) {
            tl.fromTo(
                photoRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.6'
            );
        }

        // Stats cards animation
        statsRef.current.forEach((stat, i) => {
            if (stat) {
                tl.fromTo(
                    stat,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
                    `-=${0.3}`
                );
            }
        });

        // Scroll indicator
        if (scrollIndicatorRef.current) {
            tl.fromTo(
                scrollIndicatorRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
            );

            // Continuous floating
            gsap.to(scrollIndicatorRef.current, {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: 'power1.inOut'
            });
        }

        // Subtle floating animation for stats
        statsRef.current.forEach((stat, i) => {
            if (stat) {
                gsap.to(stat, {
                    y: i % 2 === 0 ? -8 : 8,
                    repeat: -1,
                    yoyo: true,
                    duration: 2.5 + i * 0.5,
                    ease: 'sine.inOut',
                    delay: i * 0.3
                });
            }
        });
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="hero-section"
        >
            {/* Spline 3D Scene Background (Desktop Only for Performance) */}
            {!isMobile && (
                <div className="absolute top-0 left-0 w-screen h-screen z-0 overflow-hidden pointer-events-auto mix-blend-screen opacity-60">
                    <Spline 
                        scene="https://prod.spline.design/ciJGQMHbUZz8QCej/scene.splinecode" 
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Subtle gradient background effects for text readability */}
            <div className="hero-bg-glow hero-bg-glow-blue z-0 pointer-events-none" />
            <div className="hero-bg-glow hero-bg-glow-accent z-0 pointer-events-none" />

            {/* Protective Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[var(--deep-space)] via-transparent to-transparent opacity-80" />

            {/* Main content */}
            <div className="hero-content relative z-10 pointer-events-none">
                {/* Left side - Text */}
                <div ref={textRef} className="hero-text pointer-events-none">
                    <p className="hero-greeting" style={{ opacity: 0 }}>
                        Hi! I&apos;m Hamza Elgarn, building
                    </p>
                    <h1 className="hero-headline" style={{ opacity: 0 }}>
                        Digital<br />Experiences.
                    </h1>
                    <p className="hero-description" style={{ opacity: 0 }}>
                        From prototypes to production-ready systems,<br />
                        I turn ideas into scalable, user-focused products.
                    </p>
                    <div className="hero-buttons pointer-events-auto" style={{ opacity: 0 }}>
                        <button
                            className="hero-btn-primary"
                            onClick={() => scrollToSection('contact')}
                        >
                            Let&apos;s Connect
                        </button>
                        <button
                            className="hero-btn-secondary"
                            onClick={() => scrollToSection('projects')}
                        >
                            See My Work
                        </button>
                    </div>
                </div>

                {/* Right side - Photo with floating stats */}
                <div className="hero-visual pointer-events-none">
                    {/* Photo container */}
                    <div ref={photoRef} className="hero-photo-container pointer-events-none" style={{ opacity: 0 }}>
                        {/* Blue glow ring behind photo */}
                        <div className="hero-photo-glow pointer-events-none" />
                        <div className="hero-photo-ring pointer-events-none" />
                        <div className="hero-photo-wrapper pointer-events-none">
                            <Image
                                src="/hamza-photo.png"
                                alt="Hamza Elgarn"
                                width={450}
                                height={550}
                                className="hero-photo"
                                priority
                            />
                        </div>
                    </div>

                    {/* Floating Stats Cards */}
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            ref={el => { statsRef.current[index] = el; }}
                            className={`hero-stat-card hero-stat-${stat.position}`}
                            style={{ opacity: 0 }}
                        >
                            <span className="hero-stat-value">{stat.value}</span>
                            <span className="hero-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="hero-scroll-indicator relative z-10 pointer-events-none"
                style={{ opacity: 0 }}
            >
                <span className="hero-scroll-text">Scroll to explore</span>
                <div className="hero-scroll-line" />
            </div>
        </section>
    );
}
