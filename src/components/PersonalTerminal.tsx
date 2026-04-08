'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Social Links Data
const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hamza-elgarn/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: 'GitHub',
        url: 'https://github.com/Hamza-Elgarn',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/hamza_twise/',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    }
];

// Tech stack for the bento box
const techStack = [
    {
        name: 'JavaScript',
        icon: (
            <svg viewBox="0 0 256 256" className="w-6 h-6" fill="currentColor">
                <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.2c-4.44-7.905-9.25-11.024-16.672-11.024-7.56 0-12.373 4.812-12.373 11.024 0 7.733 4.813 10.852 15.927 15.665l6.014 2.577c20.42 8.764 31.934 17.7 31.934 37.8 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.594" />
            </svg>
        ),
        color: '#F7DF1E',
        bgColor: 'rgba(247, 223, 30, 0.15)'
    },
    {
        name: 'Node.js',
        icon: (
            <svg viewBox="0 0 256 289" className="w-6 h-6" fill="currentColor">
                <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.082c0-1.325-.53-2.385-1.59-2.915L129.06 19.167c-1.06-.53-2.385-.53-3.18 0L20.14 80.432c-1.06.53-1.59 1.855-1.59 2.915v121.905c0 1.06.53 2.385 1.59 2.915l28.887 16.696c15.636 7.95 25.44-1.325 25.44-10.6V93.682c0-1.59 1.325-3.18 3.18-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.395 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.828-15.9C4.24 220.622 0 213.997 0 206.842V84.937c0-7.155 4.24-13.78 11.13-17.226L116.87 6.494c6.625-3.71 15.636-3.71 22.26 0l105.74 61.217C251.76 71.157 256 77.782 256 84.937v121.905c0 7.155-4.24 13.78-11.13 17.226l-105.74 61.217c-3.445 1.59-7.42 2.18-11.13 2.18zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 2.915 2.65 2.12 14.045 8.215 20.936 36.307 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.89-2.65-11.925-37.367-15.37-29.152-2.915-47.172-9.275-47.172-32.596 0-21.466 18.02-34.187 48.232-34.187 33.92 0 50.616 11.66 52.736 37.102 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.685 3.445 10.07 36.307 14.31 32.596 4.24 48.232 10.335 48.232 33.391-.265 23.321-19.345 36.572-53.002 36.572z" />
            </svg>
        ),
        color: '#339933',
        bgColor: 'rgba(51, 153, 51, 0.15)'
    },
    {
        name: 'Python',
        icon: (
            <svg viewBox="0 0 256 255" className="w-6 h-6" fill="currentColor">
                <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" />
                <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" />
            </svg>
        ),
        color: '#3776AB',
        bgColor: 'rgba(55, 118, 171, 0.15)'
    },
    {
        name: 'React',
        icon: (
            <svg viewBox="0 0 256 228" className="w-6 h-6" fill="currentColor">
                <path d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.986 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.985 4.76-1.52 29.348-10.098 48.444-25.956 48.444-41.7 0-15.074-17.867-30.375-45.525-40.134zm-6.573 62.942c-1.362.465-2.753.916-4.168 1.352a233.5 233.5 0 0 0-6.7-20.605 233.5 233.5 0 0 0 6.181-19.733c2.637.736 5.2 1.519 7.667 2.35 20.488 6.906 34.41 17.25 34.41 26.638 0 10.113-15.005 21.028-37.39 28.498zm-14.169-55.362c-2.08 5.98-4.513 12.132-7.27 18.353a280.473 280.473 0 0 0-10.543-16.948c5.728 1.4 11.252 2.989 16.563 4.705l1.25-6.11zM128.217 28.547c15.674-14.257 30.373-21.036 38.35-16.432 8.428 4.864 11.728 22.18 7.015 44.727-.338 1.613-.727 3.255-1.158 4.92a234.5 234.5 0 0 0-21.84-5.058 233.5 233.5 0 0 0-14.15-17.56c2.632-2.448 5.13-4.669 7.583-6.597l-15.8-4zm-32.533 20.108c6.932 2.036 14.033 4.506 21.21 7.372A234.5 234.5 0 0 0 73.246 82.5c1.456-6.765 3.277-13.344 5.453-19.734l16.985-14.111zM50.66 134.27c-20.063-7.296-33.592-17.696-33.592-27.132 0-8.802 12.154-18.382 31.556-25.111a163.26 163.26 0 0 1 8.543-2.674 234.5 234.5 0 0 0 7.23 20.806 233.6 233.6 0 0 0-6.741 19.6c-2.512-.63-4.945-1.293-7.296-1.989l.3 16.5zm28.94 43.282c-3.863-.977-7.623-2.048-11.26-3.208-1.09-.347-2.163-.71-3.217-1.084 2.293-5.978 4.956-12.172 7.965-18.504a280.473 280.473 0 0 0 10.554 16.946c-1.326.32-2.668.612-4.042.85zm49.617 20.387c-15.362 13.98-30.053 20.896-38.35 16.095-8.757-5.062-12.23-23.789-6.95-47.572a163.04 163.04 0 0 1 1.758-7.993 233.5 233.5 0 0 0 21.593 4.87 233.5 233.5 0 0 0 14.132 17.536c-2.593 2.384-5.066 4.545-7.383 6.564l15.2 10.5zm6.27-12.608a280.382 280.382 0 0 0 10.595-16.942c6.06 1.445 11.882 3.075 17.432 4.878-2.14 6.115-4.658 12.39-7.499 18.68-6.412-1.704-13.044-3.75-20.528-6.616zm22.606-52.763a280.5 280.5 0 0 1 7.475 18.658c-5.6-1.372-11.506-2.543-17.645-3.5a280.5 280.5 0 0 0 7.47-18.618l2.7 3.46zm-53.77-68.023c5.383 6.094 10.666 12.74 15.727 19.87-10.339-.507-20.8-.507-31.144 0a280.414 280.414 0 0 1 15.717-19.87h-.3zm-53.213 55.17c-3.19-5.543-6.13-11.027-8.809-16.417a280.414 280.414 0 0 1 17.562 3.413c-2.85 5.85-5.605 11.85-8.253 17.904l-.5-4.9zm16.62 12.965c3.63-7.32 7.66-14.546 12.064-21.61a280.382 280.382 0 0 1 13.575-19.17 222.14 222.14 0 0 1 21.35 0c4.792 6.148 9.399 12.534 13.78 19.17 4.423 7.064 8.476 14.29 12.133 21.654-3.63 7.32-7.667 14.547-12.064 21.61a280.407 280.407 0 0 1-13.579 19.208 222.141 222.141 0 0 1-21.347 0c-4.794-6.205-9.399-12.534-13.78-19.208a280.407 280.407 0 0 1-12.132-21.654zm93.92-4.932a261.3 261.3 0 0 1 8.875 16.648c-5.624 1.339-11.497 2.546-17.592 3.606a280.414 280.414 0 0 0 8.717-20.254zM128 90.808c7.315 8.19 14.275 17.067 20.778 26.47-13.667-.67-27.476-.67-41.144 0 6.607-9.573 13.565-18.45 20.366-26.47zm-51.73 37.782a261.217 261.217 0 0 1-8.713 20.254c-5.624-1.339-11.497-2.546-17.592-3.614a280.407 280.407 0 0 0 8.875-16.648l17.43.008zm14.863 42.982a280.414 280.414 0 0 1-8.718-20.245c5.624 1.339 11.497 2.546 17.592 3.614a261.217 261.217 0 0 1-8.874 16.631zM128 165.256c-7.316-8.285-14.276-17.162-20.778-26.473 6.798.358 13.685.537 20.572.537 6.923 0 13.782-.179 20.572-.537-6.503 9.311-13.463 18.188-20.366 26.473z" />
            </svg>
        ),
        color: '#61DAFB',
        bgColor: 'rgba(97, 218, 251, 0.15)'
    },
    {
        name: 'Flutter',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
            </svg>
        ),
        color: '#02569B',
        bgColor: 'rgba(2, 86, 155, 0.15)'
    },
    {
        name: 'Cybersecurity',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
        ),
        color: '#00FF41',
        bgColor: 'rgba(0, 255, 65, 0.12)'
    },
    {
        name: 'AI Development',
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M21 10.5h-1.5V9h-2v1.5H16V9h-2v1.5h-1.5v2H14V14h2v-1.5h1.5V14h2v-1.5H21v-2zM8 9H2v2h6V9zm0 4H2v2h6v-2zm14.5-8h-19C2.12 5 1 6.12 1 7.5v9C1 17.88 2.12 19 3.5 19h19c1.38 0 2.5-1.12 2.5-2.5v-9C25 6.12 23.88 5 22.5 5zm0 11.5h-19v-9h19v9z" />
            </svg>
        ),
        color: '#A855F7',
        bgColor: 'rgba(168, 85, 247, 0.15)'
    }
];

