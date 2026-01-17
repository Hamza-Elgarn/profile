// Premium Sound Effects System using Howler.js
// Uses real audio files for high-quality cinematic experience

import { Howl, Howler } from 'howler';

// Sound file paths (relative to public folder)
const SOUNDS = {
    // Cinematic power-up for loading screen
    powerUp: '/sounds/future-high-tech-logo-158838.mp3',
    // Boom/transition effect
    boom: '/sounds/boom-geomorphism-cinematic-trailer-sound-effects-123876.mp3',
    // Digital click for buttons/links
    click: '/sounds/click-21156.mp3',
    // Transition whoosh
    transition: '/sounds/transition-base-121422.mp3'
};

class SoundManager {
    private sounds: Map<string, Howl> = new Map();
    private isEnabled: boolean = true; // Sound enabled by default
    private isInitialized: boolean = false;

    constructor() {
        // Pre-load all sounds
        this.initializeSounds();
    }

    private initializeSounds() {
        if (this.isInitialized) return;

        // Power-up sound (for loading screen)
        this.sounds.set('powerUp', new Howl({
            src: [SOUNDS.powerUp],
            volume: 0.4,
            preload: true
        }));

        // Boom/cinematic effect
        this.sounds.set('boom', new Howl({
            src: [SOUNDS.boom],
            volume: 0.3,
            preload: true
        }));

        // Click sound
        this.sounds.set('click', new Howl({
            src: [SOUNDS.click],
            volume: 0.3,
            preload: true
        }));

        // Transition whoosh
        this.sounds.set('transition', new Howl({
            src: [SOUNDS.transition],
            volume: 0.25,
            preload: true
        }));

        this.isInitialized = true;
    }

    // Get enabled state
    getEnabled(): boolean {
        return this.isEnabled;
    }

    // Toggle sound on/off
    toggle(): boolean {
        this.setEnabled(!this.isEnabled);
        return this.isEnabled;
    }

    // Enable/Disable all sounds
    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }

    // Play power-up sound (loading screen)
    playPowerUp() {
        if (!this.isEnabled) return;
        const sound = this.sounds.get('powerUp');
        if (sound) {
            sound.play();
        }
    }

    // Play cinematic boom
    playBoom() {
        if (!this.isEnabled) return;
        const sound = this.sounds.get('boom');
        if (sound) {
            sound.play();
        }
    }

    // Play click sound
    playClick() {
        if (!this.isEnabled) return;
        const sound = this.sounds.get('click');
        if (sound) {
            sound.play();
        }
    }

    // Play transition whoosh
    playTransition() {
        if (!this.isEnabled) return;
        const sound = this.sounds.get('transition');
        if (sound) {
            sound.play();
        }
    }

    // Global mute/unmute using Howler
    mute() {
        Howler.mute(true);
    }

    unmute() {
        Howler.mute(false);
    }
}

// Singleton instance
export const soundManager = new SoundManager();

// Legacy compatibility - map old function names
export const soundEffects = {
    getEnabled: () => soundManager.getEnabled(),
    toggle: () => soundManager.toggle(),
    setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
    playBootSound: () => soundManager.playPowerUp(),
    playScanSound: () => { },
    playTypingSound: () => { },
    playGlitchSound: () => { },
    playCompleteSound: () => soundManager.playBoom(),
    playDigitalClick: () => soundManager.playClick(),
    playWhoosh: () => soundManager.playTransition(),
    playHoverSound: () => soundManager.playClick(),
    startAmbientHum: () => { }, // Removed - was annoying
    stopAmbientHum: () => { }   // Removed
};
