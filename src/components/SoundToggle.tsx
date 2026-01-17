'use client';

import { useState, useEffect } from 'react';
import { soundManager } from '@/lib/soundEffects';
import styled from 'styled-components';

export default function SoundToggle() {
    const [isSoundOn, setIsSoundOn] = useState(true);

    useEffect(() => {
        setIsSoundOn(soundManager.getEnabled());
    }, []);

    const toggleSound = () => {
        const newState = soundManager.toggle();
        setIsSoundOn(newState);
        if (newState) {
            setTimeout(() => soundManager.playClick(), 100);
        }
    };

    return (
        <StyledWrapper>
            <div className="sound-toggle-container">
                <input
                    type="checkbox"
                    id="soundToggle"
                    checked={!isSoundOn}
                    onChange={toggleSound}
                />
                <label htmlFor="soundToggle" className="toggleSwitch">
                    {/* Sound ON - Speaker with waves */}
                    <div className="speaker">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
                            <path
                                d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                                style={{
                                    stroke: '#FF5722',
                                    strokeWidth: 5,
                                    strokeLinejoin: 'round',
                                    fill: '#FF5722'
                                }}
                            />
                            <path
                                d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                                style={{
                                    fill: 'none',
                                    stroke: '#FF5722',
                                    strokeWidth: 5,
                                    strokeLinecap: 'round'
                                }}
                            />
                        </svg>
                    </div>

                    {/* Sound OFF - Muted speaker */}
                    <div className="mute-speaker">
                        <svg viewBox="0 0 75 75" stroke="#fff" strokeWidth={5}>
                            <path
                                d="m39,14-17,15H6V48H22l17,15z"
                                fill="#888"
                                stroke="#888"
                                strokeLinejoin="round"
                            />
                            <path
                                d="m49,26 20,24m0-24-20,24"
                                fill="none"
                                stroke="#888"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Glow ring when active */}
                    <div className="glow-ring" />
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .sound-toggle-container {
        position: fixed;
        bottom: 5rem;
        left: 1rem;
        z-index: 60;
    }

    @media (min-width: 768px) {
        .sound-toggle-container {
            bottom: 2rem;
            left: 2rem;
        }
    }

    .toggleSwitch {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(30, 30, 40, 0.9) 100%);
        border: 1px solid rgba(255, 87, 34, 0.2);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .toggleSwitch:hover {
        background: linear-gradient(135deg, rgba(30, 30, 40, 0.95) 0%, rgba(40, 40, 50, 0.95) 100%);
        border-color: rgba(255, 87, 34, 0.5);
        transform: scale(1.05);
        box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(255, 87, 34, 0.2);
    }

    .toggleSwitch:active {
        transform: scale(0.95);
    }

    #soundToggle {
        display: none;
    }

    .speaker {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        transition: all 0.3s ease;
    }

    .speaker svg {
        width: 22px;
        height: 22px;
    }

    .mute-speaker {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        z-index: 3;
        transition: all 0.3s ease;
    }

    .mute-speaker svg {
        width: 22px;
        height: 22px;
    }

    .glow-ring {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 2px solid transparent;
        background: linear-gradient(rgba(20, 20, 30, 1), rgba(20, 20, 30, 1)) padding-box,
                    linear-gradient(135deg, #FF5722, #00FFFF) border-box;
        opacity: 0;
        transition: opacity 0.3s ease;
        animation: ringRotate 3s linear infinite;
    }

    @keyframes ringRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    /* When muted (checked) */
    #soundToggle:checked + .toggleSwitch .speaker {
        opacity: 0;
        transform: scale(0.8);
    }

    #soundToggle:checked + .toggleSwitch .mute-speaker {
        opacity: 1;
        transform: scale(1);
    }

    #soundToggle:checked + .toggleSwitch {
        border-color: rgba(255, 255, 255, 0.1);
    }

    #soundToggle:checked + .toggleSwitch .glow-ring {
        opacity: 0;
    }

    /* When unmuted (not checked) - show glow */
    #soundToggle:not(:checked) + .toggleSwitch .glow-ring {
        opacity: 1;
    }

    #soundToggle:not(:checked) + .toggleSwitch {
        box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(255, 87, 34, 0.3);
    }
`;
