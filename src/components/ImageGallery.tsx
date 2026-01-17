'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface ImageGalleryProps {
    images: string[];
    projectTitle: string;
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const openLightbox = (index: number) => {
        setSelectedImage(index);

        // Animate overlay
        gsap.fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        // Animate image
        gsap.fromTo(
            imageRef.current,
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
    };

    const closeLightbox = () => {
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => setSelectedImage(null)
        });
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (selectedImage === null) return;

        const newIndex = direction === 'next'
            ? (selectedImage + 1) % images.length
            : (selectedImage - 1 + images.length) % images.length;

        // Animate out
        gsap.to(imageRef.current, {
            x: direction === 'next' ? -100 : 100,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                setSelectedImage(newIndex);
                // Animate in from opposite direction
                gsap.fromTo(
                    imageRef.current,
                    { x: direction === 'next' ? 100 : -100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
            }
        });
    };

    return (
        <>
            {/* Image Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl"
                        onClick={() => openLightbox(index)}
                    >
                        {/* Glass card effect */}
                        <div className="glass-card absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--neon-orange)]/50 bg-[var(--neon-orange)]/20 text-[var(--neon-orange)]">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>

                        {/* Image */}
                        <Image
                            src={image}
                            alt={`${projectTitle} screenshot ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Image number */}
                        <div className="absolute bottom-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {index + 1} / {images.length}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-[var(--neon-orange)]/50 hover:bg-[var(--neon-orange)]/20 hover:text-[var(--neon-orange)]"
                        onClick={closeLightbox}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation arrows */}
                    <button
                        className="absolute left-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-[var(--neon-orange)]/50 hover:bg-[var(--neon-orange)]/20 hover:text-[var(--neon-orange)]"
                        onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-6 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:border-[var(--neon-orange)]/50 hover:bg-[var(--neon-orange)]/20 hover:text-[var(--neon-orange)]"
                        onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Main image */}
                    <div
                        ref={imageRef}
                        className="relative h-[80vh] w-full max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[selectedImage]}
                            alt={`${projectTitle} screenshot ${selectedImage + 1}`}
                            fill
                            className="rounded-2xl object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>

                    {/* Image counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-6 py-2 text-sm font-medium text-white">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
