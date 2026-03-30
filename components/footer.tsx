"use client"

import Link from "next/link"
import Image from "next/image"
import { CAR_MAKES, PART_CATEGORIES, PHONE_DISPLAY, PHONE_SALES, CONTACT_EMAIL, getBrandLogoUrl, BRAND_COLORS } from "@/lib/data"
import { Phone, Mail, MapPin, Clock, Shield, Truck, ExternalLink } from "lucide-react"
import { BrandWordmark } from "@/components/brand-wordmark"
import { Logo } from "@/components/logo"
import { CallNowButton, EmailUsButton, LocationButton } from "@/components/ui/metallic-button"
import { useState } from "react"

function BrandLogo({ brand }: { brand: string }) {
  const [failed, setFailed] = useState(false)
  const url = getBrandLogoUrl(brand)
  const color = BRAND_COLORS[brand] || "#333"
  const initials = brand.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()

  if (!url || failed) {
    return (
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white/90"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
      >
        {initials}
      </div>
    )
  }

  return (
    <Image
      src={url}
      alt={brand}
      width={32}
      height={32}
      className="w-8 h-8 rounded-lg object-cover"
      onError={() => setFailed(true)}
    />
  )
}

// Metallic button component for footer
function MetallicFooterButton({ 
  href, 
  icon: Icon, 
  title, 
  subtitle,
  external = false 
}: { 
  href: string
  icon: React.ElementType
  title: string
  subtitle?: string
  external?: boolean
}) {
  const LinkComponent = external ? 'a' : Link
  const extraProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  
  return (
    <LinkComponent 
      href={href}
      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex w-full"
      style={{
        background: "linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 10%, #71717a 90%, #52525b 100%)",
        padding: "2px",
      }}
      {...extraProps}
    >
      <div 
        className="relative rounded-[10px] px-4 py-3 flex items-center gap-3 w-full"
        style={{
          background: "linear-gradient(180deg, #3f3f46 0%, #27272a 20%, #18181b 80%, #09090b 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)",
        }}
      >
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
          <Icon className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-sm font-bold text-white truncate">{title}</span>
          {subtitle && <span className="text-xs text-zinc-400 truncate">{subtitle}</span>}
        </div>
      </div>
    </LinkComponent>
  )
}

