'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface CubeLoaderProps {
  size?: number;
  className?: string;
}

const CubeLoader: React.FC<CubeLoaderProps> = ({ size = 75, className }) => {
  return (
    <StyledWrapper $size={size} className={className}>
      <div className="cube-loader">
        <div className="cube-top" />
        <div className="cube-wrapper">
          <span style={{ '--i': 0 } as React.CSSProperties} className="cube-span" />
          <span style={{ '--i': 1 } as React.CSSProperties} className="cube-span" />
          <span style={{ '--i': 2 } as React.CSSProperties} className="cube-span" />
          <span style={{ '--i': 3 } as React.CSSProperties} className="cube-span" />
        </div>
      </div>
    </StyledWrapper>
  );
};

// Keyframe animations
const rotate = keyframes`
  0% {
    transform: rotateX(-30deg) rotateY(0);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

const colorShift = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(30deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 87, 34, 0.5),
                0 0 20px rgba(255, 87, 34, 0.3),
                0 0 30px rgba(0, 243, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 87, 34, 0.8),
                0 0 40px rgba(255, 87, 34, 0.5),
                0 0 60px rgba(0, 243, 255, 0.4);
  }
`;

const StyledWrapper = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 3s ease-in-out infinite, ${colorShift} 8s ease-in-out infinite;

  .cube-loader {
    position: relative;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg);
    animation: ${rotate} 4s linear infinite;
  }

  .cube-loader .cube-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .cube-loader .cube-wrapper .cube-span {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(calc(90deg * var(--i))) translateZ(${props => props.$size / 2}px);
    background: linear-gradient(
      to bottom,
      #1a1a2e 0%,
      #16213e 10%,
      #0f3460 25%,
      #ff5722 50%,
      #ff7043 65%,
      #00f3ff 85%,
      #00bcd4 100%
    );
    border: 1px solid rgba(255, 87, 34, 0.3);
  }

  .cube-top {
    position: absolute;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    background: linear-gradient(135deg, #1a1a2e 0%, #ff5722 50%, #00f3ff 100%);
    transform: rotateX(90deg) translateZ(${props => props.$size / 2}px);
    transform-style: preserve-3d;
    animation: ${glowPulse} 2s ease-in-out infinite;
  }

  .cube-top::before {
    content: '';
    position: absolute;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    background: linear-gradient(135deg, #ff5722 0%, #00f3ff 100%);
    transform: translateZ(-${props => props.$size * 1.2}px);
    filter: blur(15px);
    opacity: 0.6;
    animation: ${glowPulse} 2s ease-in-out infinite;
  }

  /* Hover interaction */
  &:hover .cube-loader {
    animation-duration: 2s;
  }

  &:hover .cube-top {
    background: linear-gradient(135deg, #00f3ff 0%, #ff5722 50%, #1a1a2e 100%);
  }
`;

export default CubeLoader;
