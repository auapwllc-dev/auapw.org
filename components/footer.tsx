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
    "Fuel Pumps",
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
          <div className="mx-auto max-w-7xl px-6 py-6 lg:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "30-180 Day Warranty", sublabel: "On All Parts" },
                { icon: Truck, label: "Free Shipping", sublabel: "Orders $200+" },
                { icon: Clock, label: "Same Day Shipping", sublabel: "Order by 2PM" },
                { icon: Phone, label: "Expert Support", sublabel: "Mon-Fri 9-6 EST" },
              ].map(({ icon: Icon, label, sublabel }) => (
                <div key={label} className="flex items-center gap-3 p-3 lg:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/30">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-zinc-700/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-zinc-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs lg:text-sm font-bold text-white truncate">{label}</div>
                    <div className="text-[10px] lg:text-xs text-zinc-400 truncate">{sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Logos Strip */}
        <div className="border-b border-zinc-700/30 bg-zinc-950/50 py-4 lg:py-5">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs lg:text-sm font-bold tracking-widest uppercase text-zinc-400">Popular Brands</span>
              <div className="flex-1 h-px bg-zinc-700/50" />
              <Link href="/makes" className="text-xs lg:text-sm font-bold text-zinc-300 hover:text-white flex items-center gap-1">
                View All <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {CAR_MAKES.slice(0, 14).map((brand) => (
                <Link
                  key={brand}
                  href={`/makes/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/30 hover:border-zinc-600/50 transition-all group"
                  title={`${brand} Parts`}
                >
                  <BrandLogo brand={brand} />
                  <span className="text-xs lg:text-sm font-bold text-zinc-400 group-hover:text-white hidden sm:block">
                    {brand}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 bg-zinc-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Brand & Contact Column */}
            <div className="lg:col-span-4">
              {/* Logo & Brand */}
              <div className="flex items-center gap-4 mb-6">
                <Logo size="md" variant="ring" />
                <BrandWordmark size="footer" />
              </div>
              
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed mb-6">
                Premium quality used auto parts from 2,000+ verified salvage yards nationwide. 
                Every part backed by our 30-180 day warranty.
              </p>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <CallNowButton />
                <EmailUsButton />
                <LocationButton />
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                
                {/* Popular Parts */}
                <div className="relative p-5 lg:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-700/30 overflow-hidden">
                  {/* Background Icon */}
                  <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-zinc-700/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
                  </svg>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-4 pb-2 border-b border-zinc-700">
                    Popular Parts
                  </h3>
                  <ul className="relative space-y-2">
                    {popularParts.map((part) => (
                      <li key={part}>
                        <Link 
                          href={`/search?part=${encodeURIComponent(part)}`}
                          className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          {part}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Makes */}
                <div className="relative p-5 lg:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-700/30 overflow-hidden">
                  {/* Background Icon */}
                  <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-zinc-700/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-4 pb-2 border-b border-zinc-700">
                    Popular Makes
                  </h3>
                  <ul className="relative space-y-2">
                    {popularMakes.map((make) => (
                      <li key={make}>
                        <Link 
                          href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`}
                          className="text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          {make}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="relative p-5 lg:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-700/30 overflow-hidden">
                  {/* Background Icon */}
                  <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-zinc-700/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-4 pb-2 border-b border-zinc-700">
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
                      { label: "Contact", href: "/contact" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policies */}
                <div className="relative p-5 lg:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-700/30 overflow-hidden">
                  {/* Background Icon */}
                  <svg className="absolute -right-4 -bottom-4 w-24 h-24 text-zinc-700/20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-4 pb-2 border-b border-zinc-700">
                    Policies
                  </h3>
                  <ul className="relative space-y-2">
                    {[
                      { label: "Privacy Policy", href: "/privacy-policy" },
                      { label: "Terms of Service", href: "/terms" },
                      { label: "Shipping Policy", href: "/shipping-policy" },
                      { label: "Return Policy", href: "/return-policy" },
                      { label: "Cookie Policy", href: "/cookie-policy" },
                      { label: "Disclaimer", href: "/disclaimer" },
                      { label: "Acceptable Use", href: "/acceptable-use" },
                      { label: "Contact Us", href: "/contact" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors">
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
        <div className="border-t border-zinc-700/50 bg-zinc-900/80">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm lg:text-base text-zinc-400 text-center sm:text-left">
                &copy; {new Date().getFullYear()} <span className="font-bold text-white">AUAPW.ORG</span> — All Used Auto Parts World. All Rights Reserved.
              </p>
              <div className="flex items-center gap-4 text-xs lg:text-sm text-zinc-500">
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                <span className="text-zinc-700">|</span>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                <span className="text-zinc-700">|</span>
                <Link href="/sitemap-page" className="hover:text-white transition-colors">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
