'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import ImageGallery from '@/components/ImageGallery';

gsap.registerPlugin(ScrollTrigger);

interface ProjectPageClientProps {
    slug: string;
}

export default function ProjectPageClient({ slug }: ProjectPageClientProps) {
    const project = getProjectBySlug(slug);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                headerRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );

            // Content stagger
            if (contentRef.current) {
                const elements = contentRef.current.children;
                gsap.fromTo(
                    elements,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.3
                    }
                );
            }

            // Gallery animation
            if (galleryRef.current) {
                gsap.fromTo(
                    galleryRef.current.querySelectorAll('.grid > div'),
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: galleryRef.current,
                            start: 'top 80%',
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [project]);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black px-6 py-24 md:px-12 lg:px-24">
            {/* Background gradient */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="hero-gradient orange" style={{ top: '10%', right: '5%' }} />
                <div className="hero-gradient blue" style={{ bottom: '10%', left: '5%' }} />
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Back button */}
                <Link
                    href="/#projects"
                    className="group mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all duration-300 hover:border-[var(--neon-orange)]/30 hover:bg-[var(--neon-orange)]/10 hover:text-[var(--neon-orange)]"
                >
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Header */}
                <div ref={headerRef} className="mb-16" style={{ opacity: 0 }}>
                    {/* Category badge */}
                    <div className="mb-6 inline-block">
                        <span className="rounded-full border border-[var(--neon-orange)]/30 bg-[var(--neon-orange)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--neon-orange)]">
                            {project.category}
                        </span>
                    </div>

                    <h1 className="heading-xl mb-6">
                        {project.title.split('-').map((word, i) => (
                            <span key={i}>
                                {i > 0 && <span className="text-[var(--neon-orange)]">-</span>}
                                {word}
                            </span>
                        ))}
                    </h1>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div ref={contentRef} className="mb-20 grid gap-12 lg:grid-cols-3">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <h2 className="heading-md mb-6 text-white/90">About the Project</h2>
                        <p className="text-lg leading-relaxed text-white/60">
                            {project.fullDescription}
                        </p>
                    </div>

                    {/* Features */}
                    <div className="glass-card p-8">
                        <h3 className="mb-6 text-lg font-semibold text-white">Key Features</h3>
                        <ul className="space-y-4">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--neon-orange)]/20">
                                        <svg className="h-3 w-3 text-[var(--neon-orange)]" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-white/70">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Gallery */}
                <div ref={galleryRef}>
                    <h2 className="heading-md mb-8 text-white/90">
                        Project <span className="text-[var(--neon-orange)]">Gallery</span>
                    </h2>
                    <ImageGallery images={project.images} projectTitle={project.title} />
                </div>
            </div>
        </main>
    );
}