export function Footer() {
  const popularParts = [
    "Used Engines",
    "Transmissions", 
    "Transfer Cases",
    "AC Compressors",
    "Alternators",
    "Starters",
    "Radiators",
  ]
  
  const popularMakes = CAR_MAKES.slice(0, 8)

  return (
    <footer className="relative overflow-hidden dark" style={{ colorScheme: 'dark' }}>
      {/* Dark gradient overlay background - Always dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900" />
      
      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Section - Trust Badges */}
        <div className="border-b border-zinc-700/50 bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 md:py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { icon: Shield, label: "30-180 Day Warranty", sublabel: "On All Parts" },
                { icon: Truck, label: "Free Shipping", sublabel: "Orders $200+" },
                { icon: Clock, label: "Same Day Shipping", sublabel: "Order by 2PM" },
                { icon: Phone, label: "Expert Support", sublabel: "Mon-Fri 9-6 EST" },
              ].map(({ icon: Icon, label, sublabel }) => (
                <div key={label} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] md:text-xs font-black text-white truncate" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{label}</div>
                    <div className="text-[9px] md:text-[10px] text-zinc-400 truncate">{sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Logos Strip */}
        <div className="border-b border-zinc-700/30 bg-zinc-950/50 py-3 md:py-4">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] md:text-xs font-black tracking-[0.15em] uppercase text-zinc-400" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>Popular Brands</span>
              <div className="flex-1 h-px bg-zinc-700/50" />
              <Link href="/makes" className="text-[10px] md:text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-1">
                View All <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {CAR_MAKES.slice(0, 12).map((brand) => (
                <Link
                  key={brand}
                  href={`/makes/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/30 hover:border-zinc-600/50 transition-all group"
                  title={`${brand} Parts`}
                >
                  <BrandLogo brand={brand} />
                  <span className="text-[10px] md:text-xs font-bold text-zinc-400 group-hover:text-white hidden sm:block">
                    {brand}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 bg-zinc-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            
            {/* Brand & Contact Column */}
            <div className="lg:col-span-4">
              {/* Logo & Brand */}
              <div className="flex items-center gap-3 mb-4">
                <Logo size="sm" variant="ring" />
                <BrandWordmark size="footer" />
              </div>
              
              {/* Contact Buttons - Equal Size */}
              <div className="grid grid-cols-1 gap-2">
                <CallNowButton className="w-full" />
                <EmailUsButton className="w-full" />
                <LocationButton className="w-full" />
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                
                {/* Popular Parts */}
                <div className="relative p-4 md:p-5 rounded-xl bg-zinc-900/30 border border-zinc-600/20 overflow-hidden backdrop-blur-sm">
                  {/* Background Metallic Gear Image */}
                  <Image 
                    src="/images/footer/gear.png" 
                    alt="" 
                    width={120} 
                    height={120} 
                    className="absolute -right-6 -bottom-6 w-28 h-28 opacity-[0.07]"
                  />
                  <h3 className="relative text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-3 pb-2 border-b border-zinc-600/30"
                      style={{ 
                        color: '#d4d4d8',
                        textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                      }}>
                    Popular Parts
                  </h3>
                  <ul className="relative space-y-2">
                    {popularParts.map((part) => (
                      <li key={part}>
                        <Link 
                          href={`/search?part=${encodeURIComponent(part)}`}
                          className="text-xs md:text-sm font-extrabold text-zinc-200 hover:text-white transition-colors"
                          style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          {part}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Makes */}
                <div className="relative p-4 md:p-5 rounded-xl bg-zinc-900/30 border border-zinc-600/20 overflow-hidden backdrop-blur-sm">
                  {/* Background Metallic Car Image */}
                  <Image 
                    src="/images/footer/car.png" 
                    alt="" 
                    width={120} 
                    height={80} 
                    className="absolute -right-4 -bottom-2 w-28 h-auto opacity-[0.08]"
                  />
                  <h3 className="relative text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-3 pb-2 border-b border-zinc-600/30"
                      style={{ 
                        color: '#d4d4d8',
                        textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                      }}>
                    Popular Makes
                  </h3>
                  <ul className="relative space-y-2">
                    {popularMakes.map((make) => (
                      <li key={make}>
                        <Link 
                          href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`}
                          className="text-xs md:text-sm font-extrabold text-zinc-200 hover:text-white transition-colors"
                          style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          {make}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="relative p-4 md:p-5 rounded-xl bg-zinc-900/30 border border-zinc-600/20 overflow-hidden backdrop-blur-sm">
                  {/* Background Metallic SUV Image */}
                  <Image 
                    src="/images/footer/suv.png" 
                    alt="" 
                    width={120} 
                    height={80} 
                    className="absolute -right-4 -bottom-2 w-28 h-auto opacity-[0.08]"
                  />
                  <h3 className="relative text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-3 pb-2 border-b border-zinc-600/30"
                      style={{ 
                        color: '#d4d4d8',
                        textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                      }}>
                    Quick Links
                  </h3>
                  <ul className="relative space-y-2">
                    {[
                      { label: "Used Engines", href: "/used-engines" },
                      { label: "Transmissions", href: "/used-transmissions" },
                      { label: "All Inventory", href: "/inventory" },
                      { label: "All Parts", href: "/parts" },
                      { label: "All Makes", href: "/makes" },
                      { label: "Get Quote", href: "/quote" },
                      { label: "About Us", href: "/about" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} className="text-xs md:text-sm font-extrabold text-zinc-200 hover:text-white transition-colors"
                          style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policies */}
                <div className="relative p-4 md:p-5 rounded-xl bg-zinc-900/30 border border-zinc-600/20 overflow-hidden backdrop-blur-sm">
                  {/* Background Metallic Shield Image */}
                  <Image 
                    src="/images/footer/shield.png" 
                    alt="" 
                    width={100} 
                    height={120} 
                    className="absolute -right-4 -bottom-4 w-24 h-auto opacity-[0.06]"
                  />
                  <h3 className="relative text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-3 pb-2 border-b border-zinc-600/30"
                      style={{ 
                        color: '#d4d4d8',
                        textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.15), 0 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)'
                      }}>
                    Policies
                  </h3>
                  <ul className="relative space-y-2">
                    {[
                      { label: "Privacy Policy", href: "/privacy-policy" },
                      { label: "Terms", href: "/terms" },
                      { label: "Shipping", href: "/shipping-policy" },
                      { label: "Returns", href: "/return-policy" },
                      { label: "Cookies", href: "/cookie-policy" },
                      { label: "Disclaimer", href: "/disclaimer" },
                      { label: "Contact", href: "/contact" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} className="text-xs md:text-sm font-extrabold text-zinc-200 hover:text-white transition-colors"
                          style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-600/30 bg-zinc-900/40">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3">
              <p className="text-[10px] md:text-xs text-zinc-300 text-center sm:text-left font-extrabold" 
                 style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}>
                &copy; {new Date().getFullYear()} <span className="font-black text-white" style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.1)' }}>AUAPW.ORG</span> — All Used Auto Parts World.
              </p>
              <div className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-300 font-extrabold"
                   style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.8)' }}>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <span className="text-zinc-600">|</span>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                <span className="text-zinc-600">|</span>
                <Link href="/sitemap-page" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