const experienceData = [
    { role: 'Creative Developer', company: 'Freelance', year: '2023 - Present' },
    { role: 'IT Student', company: 'Collège de Paris', year: '2025 - Present (1st Year)' },
    { role: 'Independent Full-Stack Developer', company: 'Personal Projects', year: '2022' },
    { role: 'UI/UX Enthusiast', company: 'Freelance', year: '2021' }
];

export default function PersonalTerminal() {
    const sectionRef = useRef<HTMLElement>(null);
    const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;
        
        // Simple sequential fade up animation for bento boxes
        bentoRefs.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(el, 
                    { opacity: 0, y: 40 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-[var(--deep-space)]"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">About Me</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        I build intuitive digital products—scalable, high-performing, and made through collaboration.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Column (Profile Card) */}
                    <div 
                        ref={el => { bentoRefs.current[0] = el; }}
                        className="w-full lg:w-[35%] bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-6 lg:p-8 flex flex-col items-center shadow-2xl backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
                    >
                        {/* Profile Image */}
                        <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-gradient-to-b from-[#1e3a8a] to-[#0f172a]">
                            <Image
                                src="/hamza-photo.png"
                                alt="Hamza Elgarn"
                                width={600}
                                height={800}
                                priority
                                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                            />
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-xs text-white/70">Available for work</span>
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">
                            Hamza Elgarn
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-center text-white/50 mb-8 max-w-[250px]">
                            Create seamless experiences across web, mobile, and desktop with one codebase.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            {socialLinks.map((social) => (
                                <Link 
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Link 
                            href="#contact"
                            className="w-full px-8 py-4 rounded-full bg-[#1d4ed8] hover:bg-[#2563eb] text-white font-medium transition-all duration-300 text-center shadow-[0_0_20px_rgba(29,78,216,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
                        >
                            Let's Connect
                        </Link>
                    </div>

                    {/* Right Column (Info Cards) */}
                    <div className="w-full lg:w-[65%] flex flex-col gap-6">
                        
                        {/* Bio Card */}
                        <div 
                            ref={el => { bentoRefs.current[1] = el; }}
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-6 lg:p-8 shadow-2xl backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Hi! I'm Hamza Elgarn,</h3>
                            <p className="text-white/70 leading-relaxed max-w-3xl mb-6">
                                a developer passionate about building meaningful digital experiences. With a focus on clean code, thoughtful design, and scalable solutions, I help turn ideas into products that people love to use.
                            </p>
                            <p className="text-white/70 leading-relaxed max-w-3xl">
                                I specialize in web development, creating immersive user interfaces, and ensuring cross-platform compatibility, blending creativity with technical expertise to deliver work that's both functional and visually compelling.
                            </p>
                        </div>

                        {/* Tech Stack Card */}
                        <div 
                            ref={el => { bentoRefs.current[2] = el; }}
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-5 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]"
                        >
                            <h3 className="text-sm sm:text-lg lg:text-xl font-medium text-white/90 mb-4">My Tech Stack:</h3>
                            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3">
                                {techStack.map((tech) => (
                                    <div 
                                        key={tech.name}
                                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg flex-shrink-0"
                                        style={{ backgroundColor: tech.bgColor, color: tech.color }}
                                        title={tech.name}
                                    >
                                        {tech.icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experience Card */}
                        <div 
                            ref={el => { bentoRefs.current[3] = el; }}
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-5 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex-grow"
                        >
                            <h3 className="text-lg lg:text-xl font-medium text-white/90 mb-6">Experience & Education</h3>
                            <div className="flex flex-col space-y-4">
                                {experienceData.map((exp, index) => (
                                    <div 
                                        key={index} 
                                        className="flex flex-row items-center justify-between gap-2 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                                    >
                                        <span className="text-white/90 font-medium text-xs sm:text-base w-[40%] text-left">{exp.role}</span>
                                        <span className="text-white/60 text-[10px] sm:text-base w-[35%] text-center">{exp.company}</span>
                                        <span className="text-white/40 text-[9px] sm:text-sm w-[25%] text-right">{exp.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
