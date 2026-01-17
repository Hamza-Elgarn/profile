'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorRingRef = useRef<HTMLDivElement>(null);
    const clickIndicatorRef = useRef<HTMLDivElement>(null);

    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    // Smooth cursor following with inertia
    useEffect(() => {
        let animationId: number;

        const animate = () => {
            // Inertia factor (lower = more lag)
            const ease = 0.15;

            // Calculate the difference
            const dx = mousePos.current.x - currentPos.current.x;
            const dy = mousePos.current.y - currentPos.current.y;

            // Apply easing
            currentPos.current.x += dx * ease;
            currentPos.current.y += dy * ease;

            // Update cursor position
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
            }
            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
            }

            setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, []);

    // Mouse move handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Check if hovering over project cards
            const target = e.target as HTMLElement;
            const card = target.closest('[data-cursor-card]');

            if (card) {
                setIsHoveringCard(true);

                // Magnetic pull effect - tilt card towards cursor
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                const angleX = (e.clientY - cardCenterY) / 20;
                const angleY = (cardCenterX - e.clientX) / 20;

                gsap.to(card, {
                    rotateX: angleX,
                    rotateY: angleY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                setIsHoveringCard(false);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const card = target.closest('[data-cursor-card]');

            if (card) {
                // Reset card rotation
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, []);

    // Click effect
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            setIsClicking(true);

            // Animate click indicator
            if (clickIndicatorRef.current) {
                gsap.set(clickIndicatorRef.current, {
                    left: e.clientX,
                    top: e.clientY,
                    scale: 0,
                    opacity: 1
                });

                gsap.to(clickIndicatorRef.current, {
                    scale: 1,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => setIsClicking(false)
                });
            }

            // Pulse effect on dot
            if (cursorDotRef.current) {
                gsap.to(cursorDotRef.current, {
                    scale: 0.5,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Hide default cursor
    useEffect(() => {
        document.body.style.cursor = 'none';

        // Add cursor styles to interactive elements
        const style = document.createElement('style');
        style.textContent = `
            a, button, [role="button"], input, textarea, select, [data-cursor-card] {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.body.style.cursor = 'auto';
            style.remove();
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${isHoveringCard ? 'hovering' : ''}`}
            />

            {/* Cursor ring (visible on hover) */}
            <div
                ref={cursorRingRef}
                className={`cursor-ring ${isHoveringCard ? 'active' : ''}`}
            />

            {/* Click indicator - 3D Cube animation */}
            <div
                ref={clickIndicatorRef}
                className="click-indicator"
                style={{ opacity: isClicking ? 1 : 0 }}
            >
                <div className="click-ripple" />
                <div className="click-ripple delay-1" />
                <div className="click-ripple delay-2" />
            </div>
        </>
    );
}
