'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Social Links Data
const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hamza-elgarn-4775133a6/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0A66C2'
    },
    {
        name: 'GitHub',
        url: 'https://github.com/Hamza-Elgarn',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        color: '#ffffff'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/hamza_twise/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        color: '#E4405F'
    }
];

// Skills Data
const skills = [
    { name: 'Python', proficiency: 95, color: '#3776AB' },
    { name: 'C', proficiency: 85, color: '#A8B9CC' },
    { name: 'JavaScript', proficiency: 90, color: '#F7DF1E' },
    { name: 'React', proficiency: 88, color: '#61DAFB' },
    { name: 'UI/UX', proficiency: 92, color: '#FF5722' }
];

// Glitch Text Decoder Component
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
    const textRef = useRef<HTMLSpanElement>(null);
    const [displayText, setDisplayText] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

    useEffect(() => {
        if (!textRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    decodeText();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(textRef.current);
        return () => observer.disconnect();
    }, [text]);

    const decodeText = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        if (char === ' ') return ' ';
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );
            iteration += 1 / 3;
            if (iteration >= text.length) clearInterval(interval);
        }, 30);
    };

    return (
        <span ref={textRef} className={`font-mono ${className}`}>
            {displayText}
        </span>
    );
}

// Skill Progress Bar Component
function SkillBadge({ skill }: { skill: typeof skills[0] }) {
    const [isHovered, setIsHovered] = useState(false);
    const badgeRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered && progressRef.current) {
            gsap.fromTo(progressRef.current,
                { width: '0%' },
                { width: `${skill.proficiency}%`, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, [isHovered, skill.proficiency]);

    return (
        <div
            ref={badgeRef}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="skill-badge cursor-pointer">
                {skill.name}
            </span>

            {/* Holographic Popup */}
            <div className={`skill-popup ${isHovered ? 'active' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold">{skill.name}</span>
                    <span className="text-[var(--neon-orange)]">{skill.proficiency}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full rounded-full"
                        style={{
                            background: `linear-gradient(90deg, ${skill.color}, var(--neon-orange))`,
                            boxShadow: `0 0 10px ${skill.color}`
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Magnetic Social Card Component
function SocialCard({ social, index }: { social: typeof socialLinks[0]; index: number }) {
    const cardRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            // Magnetic pull when cursor is within 150px
            if (distance < 150) {
                const pull = (150 - distance) / 150;
                gsap.to(card, {
                    x: distanceX * pull * 0.3,
                    y: distanceY * pull * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Entry animation
    useEffect(() => {
        if (!cardRef.current) return;

        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 50, rotateX: -20 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, [index]);

    return (
        <Link
            ref={cardRef}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card group"
            style={{ '--glow-color': social.color } as React.CSSProperties}
        >
            <div className="social-card-inner">
                {/* Icon */}
                <div className="social-icon" style={{ color: social.color }}>
                    {social.icon}
                </div>
                {/* Name */}
                <span className="mt-3 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                    {social.name}
                </span>
                {/* Glow Border */}
                <div className="social-glow" />
            </div>
        </Link>
    );
}

// Main Component
export default function PersonalTerminal() {
    const sectionRef = useRef<HTMLElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const dataRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Parallax effect on scroll
            gsap.to(dataRef.current, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Terminal container animation
            gsap.fromTo(terminalRef.current,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: terminalRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,87,34,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,87,34,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Floating Orbs Background */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--neon-blue)]/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--neon-orange)]/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div ref={dataRef} className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="subtitle mb-4">System Access</p>
                    <h2 className="heading-lg">
                        <GlitchText text="PROFILE_" className="text-white" />
                        <GlitchText text="TERMINAL" className="text-[var(--neon-orange)]" />
                    </h2>
                </div>

                {/* Terminal Container */}
                <div ref={terminalRef} className="terminal-container">
                    {/* Terminal Header */}
                    <div className="terminal-header">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-white/50 font-mono">hamza@terminal ~ identity</span>
                        <div className="w-16" />
                    </div>

                    {/* Terminal Content */}
                    <div className="terminal-content">
                        {/* Data Core Section */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Identity Info */}
                            <div className="space-y-6">
                                <div className="data-line">
                                    <span className="data-label">NAME:</span>
                                    <GlitchText text="Hamza Elgarn" className="data-value text-xl" />
                                </div>
                                <div className="data-line">
                                    <span className="data-label">LOCATION:</span>
                                    <GlitchText text="Casablanca, Morocco 🇲🇦" className="data-value" />
                                </div>
                                <div className="data-line">
                                    <span className="data-label">ROLE:</span>
                                    <GlitchText text="Creative Developer" className="data-value" />
                                </div>
                                <div className="data-line">
                                    <span className="data-label">STATUS:</span>
                                    <span className="data-value flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <GlitchText text="Available for opportunities" className="text-green-400" />
                                    </span>
                                </div>
                            </div>

                            {/* Education Badge */}
                            <div className="flex items-center justify-center">
                                <div className="education-badge">
                                    <div className="badge-glow" />
                                    <div className="badge-content">
                                        <span className="text-xs uppercase tracking-widest text-white/50 mb-2 block">Education</span>
                                        <span className="text-lg font-bold text-white">IT Student</span>
                                        <span className="text-[var(--neon-orange)] font-medium">Collège de Paris</span>
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-[var(--neon-orange)] flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[var(--neon-orange)]" />
                                            </div>
                                            <span className="text-xs text-white/50">VERIFIED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-12">
                            <div className="data-line mb-4">
                                <span className="data-label">TECH_STACK:</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <SkillBadge key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </div>

                        {/* Social Connectivity Hub */}
                        <div>
                            <div className="data-line mb-6">
                                <span className="data-label">CONNECTIVITY_HUB:</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6">
                                {socialLinks.map((social, index) => (
                                    <SocialCard key={social.name} social={social} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
