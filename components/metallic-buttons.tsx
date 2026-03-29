"use client"

import Image from "next/image"
import Link from "next/link"

// Find Your Part Button - Large silver metallic
export function FindYourPartButton({ href = "/search", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-block transition-transform hover:scale-105 ${className}`}>
      <Image
        src="/images/buttons/find-your-part.jpg"
        alt="Find Your Part"
        width={400}
        height={80}
        className="h-auto w-full max-w-[400px]"
      />
    </Link>
  )
}

// Get Quote Button - Dark with envelope icon
export function GetQuoteButton({ href = "/quote", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-block transition-transform hover:scale-105 ${className}`}>
      <Image
        src="/images/buttons/get-quote-dark.png"
        alt="Get Quote"
        width={300}
        height={70}
        className="h-auto w-full max-w-[300px]"
      />
    </Link>
  )
}

// Location Address Button
export function LocationButton({ className = "" }: { className?: string }) {
  return (
    <a 
      href="https://maps.google.com/?q=107+Myrtle+Ave,+Woodbine,+NJ+08270" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`inline-block transition-transform hover:scale-105 ${className}`}
    >
      <Image
        src="/images/buttons/location-address.png"
        alt="Location: 107 Myrtle Ave, Woodbine, NJ 08270"
        width={350}
        height={90}
        className="h-auto w-full max-w-[350px]"
      />
    </a>
  )
}

// Support Email Button
export function SupportEmailButton({ className = "" }: { className?: string }) {
  return (
    <a 
      href="mailto:support@auapw.org"
      className={`inline-block transition-transform hover:scale-105 ${className}`}
    >
      <Image
        src="/images/buttons/support-email-us.png"
        alt="Email Us: support@auapw.org"
        width={400}
        height={70}
        className="h-auto w-full max-w-[400px]"
      />
    </a>
  )
}

// Info Email Button
export function InfoEmailButton({ className = "" }: { className?: string }) {
  return (
    <a 
      href="mailto:info@auapw.org"
      className={`inline-block transition-transform hover:scale-105 ${className}`}
    >
      <Image
        src="/images/buttons/info-email-us.png"
        alt="Email Us: info@auapw.org"
        width={400}
        height={70}
        className="h-auto w-full max-w-[400px]"
      />
    </a>
  )
}

// Part Stock Button (for parts like Engine, CV Pump, etc.)
export function PartStockButton({ 
  partName, 
  variant = "engine",
  href,
  className = "" 
}: { 
  partName: string
  variant?: "engine" | "cv-pump"
  href?: string
  className?: string 
}) {
  const imageSrc = variant === "engine" 
    ? "/images/buttons/engine-stock.png" 
    : "/images/buttons/cv-pump-stock.png"
  
  const content = (
    <Image
      src={imageSrc}
      alt={`${partName} - In Stock`}
      width={200}
      height={60}
      className="h-auto w-full max-w-[200px]"
    />
  )

  if (href) {
    return (
      <Link href={href} className={`inline-block transition-transform hover:scale-105 ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <div className={`inline-block ${className}`}>
      {content}
    </div>
  )
}

// Metallic Cart Icon
export function MetallicCartIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/icons/cart-metallic.png"
      alt="Shopping Cart"
      width={50}
      height={50}
      className={`h-auto w-[50px] ${className}`}
    />
  )
}

// Combined Contact Buttons Row
export function ContactButtonsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <SupportEmailButton />
      <LocationButton />
    </div>
  )
}

// CTA Button Group
export function CTAButtonGroup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      <FindYourPartButton />
      <GetQuoteButton />
    </div>
  )
}
