'use client'

import React from 'react'
import Image from 'next/image'

interface BrandEmblem3DProps {
  effect?: 'mercury' | 'diamond-led' | 'ghost-scan'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function BrandEmblem3D({ 
  effect = 'diamond-led', 
  size = 'lg',
  animated = true 
}: BrandEmblem3DProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  }

  const imageSizes = {
    sm: 100,
    md: 160,
    lg: 220,
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Animated Gear Backdrop */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ 
        animation: animated ? 'gear-rotate 45s linear infinite' : 'none' 
      }}>
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <g stroke="rgba(232,232,232,0.3)" strokeWidth="2" fill="none">
            <circle cx="200" cy="200" r="120" />
            <circle cx="200" cy="200" r="110" />
            <g>
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                <line
                  key={angle}
                  x1="200"
                  y1="90"
                  x2="200"
                  y2="70"
                  stroke="rgba(232,232,232,0.2)"
                  strokeWidth="3"
                  transform={`rotate(${angle} 200 200)`}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>

      {/* 3D Emblem Container */}
      <div 
        className={`${sizeClasses[size]} relative flex items-center justify-center ${animated ? 'animate-emblem-pulse' : ''}`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Logo Image */}
        <div className="relative z-10">
          <Image
            src="/images/auapw-logo.jpeg"
            alt="AUAPW - All Used Auto Parts World"
            width={imageSizes[size]}
            height={imageSizes[size]}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232,232,232,0.15) 0%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Mercury Effect Overlay */}
        {effect === 'mercury' && (
          <div
            className="absolute inset-0 rounded-full opacity-40 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% auto',
              animation: animated ? 'mercury-flow 4s ease-in-out infinite' : 'none',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* Diamond LED Effect */}
        {effect === 'diamond-led' && (
          <div
            className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.5) 10%, transparent 20%)',
              animation: animated ? 'gear-rotate 8s linear infinite' : 'none',
            }}
          />
        )}
      </div>
    </div>
  )
}
