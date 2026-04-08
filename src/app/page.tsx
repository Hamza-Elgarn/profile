'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { soundEffects } from '@/lib/soundEffects';

// Dynamically import components
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false });
const TopNavbar = dynamic(() => import('@/components/TopNavbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), { ssr: false });
const TechMarquee = dynamic(() => import('@/components/TechMarquee'), { ssr: false });
const PersonalTerminal = dynamic(() => import('@/components/PersonalTerminal'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const SoundToggle = dynamic(() => import('@/components/SoundToggle'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen once per session
    if (sessionStorage.getItem('hasLoaded')) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
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
      const windowHeight = window.innerHeight;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
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

      {/* Main Content */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <SmoothScroll>
          <main className="relative">
            {/* Top Navigation */}
            <TopNavbar />

            {/* Sound Toggle Button */}
            <SoundToggle />

            {/* Main sections */}
            <section id="home">
              <HeroSection />
            </section>
            
            {/* Tech Stack Marquee */}
            <TechMarquee />

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
