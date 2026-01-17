'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { soundManager } from '@/lib/soundEffects';

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

const STATUS_MESSAGES = [
    'INITIATING CORE PROTOCOLS...',
    'ACCESSING DIGITAL ASSETS...',
    'AUTHENTICATING USER: HAMZA ELGARN...',
    'ESTABLISHING SECURE CONNECTION...',
    '[LOAD COMPLETE]'
];

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const scanlineRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isStarted, setIsStarted] = useState(false);

    const particles = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${4 + Math.random() * 3}s`
        })), []
    );

    const handleStart = useCallback(() => {
        if (isStarted) return;
        soundManager.playClick();
        setIsStarted(true);
        requestAnimationFrame(() => {
            soundManager.playPowerUp();
        });
    }, [isStarted]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (!isStarted || messageIndex >= STATUS_MESSAGES.length) return;
        const currentFullMessage = STATUS_MESSAGES[messageIndex];
        if (charIndex < currentFullMessage.length) {
            const timeout = setTimeout(() => {
                setCurrentMessage(prev => prev + currentFullMessage[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 35);
            return () => clearTimeout(timeout);
        } else if (messageIndex < STATUS_MESSAGES.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentMessage('');
                setCharIndex(0);
                setMessageIndex(prev => prev + 1);
            }, 350);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, messageIndex, isStarted]);

    useEffect(() => {
        if (!isStarted || !containerRef.current) return;
        if (timelineRef.current) timelineRef.current.kill();

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        timelineRef.current = tl;

        tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.6 })
            .to(scanlineRef.current, { top: '100%', opacity: 0.5, duration: 0.7, ease: 'power1.inOut' }, '-=0.3')
            .to(logoRef.current, { filter: 'drop-shadow(0 0 25px #FF5722)', duration: 0.3, yoyo: true, repeat: 1 }, '-=0.5')
            .to(messagesRef.current, { opacity: 1, duration: 0.25 }, '-=0.2')
            .to(progressRef.current, { opacity: 1, duration: 0.25 });

        gsap.to(progressFillRef.current, {
            width: '100%',
            duration: 3,
            delay: 0.8,
            ease: 'power1.inOut',
            onComplete: () => {
                soundManager.playBoom();
                setTimeout(exitAnimation, 500);
            }
        });

        return () => { tl.kill(); };
    }, [isStarted]);

    const exitAnimation = useCallback(() => {
        gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: onLoadComplete
        });
    }, [onLoadComplete]);

    // Entry Screen - Enhanced with fingerprint
    if (!isStarted) {
        return (
            <div className="loading-screen" onClick={handleStart} style={{ cursor: 'pointer' }}>
                <div className="loading-grid" />

                {/* Floating orbs */}
                <div className="entry-orb orb-1" />
                <div className="entry-orb orb-2" />

                <div className="loading-content">
                    {/* Main Logo Container */}
                    <div className="entry-logo-container">
                        {/* Outer rotating ring */}
                        <div className="entry-outer-ring" />

                        {/* Multiple pulsing circles */}
                        <div className="entry-pulse-ring ring-1" />
                        <div className="entry-pulse-ring ring-2" />
                        <div className="entry-pulse-ring ring-3" />

                        {/* Logo */}
                        <div className="entry-logo">
                            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28">
                                <polygon
                                    points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
                                    fill="none"
                                    stroke="url(#entryGradient)"
                                    strokeWidth="2.5"
                                />
                                <text
                                    x="50"
                                    y="62"
                                    textAnchor="middle"
                                    fill="url(#entryGradient)"
                                    fontSize="40"
                                    fontWeight="900"
                                    fontFamily="'Inter', sans-serif"
                                >
                                    H
                                </text>
                                <defs>
                                    <linearGradient id="entryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FF5722" />
                                        <stop offset="50%" stopColor="#FF8A65" />
                                        <stop offset="100%" stopColor="#00FFFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* Fingerprint / Touch Indicator */}
                    <div className="entry-touch-indicator">
                        <svg viewBox="0 0 64 64" className="w-10 h-10 entry-fingerprint">
                            {/* Hand touch icon */}
                            <circle cx="32" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                            <path
                                d="M32 28 L32 44 M24 36 L40 36"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                        </svg>
                    </div>

                    {/* Text content */}
                    <div className="mt-6 text-center">
                        <p className="entry-title text-xl md:text-2xl font-black text-white mb-3 tracking-wide">
                            CLICK TO ENTER
                        </p>
                        <div className="entry-subtitle flex items-center justify-center gap-2 text-xs text-white/50 uppercase tracking-[0.2em]">
                            <span className="entry-dot" />
                            <span>Enable Audio Experience</span>
                            <span className="entry-dot" />
                        </div>
                    </div>

                    {/* Bottom hint */}
                    <div className="entry-hint mt-8">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/30">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span className="text-xs text-white/30 ml-2">Best with sound</span>
                    </div>
                </div>

                <style jsx>{`
                    .entry-orb {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(80px);
                        pointer-events: none;
                    }
                    .orb-1 {
                        width: 300px;
                        height: 300px;
                        background: radial-gradient(circle, rgba(255, 87, 34, 0.3) 0%, transparent 70%);
                        top: 10%;
                        left: -10%;
                        animation: orbFloat 8s ease-in-out infinite;
                    }
                    .orb-2 {
                        width: 250px;
                        height: 250px;
                        background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%);
                        bottom: 10%;
                        right: -5%;
                        animation: orbFloat 10s ease-in-out infinite reverse;
                    }
                    @keyframes orbFloat {
                        0%, 100% { transform: translate(0, 0); }
                        50% { transform: translate(30px, -30px); }
                    }

                    .entry-logo-container {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 200px;
                        height: 200px;
                    }

                    .entry-outer-ring {
                        position: absolute;
                        width: 180px;
                        height: 180px;
                        border-radius: 50%;
                        border: 2px dashed rgba(255, 87, 34, 0.3);
                        animation: rotate 20s linear infinite;
                    }

                    .entry-pulse-ring {
                        position: absolute;
                        border-radius: 50%;
                        border: 1px solid rgba(255, 87, 34, 0.4);
                    }
                    .ring-1 {
                        width: 140px;
                        height: 140px;
                        animation: pulseRing 2s ease-out infinite;
                    }
                    .ring-2 {
                        width: 160px;
                        height: 160px;
                        animation: pulseRing 2s ease-out infinite 0.5s;
                    }
                    .ring-3 {
                        width: 180px;
                        height: 180px;
                        animation: pulseRing 2s ease-out infinite 1s;
                    }

                    @keyframes pulseRing {
                        0% { transform: scale(0.8); opacity: 1; }
                        100% { transform: scale(1.3); opacity: 0; }
                    }

                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    .entry-logo {
                        position: relative;
                        z-index: 10;
                        animation: logoGlow 2s ease-in-out infinite;
                    }

                    @keyframes logoGlow {
                        0%, 100% { filter: drop-shadow(0 0 15px rgba(255, 87, 34, 0.5)); }
                        50% { filter: drop-shadow(0 0 30px rgba(255, 87, 34, 0.8)); }
                    }

                    .entry-touch-indicator {
                        margin-top: 1.5rem;
                        color: rgba(255, 87, 34, 0.7);
                        animation: touchPulse 1.5s ease-in-out infinite;
                    }

                    @keyframes touchPulse {
                        0%, 100% { transform: scale(1); opacity: 0.7; }
                        50% { transform: scale(1.1); opacity: 1; }
                    }

                    .entry-title {
                        animation: textGlow 2s ease-in-out infinite;
                    }

                    @keyframes textGlow {
                        0%, 100% { text-shadow: 0 0 10px rgba(255, 87, 34, 0.3); }
                        50% { text-shadow: 0 0 20px rgba(255, 87, 34, 0.6); }
                    }

                    .entry-dot {
                        width: 4px;
                        height: 4px;
                        background: var(--neon-orange);
                        border-radius: 50%;
                        animation: dotPulse 1s ease-in-out infinite;
                    }

                    @keyframes dotPulse {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                    }

                    .entry-hint {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        animation: fadeInOut 3s ease-in-out infinite;
                    }

                    @keyframes fadeInOut {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.6; }
                    }
                `}</style>
            </div>
        );
    }

    // Main loading screen
    return (
        <div ref={containerRef} className="loading-screen">
            <div className="loading-grid" />
            <div className="loading-content">
                <div ref={logoRef} className="loading-logo" style={{ opacity: 0, transform: 'scale(0.9)' }}>
                    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32">
                        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="url(#logoGrad)" strokeWidth="2" />
                        <text x="50" y="65" textAnchor="middle" fill="url(#logoGrad)" fontSize="45" fontWeight="900" fontFamily="'Inter', sans-serif">H</text>
                        <defs>
                            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF5722" />
                                <stop offset="100%" stopColor="#00FFFF" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div ref={scanlineRef} className="scanline" />
                </div>

                <div ref={messagesRef} className="loading-messages" style={{ opacity: 0 }}>
                    <div className="message-line">
                        <span className="message-prefix">&gt;</span>
                        <span className="message-text">{currentMessage}</span>
                        <span className={showCursor ? 'visible' : 'invisible'}>_</span>
                    </div>
                </div>

                <div ref={progressRef} className="loading-progress" style={{ opacity: 0 }}>
                    <div ref={progressFillRef} className="progress-fill" style={{ width: 0 }} />
                </div>

                <div className="loading-decorations">
                    <div className="corner-bracket top-left" />
                    <div className="corner-bracket top-right" />
                    <div className="corner-bracket bottom-left" />
                    <div className="corner-bracket bottom-right" />
                </div>
            </div>

            <div className="loading-particles">
                {particles.map(p => (
                    <div key={p.id} className="particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.duration }} />
                ))}
            </div>
        </div>
    );
}
