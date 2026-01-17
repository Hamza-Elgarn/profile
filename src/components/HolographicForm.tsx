'use client';

import { useRef, useState } from 'react';
import CubeLoader from './CubeLoader';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function HolographicForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Validate environment variable is configured
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            setError('Email service is not configured. Please contact the site owner.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Send email using Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New Portfolio Message from ${formData.name}`,
                    from_name: process.env.NEXT_PUBLIC_FORM_FROM_NAME || 'Portfolio Contact Form'
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
                // Reset after showing success
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                }, 5000);
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State UI
    if (submitted) {
        return (
            <div className="relative mx-auto max-w-2xl">
                <div className="glass-card relative overflow-hidden p-12 text-center">
                    {/* Success background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-cyan-500/10" />

                    {/* Animated success rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute h-40 w-40 animate-ping rounded-full border border-green-500/30" />
                        <div className="absolute h-60 w-60 rounded-full border border-green-500/20" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '0.5s' }} />
                    </div>

                    {/* Corner accents - Green */}
                    <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-green-500/70" />
                    <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-green-500/70" />
                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-green-500/70" />
                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-green-500/70" />

                    {/* Success Icon */}
                    <div className="relative mb-6 inline-flex items-center justify-center">
                        <div className="absolute h-24 w-24 rounded-full bg-green-500/20 blur-xl" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-500 bg-green-500/10">
                            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Success Text */}
                    <h3 className="relative mb-2 text-2xl font-bold">
                        <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            TRANSMISSION SUCCESSFUL
                        </span>
                    </h3>
                    <p className="relative text-white/70">
                        Message delivered • Response incoming
                    </p>

                    {/* Glowing line */}
                    <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-green-500 via-cyan-400 to-green-500"
                        style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }} />

                    {/* Status badge */}
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        <span className="text-sm text-green-400">Connection Established</span>
                    </div>
                </div>
            </div>
        );
    }

    // Sending State UI
    if (isSubmitting) {
        return (
            <div className="relative mx-auto max-w-2xl">
                <div className="glass-card relative overflow-hidden p-12 text-center">
                    {/* Scanning effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--neon-orange)] to-transparent"
                            style={{ animation: 'scanline 1.5s linear infinite' }} />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--neon-orange)]/50" />
                    <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--neon-orange)]/50" />
                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[var(--neon-orange)]/50" />
                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--neon-orange)]/50" />

                    {/* 3D Cube Loader */}
                    <div className="mb-6 flex justify-center">
                        <CubeLoader size={80} />
                    </div>

                    {/* Status Text */}
                    <h3 className="mb-2 text-xl font-bold text-white">
                        TRANSMITTING<span className="animate-pulse">...</span>
                    </h3>
                    <p className="text-sm text-white/50">Establishing secure connection</p>

                    {/* Progress bar */}
                    <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-[var(--neon-orange)] to-cyan-400"
                            style={{ animation: 'progress 1.5s ease-in-out infinite' }} />
                    </div>
                </div>

                <style jsx>{`
                    @keyframes scanline {
                        0% { top: -2px; }
                        100% { top: 100%; }
                    }
                    @keyframes progress {
                        0% { transform: translateX(-100%); }
                        50% { transform: translateX(0%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </div>
        );
    }

    // Default Form UI
    return (
        <div className="relative mx-auto max-w-2xl">
            {/* Holographic background grid */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 87, 34, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 87, 34, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Scanline effect */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-orange)]/50 to-transparent"
                    style={{
                        animation: 'scanline 3s linear infinite'
                    }}
                />
            </div>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card relative overflow-hidden p-8 md:p-12"
            >
                {/* Corner accents */}
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--neon-orange)]/50" />
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--neon-orange)]/50" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[var(--neon-orange)]/50" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--neon-orange)]/50" />

                <h3 className="mb-8 text-center text-2xl font-bold text-white">
                    <span className="text-[var(--neon-orange)]">Initialize</span> Connection
                </h3>

                {/* Name field */}
                <HolographicInput
                    label="Identifier"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    focused={focusedField === 'name'}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                />

                {/* Email field */}
                <HolographicInput
                    label="Communication Channel"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    focused={focusedField === 'email'}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                />

                {/* Message field */}
                <HolographicTextarea
                    label="Transmission"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message..."
                    focused={focusedField === 'message'}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                />

                {/* Submit button */}
                <button
                    type="submit"
                    className="group relative mt-8 w-full overflow-hidden rounded-xl border border-[var(--neon-orange)]/50 bg-[var(--neon-orange)]/10 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-[var(--neon-orange)] hover:bg-[var(--neon-orange)]/20"
                >
                    {/* Button glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--neon-orange)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="relative z-10 flex items-center justify-center gap-3">
                        <span>Send Transmission</span>
                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </button>

                {/* Error message */}
                {error && (
                    <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                        <span className="mr-2">⚠</span>{error}
                    </div>
                )}
            </form>

            {/* Add scanline animation */}
            <style jsx>{`
                @keyframes scanline {
                    0% { top: -2px; }
                    100% { top: 100%; }
                }
            `}</style>
        </div>
    );
}

// Holographic input component
interface InputProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
    required?: boolean;
}

function HolographicInput({ label, name, type, value, onChange, placeholder, focused, onFocus, onBlur, required }: InputProps) {
    const glowRef = useRef<HTMLDivElement>(null);

    // Light trail effect following cursor
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!glowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
        if (glowRef.current) {
            glowRef.current.style.opacity = '0';
        }
    };

    return (
        <div
            className="group relative mb-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--neon-orange)]">
                {label}
            </label>
            <div className="relative">
                {/* Cursor glow effect */}
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute top-0 h-full w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--neon-orange)]/20 to-transparent opacity-0 transition-opacity duration-300"
                />

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    className={`w-full rounded-lg border bg-black/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 ${focused || value
                        ? 'border-[var(--neon-orange)] shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                />

                {/* Active indicator line */}
                <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--neon-orange)] to-[var(--electric-blue)] transition-all duration-500 ${focused ? 'w-full' : 'w-0'
                        }`}
                />
            </div>
        </div>
    );
}

// Holographic textarea component
interface TextareaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    focused: boolean;
    onFocus: () => void;
    onBlur: () => void;
    required?: boolean;
}

function HolographicTextarea({ label, name, value, onChange, placeholder, focused, onFocus, onBlur, required }: TextareaProps) {
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!glowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top = `${y}px`;
        glowRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
        if (glowRef.current) {
            glowRef.current.style.opacity = '0';
        }
    };

    return (
        <div
            className="group relative mb-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--neon-orange)]">
                {label}
            </label>
            <div className="relative overflow-hidden rounded-lg">
                {/* Cursor glow effect */}
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-orange)]/20 blur-xl opacity-0 transition-opacity duration-300"
                />

                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    rows={5}
                    className={`w-full resize-none rounded-lg border bg-black/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 ${focused || value
                        ? 'border-[var(--neon-orange)] shadow-[0_0_15px_rgba(255,87,34,0.3)]'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                />

                {/* Active indicator line */}
                <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[var(--neon-orange)] to-[var(--electric-blue)] transition-all duration-500 ${focused ? 'w-full' : 'w-0'
                        }`}
                />
            </div>
        </div>
    );
}
