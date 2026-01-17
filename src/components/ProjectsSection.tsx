'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { projects } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(
                titleRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Cards stagger animation
            if (cardsRef.current) {
                const cards = cardsRef.current.children;
                gsap.fromTo(
                    cards,
                    { y: 100, opacity: 0, rotateX: -15 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-10 min-h-screen w-full px-6 py-32 md:px-12 lg:px-24"
        >
            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--neon-orange)]/5 to-transparent" />

            {/* Section header */}
            <div className="mb-20 text-center">
                <p className="subtitle mb-4">Selected Work</p>
                <h2 ref={titleRef} className="heading-lg" style={{ opacity: 0 }}>
                    Featured{' '}
                    <span className="text-[var(--neon-orange)]">Projects</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/50">
                    Hover over project titles to preview gallery
                </p>
            </div>

            {/* Projects grid - Bento style */}
            <div
                ref={cardsRef}
                className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.title}
                        className={`${index === 0
                            ? 'md:col-span-2 lg:col-span-2 lg:row-span-1'
                            : ''
                            }`}
                    >
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            techStack={project.techStack}
                            category={project.category}
                            images={project.images}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
