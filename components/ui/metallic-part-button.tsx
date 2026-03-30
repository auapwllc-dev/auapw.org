"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

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
      {/* Matte dark outer border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-500 to-zinc-600" />
      
      {/* Matte dark inner area */}
      <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {icon && <div className="mb-0.5">{icon}</div>}
        <span className={cn("font-semibold text-zinc-100 tracking-wide", textSizes[size].part)}>
          {partName}
        </span>
        {status && (
          <span className={cn("text-zinc-500 tracking-wider uppercase", textSizes[size].status)}>
            {status}
          </span>
        )}
      </div>
    </>
  )

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center rounded-full",
    "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
    "active:translate-y-0",
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {buttonContent}
    </button>
  )
}

// Get Quote Button - matte style
export function MetallicGetQuoteButton({
  href = "/quote",
  size = "md",
  className,
}: {
  href?: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
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
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full overflow-hidden",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        "active:translate-y-0",
        sizeClasses[size],
        className
      )}
    >
      {/* Matte dark outer border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-500 to-zinc-600" />

      {/* Matte dark inner area */}
      <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        <div className={iconSizes[size]}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-zinc-300">
            <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.5" />
            <path d="M22 6L12 13L2 6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className={cn("font-medium text-zinc-200 tracking-wide", textSizes[size])}>
          Get Quote
        </span>
      </div>
    </Link>
  )
}

// Silver metallic button variant - matte style
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
      {/* Matte silver outer border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-500" />

      {/* Matte silver interior */}
      <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-zinc-300 to-zinc-400" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {icon}
        <span className={cn("font-bold text-zinc-900 tracking-wide uppercase", textSizes[size])}>
          {children}
        </span>
      </div>
    </>
  )

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center rounded-full overflow-hidden",
    "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
    "active:translate-y-0",
    sizeClasses[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {buttonContent}
    </button>
  )
}
