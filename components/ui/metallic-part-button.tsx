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
      {/* Clean matte dark background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 border border-zinc-600" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {icon && <div className="mb-0.5">{icon}</div>}
        <span className={cn("font-semibold text-white tracking-wide", textSizes[size].part)}>
          {partName}
        </span>
        {status && (
          <span className={cn("text-zinc-400 tracking-wider uppercase", textSizes[size].status)}>
            {status}
          </span>
        )}
      </div>
    </>
  )

  const baseClasses = cn(
    "relative group overflow-visible rounded-full transition-all duration-200",
    "hover:bg-zinc-600 hover:-translate-y-0.5",
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

// Simplified Metallic Button - Clean matte design
export function MetallicButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: React.ReactNode
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }

  const variantClasses = {
    primary: "bg-zinc-800 border-zinc-600 text-white hover:bg-zinc-700",
    secondary: "bg-zinc-700 border-zinc-500 text-white hover:bg-zinc-600",
    outline: "bg-transparent border-zinc-500 text-zinc-300 hover:bg-zinc-800 hover:text-white",
  }

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full border font-semibold transition-all duration-200",
    "hover:-translate-y-0.5",
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {icon}
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {icon}
      {children}
    </button>
  )
}
