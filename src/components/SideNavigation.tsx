'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'projects', icon: 'projects', label: 'Projects' },
    { id: 'about', icon: 'about', label: 'About' },
    { id: 'contact', icon: 'contact', label: 'Contact' },
];

export default function SideNavigation() {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Show nav after initial load
        setTimeout(() => setIsVisible(true), 1000);

        // Update active section based on scroll
        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => setActiveSection(item.id),
                    onEnterBack: () => setActiveSection(item.id),
                });
            }
        });

        return () => {
            window.removeEventListener('resize', checkMobile);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Mobile Bottom Navigation
    if (isMobile) {
        return (
            <nav
                className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
            >
                <div className="flex items-center justify-around border-t border-white/10 bg-black/90 px-2 py-3 backdrop-blur-xl">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300 ${activeSection === item.id
                                    ? 'text-[var(--neon-orange)]'
                                    : 'text-white/50'
                                }`}
                        >
                            <NavIcon name={item.icon} isActive={activeSection === item.id} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                            {activeSection === item.id && (
                                <div className="absolute bottom-1 h-1 w-8 rounded-full bg-[var(--neon-orange)]" />
                            )}
                        </button>
                    ))}
                </div>
            </nav>
        );
    }

    // Desktop Side Navigation
    return (
        <nav
            className={`fixed right-6 top-1/2 z-50 -translate-y-1/2 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                }`}
        >
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-xl">
                {navItems.map((item, index) => (
                    <NavButton
                        key={item.id}
                        {...item}
                        isActive={activeSection === item.id}
                        onClick={() => scrollToSection(item.id)}
                        index={index}
                    />
                ))}
            </div>
        </nav>
    );
}

interface NavButtonProps {
    id: string;
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
    index: number;
}

function NavButton({ icon, label, isActive, onClick, index }: NavButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${isActive
                ? 'bg-[var(--neon-orange)]/20 text-[var(--neon-orange)] shadow-[0_0_20px_rgba(255,87,34,0.3)]'
                : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                }`}
            title={label}
        >
            {/* Icon */}
            <NavIcon name={icon} isActive={isActive} />

            {/* Active glow ring */}
            <div
                className={`absolute inset-0 rounded-xl border transition-all duration-300 ${isActive
                    ? 'border-[var(--neon-orange)]/50'
                    : 'border-transparent group-hover:border-white/10'
                    }`}
            />

            {/* Tooltip */}
            <span
                className={`absolute right-full mr-4 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100 ${isActive ? 'text-[var(--neon-orange)]' : ''
                    }`}
            >
                {label}
            </span>
        </button>
    );
}

function NavIcon({ name, isActive }: { name: string; isActive: boolean }) {
    const strokeColor = isActive ? 'currentColor' : 'currentColor';

    switch (name) {
        case 'home':
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={strokeColor}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            );
        case 'projects':
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={strokeColor}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            );
        case 'about':
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={strokeColor}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            );
        case 'contact':
            return (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={strokeColor}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        default:
            return null;
    }
}
