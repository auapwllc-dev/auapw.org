"use client"

import Link from "next/link"
import Image from "next/image"
import { CAR_MAKES, PART_CATEGORIES, PHONE_DISPLAY, CONTACT_EMAIL, getBrandLogoUrl, BRAND_COLORS } from "@/lib/data"
import { ExternalLink } from "lucide-react"
import { BrandWordmark } from "@/components/brand-wordmark"
import { Logo } from "@/components/logo"
import { useState } from "react"

function BrandLogo({ brand }: { brand: string }) {
  const [failed, setFailed] = useState(false)
  const url = getBrandLogoUrl(brand)
  const color = BRAND_COLORS[brand] || "#333"
  const initials = brand.split(/[\s-]+/).map(w => w[0]).join("").slice(0, 2).toUpperCase()

  if (!url || failed) {
    return (
      <div 
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white/90"
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
      className="w-6 h-6 sm:w-8 sm:h-8 rounded-md object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export function Footer() {
  const popularPartLinks = PART_CATEGORIES.flatMap(c =>
    c.parts.slice(0, 2).map(p => ({ label: p, href: `/parts/${c.id}` }))
  ).slice(0, 10)
  const popularMakes = CAR_MAKES.slice(0, 8)

  return (
    <footer className="bg-card/95 backdrop-blur-xl border-t border-border/30 relative overflow-hidden automotive-pattern">
      {/* Top brand strip with logos */}
      <div className="border-b border-border/20 py-3 sm:py-4 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase text-3d-subtle">Popular Brands</span>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {CAR_MAKES.slice(0, 12).map((brand) => (
              <Link
                key={brand}
                href={`/makes/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, "-"))}`}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-background/50 hover:bg-background border border-border/30 hover:border-border/50 transition-all group"
                title={`${brand} Parts`}
              >
                <BrandLogo brand={brand} />
                <span className="text-[10px] sm:text-xs font-black tracking-wide text-3d-subtle hidden sm:inline">
                  {brand}
                </span>
              </Link>
            ))}
            <Link
              href="/makes"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-all text-primary text-[10px] sm:text-xs font-bold"
            >
              View All Brands
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-14 py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <Logo size="sm" variant="ring" />
              <BrandWordmark size="footer" />
            </div>
            <p className="text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground mb-8 sm:mb-10 font-semibold">
              Premium quality used auto parts from 2,000+ verified yards nationwide. 30-180 day warranty on every part.
            </p>
            <div className="space-y-3 sm:space-y-4">
              {/* Metallic Dark Button - Support Email */}
              <a 
                href="mailto:support@auapw.org" 
                className="group relative overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex"
                style={{
                  background: "linear-gradient(180deg, #d4d4d4 0%, #a1a1aa 15%, #71717a 85%, #52525b 100%)",
                  padding: "3px",
                }}
              >
                <div 
                  className="relative rounded-full px-4 py-3 flex items-center gap-2 w-full"
                  style={{
                    background: "linear-gradient(180deg, #3f3f46 0%, #27272a 30%, #18181b 70%, #0a0a0b 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  <svg className="w-4 h-4 text-zinc-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-bold text-white">support@auapw.org | Email Us</span>
                </div>
              </a>

              {/* Metallic Dark Button - Info Email */}
              <a 
                href="mailto:info@auapw.org" 
                className="group relative overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex"
                style={{
                  background: "linear-gradient(180deg, #d4d4d4 0%, #a1a1aa 15%, #71717a 85%, #52525b 100%)",
                  padding: "3px",
                }}
              >
                <div 
                  className="relative rounded-full px-4 py-3 flex items-center gap-2 w-full"
                  style={{
                    background: "linear-gradient(180deg, #3f3f46 0%, #27272a 30%, #18181b 70%, #0a0a0b 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  <svg className="w-4 h-4 text-zinc-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-bold text-white">info@auapw.org | Email Us</span>
                </div>
              </a>

              {/* Metallic Dark Button - Location */}
              <a 
                href="https://maps.google.com/?q=107+Myrtle+Ave+Woodbine+NJ+08270" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative overflow-hidden rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex"
                style={{
                  background: "linear-gradient(180deg, #d4d4d4 0%, #a1a1aa 15%, #71717a 85%, #52525b 100%)",
                  padding: "3px",
                }}
              >
                <div 
                  className="relative rounded-full px-4 py-3 flex items-center gap-2 w-full"
                  style={{
                    background: "linear-gradient(180deg, #3f3f46 0%, #27272a 30%, #18181b 70%, #0a0a0b 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
                  }}
                >
                  <svg className="w-4 h-4 text-zinc-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-bold text-white">Location</span>
                    <span className="text-xs text-zinc-400">107 Myrtle Ave, Woodbine, NJ 08270</span>
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Popular Parts */}
          <div className="embossed-col p-4 sm:p-5 relative overflow-hidden rounded-xl border border-border/30">
            {/* Gear Background Graphic */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute -right-8 -bottom-8 w-32 h-32 text-primary/5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/3" />
            </div>
            <h3 className="relative text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Popular Parts
            </h3>
            <ul className="relative space-y-3 sm:space-y-4" style={{ textTransform: 'uppercase' }}>
              {popularPartLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-2.5 font-black uppercase text-3d-subtle">
                    <span className="w-2 h-2 rounded-full bg-primary/70 hover:bg-primary transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Makes */}
          <div className="embossed-col p-4 sm:p-5 relative overflow-hidden rounded-xl border border-border/30">
            {/* Steering Wheel Background Graphic */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute -right-6 -bottom-6 w-28 h-28 text-primary/5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 1.01.26 1.95.7 2.79l2.83-1.63c-.03-.13-.03-.26-.03-.41 0-1.37 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .15 0 .28-.03.41l2.83 1.63c.44-.84.7-1.78.7-2.79 0-3.31-2.69-6-6-6z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/3" />
            </div>
            <h3 className="relative text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Popular Makes
            </h3>
            <ul className="relative space-y-3 sm:space-y-4">
              {popularMakes.map((make) => (
                <li key={make}>
                  <Link 
                    href={`/makes/${encodeURIComponent(make.toLowerCase().replace(/\s+/g, "-"))}`} 
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-2.5 font-black text-3d-subtle"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary/70 hover:bg-primary transition-colors flex-shrink-0" />
                    {make} Parts
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="embossed-col p-4 sm:p-5 relative overflow-hidden rounded-xl border border-border/30">
            {/* Speedometer Background Graphic */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute -right-6 -bottom-6 w-28 h-28 text-primary/5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm3.5-8c0 1.9-1.6 3.5-3.5 3.5S8.5 13.9 8.5 12 10.1 8.5 12 8.5s3.5 1.6 3.5 3.5zM12 6V4m0 16v-2m6-6h2M4 12H2m15.5-5.5 1.5-1.5m-13 0L4.5 6.5m13 11 1.5 1.5m-13 0-1.5 1.5"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/3" />
            </div>
            <h3 className="relative text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Quick Links
            </h3>
            <ul className="relative space-y-3 sm:space-y-4">
              {[
                { label: "Used Engines", href: "/used-engines" },
                { label: "Used Transmissions", href: "/used-transmissions" },
                { label: "Inventory", href: "/inventory" },
                { label: "All Parts", href: "/parts" },
                { label: "Car Brands", href: "/makes" },
                { label: "Blog", href: "/blog" },
                { label: "Get A Quote", href: "/quote" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-200 font-black text-3d-subtle">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="embossed-col p-4 sm:p-5 relative overflow-hidden rounded-xl border border-border/30">
            {/* Shield/Document Background Graphic */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="absolute -right-6 -bottom-6 w-28 h-28 text-primary/5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/3" />
            </div>
            <h3 className="relative text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Policies &amp; Legal
            </h3>
            <ul className="relative space-y-3 sm:space-y-4">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Return Policy", href: "/return-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Acceptable Use", href: "/acceptable-use" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-200 font-black text-3d-subtle">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <span className="text-sm sm:text-base text-muted-foreground font-black text-center sm:text-left text-3d-subtle">
            &copy; {new Date().getFullYear()} <strong className="font-black text-foreground text-3d-bold">AUAPW.ORG</strong> — All Rights Reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy-policy" },
              { label: "Shipping", href: "/shipping-policy" },
              { label: "Returns", href: "/return-policy" },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-all duration-200 font-black text-3d-subtle">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
