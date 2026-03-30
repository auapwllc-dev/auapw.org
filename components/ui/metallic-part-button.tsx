"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRef, useCallback } from "react"

interface MetallicPartButtonProps {
  partName: string
  status?: string
  href?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: React.ReactNode
}

export function MetallicPartButton({
  partName,
  status = "In Stock",
  href,
  onClick,
  size = "md",
  className,
  icon,
}: MetallicPartButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  // Create water ripple effect on click
  const createRipple = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.className = "ripple"
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
      animation: water-ripple 0.7s ease-out forwards;
      pointer-events: none;
      z-index: 20;
    `
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }, [])

  const sizeClasses = {
    sm: "px-4 py-2 min-w-[120px]",
    md: "px-6 py-3 min-w-[160px]",
    lg: "px-8 py-4 min-w-[200px]",
  }

  const textSizes = {
    sm: { part: "text-xs", status: "text-[9px]" },
    md: { part: "text-sm", status: "text-[10px]" },
    lg: { part: "text-base", status: "text-xs" },
  }

  const buttonContent = (
    <>
      {/* LED Corner Lights */}
      <span className="led-corner tl" />
      <span className="led-corner tr" />
      <span className="led-corner bl" />
      <span className="led-corner br" />

      {/* Chrome outer border with liquid animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 animate-[liquid-flow_3s_ease_infinite] bg-[length:100%_200%]" />
      </div>
      
      {/* Dark inner area */}
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 overflow-hidden">
        {/* Liquid mercury shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-[-20deg]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {icon && <div className="mb-0.5">{icon}</div>}
        <span className={cn("font-semibold text-white tracking-wide drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]", textSizes[size].part)}>
          {partName}
        </span>
        {status && (
          <span className={cn("text-zinc-400 tracking-wider uppercase", textSizes[size].status)}>
            {status}
          </span>
        )}
      </div>

      {/* Glossy water surface highlight */}
      <div className="absolute inset-x-4 top-[6px] h-[30%] rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      
      {/* Bottom water depth shadow */}
      <div className="absolute inset-x-4 bottom-[4px] h-[20%] rounded-full bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </>
  )

  const baseClasses = cn(
    "led-corner-btn group relative inline-flex items-center justify-center rounded-full",
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.1)]",
    "active:translate-y-0 active:shadow-md",
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClasses}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        onClick={createRipple}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button 
      type="button" 
      onClick={(e) => {
        createRipple(e)
        onClick?.()
      }} 
      className={baseClasses}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
    >
      {buttonContent}
    </button>
  )
}

// Get Quote Button with email icon and LED effects
export function MetallicGetQuoteButton({
  href = "/quote",
  size = "md",
  className,
}: {
  href?: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const createRipple = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
      animation: water-ripple 0.7s ease-out forwards;
      pointer-events: none;
      z-index: 20;
    `
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }, [])

  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <Link
      href={href}
      ref={buttonRef}
      onClick={createRipple}
      className={cn(
        "led-corner-btn group relative inline-flex items-center justify-center gap-2 rounded-full overflow-visible",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.1)]",
        "active:translate-y-0 active:shadow-md",
        sizeClasses[size],
        className
      )}
    >
      {/* LED Corner Lights */}
      <span className="led-corner tl" />
      <span className="led-corner tr" />
      <span className="led-corner bl" />
      <span className="led-corner br" />

      {/* Chrome outer border with liquid animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-500 animate-[liquid-flow_3s_ease_infinite] bg-[length:100%_200%]" />
      </div>

      {/* Dark inner area */}
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 overflow-hidden">
        {/* Liquid mercury shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-[-20deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Email icon with glow */}
        <div className={cn("relative drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]", iconSizes[size])}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-zinc-200">
            <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5" />
            <path d="M22 6L12 13L2 6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {/* @ symbol overlay */}
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-zinc-600 flex items-center justify-center border border-zinc-500">
            <span className="text-[6px] text-zinc-200 font-bold">@</span>
          </div>
        </div>
        <span className={cn("font-medium text-zinc-100 tracking-wide drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]", textSizes[size])}>
          get quote
        </span>
      </div>

      {/* Glossy water surface highlight */}
      <div className="absolute inset-x-4 top-[4px] h-[35%] rounded-full bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
      
      {/* Bottom water depth */}
      <div className="absolute inset-x-4 bottom-[3px] h-[20%] rounded-full bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
    </Link>
  )
}

// Silver metallic button variant (for Find Your Part, etc.)
export function MetallicSilverButton({
  children,
  href,
  onClick,
  size = "md",
  className,
  icon,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: React.ReactNode
}) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const createRipple = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("span")
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%);
      animation: water-ripple 0.7s ease-out forwards;
      pointer-events: none;
      z-index: 20;
    `
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }, [])

  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const buttonContent = (
    <>
      {/* LED Corner Lights (darker for silver) */}
      <span className="led-corner tl" style={{ background: "radial-gradient(circle, rgba(100,100,100,0.8) 0%, transparent 100%)" }} />
      <span className="led-corner tr" style={{ background: "radial-gradient(circle, rgba(100,100,100,0.8) 0%, transparent 100%)" }} />
      <span className="led-corner bl" style={{ background: "radial-gradient(circle, rgba(100,100,100,0.8) 0%, transparent 100%)" }} />
      <span className="led-corner br" style={{ background: "radial-gradient(circle, rgba(100,100,100,0.8) 0%, transparent 100%)" }} />

      {/* Chrome outer border with liquid animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-400 via-zinc-500 to-zinc-600 animate-[liquid-flow_3s_ease_infinite] bg-[length:100%_200%]" />
      </div>

      {/* Silver/brushed metal interior */}
      <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 overflow-hidden">
        {/* Liquid shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-[-20deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {icon}
        <span className={cn("font-bold text-zinc-900 tracking-wide uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]", textSizes[size])}>
          {children}
        </span>
      </div>

      {/* Glossy water highlight */}
      <div className="absolute inset-x-4 top-[3px] h-[40%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
    </>
  )

  const baseClasses = cn(
    "led-corner-btn group relative inline-flex items-center justify-center rounded-full overflow-visible",
    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3),0_0_15px_rgba(150,150,150,0.2)]",
    "active:translate-y-0 active:shadow-md",
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <Link 
        href={href} 
        className={baseClasses}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        onClick={createRipple}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button 
      type="button" 
      onClick={(e) => {
        createRipple(e)
        onClick?.()
      }} 
      className={baseClasses}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
    >
      {buttonContent}
    </button>
  )
}
