'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'Python', level: 95 },
    { name: 'C', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'React', level: 85 },
    { name: 'Database Design', level: 80 }
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Skills bars animation
            if (skillsRef.current) {
                const bars = skillsRef.current.querySelectorAll('.skill-bar-fill');
                bars.forEach((bar) => {
                    gsap.fromTo(
                        bar,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: bar,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full px-6 py-32 md:px-12 lg:px-24"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left column - Text */}
                    <div>
                        <p className="subtitle mb-4">About Me</p>
                        <h2 className="heading-lg mb-8">
                            Building the{' '}
                            <span className="text-[var(--neon-orange)]">Future</span>
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-white/70">
                            <p>
                                I&apos;m Hamza Elgarn, a Creative Developer passionate about crafting
                                digital experiences that blend beautiful design with robust engineering.
                            </p>
                            <p>
                                With expertise in Python and C for backend logic, combined with
                                modern frontend frameworks, I build systems that are both powerful
                                and delightful to use.
                            </p>
                            <p>
                                From Point-of-Sale systems to e-commerce platforms, I approach
                                each project with a focus on performance, scalability, and
                                exceptional user experience.
                            </p>
                        </div>
                    </div>

                    {/* Right column - Skills */}
                    <div ref={skillsRef} className="space-y-6">
                        <h3 className="heading-md mb-8 text-white/90">Technical Skills</h3>
                        {skills.map((skill) => (
                            <div key={skill.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-white">{skill.name}</span>
                                    <span className="text-[var(--neon-orange)]">{skill.level}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="skill-bar-fill h-full origin-left rounded-full bg-gradient-to-r from-[var(--neon-orange)] to-[var(--electric-blue)]"
                                        style={{
                                            width: `${skill.level}%`,
                                            transform: 'scaleX(0)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
