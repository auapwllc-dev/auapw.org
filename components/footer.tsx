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
          <div className="embossed-col p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Popular Parts
            </h3>
            <ul className="space-y-3 sm:space-y-4" style={{ textTransform: 'uppercase' }}>
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
          <div className="embossed-col p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Popular Makes
            </h3>
            <ul className="space-y-3 sm:space-y-4">
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
          <div className="embossed-col p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 sm:space-y-4">
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
          <div className="embossed-col p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-foreground text-3d-section mb-5 sm:mb-7 pb-3 sm:pb-4 border-b-2 border-primary/50 inline-block">
              Policies &amp; Legal
            </h3>
            <ul className="space-y-3 sm:space-y-4">
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
