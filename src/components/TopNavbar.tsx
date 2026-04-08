'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const navLinks = [
    { id: 'projects', label: 'PROJECTS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
];

export default function TopNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Animate navbar entrance
        if (navRef.current) {
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
            );
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Detect active section
            const sections = ['home', 'projects', 'about', 'contact'];
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            ref={navRef}
            className="top-navbar"
            style={{ opacity: 0 }}
        >
            <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
                {/* Logo / Name */}
                <button
                    className="navbar-logo"
                    onClick={() => scrollToSection('home')}
                >
                    HAMZA ELGARN
                </button>

                {/* Desktop Nav Links */}
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(link.id)}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* CTA Button */}
                <button
                    className="navbar-cta"
                    onClick={() => scrollToSection('contact')}
                >
                    Let&apos;s Talk
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className="navbar-mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        className={`navbar-mobile-link ${activeSection === link.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(link.id)}
                    >
                        {link.label}
                    </button>
                ))}
                <button
                    className="navbar-cta mobile"
                    onClick={() => scrollToSection('contact')}
                >
                    Let&apos;s Talk
                </button>
            </div>
        </nav>
    );
}
