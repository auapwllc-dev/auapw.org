"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface MetallicButtonProps {
  href?: string
  onClick?: () => void
  variant?: "silver" | "dark" | "stock" | "chrome"
  size?: "sm" | "md" | "lg"
  className?: string
  children: React.ReactNode
  external?: boolean
  type?: "button" | "submit"
}

export function MetallicButton({
  href,
  onClick,
  variant = "silver",
  size = "md",
  className,
  children,
  external = false,
  type = "button",
}: MetallicButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 rounded-full overflow-hidden",
    "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
    // Size variants
    size === "sm" && "px-4 py-2 text-xs",
    size === "md" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-base",
    className
  )

  const variantStyles = cn(
    // Silver variant - brushed metal look with forced black text
    variant === "silver" && [
      "!text-black",
      "bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400",
      "border-2 border-zinc-400",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.4)]",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(0,0,0,0.3),0_6px_16px_rgba(0,0,0,0.5)]",
    ],
    // Dark variant - dark metallic
    variant === "dark" && [
      "text-zinc-100",
      "bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900",
      "border-2 border-zinc-500",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.5)]",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.5),0_6px_16px_rgba(0,0,0,0.6)]",
    ],
    // Stock variant - for inventory items
    variant === "stock" && [
      "text-zinc-100",
      "bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-800",
      "border border-zinc-500",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.4)]",
    ],
    // Chrome variant - dark glossy interior with 3D chrome border frame
    variant === "chrome" && [
      "text-white",
      "bg-gradient-to-b from-zinc-800 via-zinc-900 to-black",
      "border-[3px] border-transparent",
      "shadow-[0_0_0_1px_rgba(180,180,180,0.8),0_0_0_2px_rgba(100,100,100,0.6),0_0_0_4px_rgba(60,60,60,0.4),inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.6)]",
      "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:via-transparent before:to-black/20",
      "after:absolute after:inset-[-3px] after:rounded-full after:bg-gradient-to-b after:from-zinc-300 after:via-zinc-500 after:to-zinc-700 after:-z-10",
      "hover:shadow-[0_0_0_1px_rgba(200,200,200,0.9),0_0_0_2px_rgba(120,120,120,0.7),0_0_0_4px_rgba(80,80,80,0.5),inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.6),0_6px_16px_rgba(0,0,0,0.7)]",
    ]
  )

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
  )

  if (href) {
    if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={cn(baseStyles, variantStyles)} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={cn(baseStyles, variantStyles)}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseStyles, variantStyles)}>
      {content}
    </button>
  )
}

// Pre-built button variants
export function FindYourPartButton({ className }: { className?: string }) {
  return (
    <MetallicButton href="/parts" variant="silver" size="lg" className={className}>
      Find Your Part
    </MetallicButton>
  )
}

export function GetQuoteButton({ className }: { className?: string }) {
  return (
    <MetallicButton href="/quote" variant="dark" size="md" className={className}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      Get Quote
    </MetallicButton>
  )
}

export function EmailUsButton({ email = "support@auapw.org", className }: { email?: string; className?: string }) {
  return (
    <MetallicButton href={`mailto:${email}`} variant="chrome" size="md" className={cn("h-12", className)}>
      <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span className="text-white text-xs font-black truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{email}</span>
    </MetallicButton>
  )
}

export function LocationButton({ className }: { className?: string }) {
  return (
    <MetallicButton 
      href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" 
      variant="chrome" 
      size="md" 
      external
      className={cn("h-12", className)}
    >
      <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="text-white text-xs font-black truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>107 Myrtle Ave, Woodbine, NJ</span>
    </MetallicButton>
  )
}

export function StockButton({ partName, className }: { partName: string; className?: string }) {
  return (
    <div className={cn(
      "inline-flex flex-col items-center justify-center px-6 py-3 rounded-full",
      "bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900",
      "border border-zinc-500",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_8px_rgba(0,0,0,0.4)]",
      className
    )}>
      <span className="text-sm font-bold text-zinc-100">{partName}</span>
      <span className="text-xs text-emerald-400">In Stock</span>
    </div>
  )
}

export function CallNowButton({ className }: { className?: string }) {
  return (
    <MetallicButton href="tel:8888185001" variant="chrome" size="md" className={cn("h-12", className)}>
      <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span className="text-white text-xs font-black" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>Call (888) 818-5001</span>
    </MetallicButton>
  )
}
