'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { soundEffects } from '@/lib/soundEffects';

// Dynamically import components to prevent SSR issues with Three.js
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), { ssr: false });
const PersonalTerminal = dynamic(() => import('@/components/PersonalTerminal'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const SideNavigation = dynamic(() => import('@/components/SideNavigation'), { ssr: false });
const SoundToggle = dynamic(() => import('@/components/SoundToggle'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Add global click sound for links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        soundEffects.playDigitalClick();
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Add scroll-based section transition sounds
  useEffect(() => {
    if (isLoading) return;

    let lastSection = '';
    const sections = ['home', 'projects', 'about', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if section is roughly in viewport center
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            if (lastSection !== sectionId) {
              lastSection = sectionId;
              soundEffects.playWhoosh();
            }
            break;
          }
        }
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isLoading]);

  return (
    <>
      {/* Cinematic Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Main Content - Hidden during loading for performance */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <SmoothScroll>
          <main className="relative">
            {/* Side Navigation */}
            <SideNavigation />

            {/* Sound Toggle Button */}
            <SoundToggle />

            {/* Main sections */}
            <section id="home">
              <HeroSection />
            </section>
            <section id="projects">
              <ProjectsSection />
            </section>
            <section id="about">
              <PersonalTerminal />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
          </main>
        </SmoothScroll>
      </div>
    </>
  );
}
