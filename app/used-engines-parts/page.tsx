"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandLogosSection } from "@/components/brand-logos"

import { PART_CATEGORIES, CAR_MAKES, PHONE_DISPLAY, PHONE_SALES, AUTO_PARTS_INVENTORY } from "@/lib/data"
import Link from "next/link"
import { Search, Phone, MessageSquare, Shield, Truck, Clock, Package, Wrench } from "lucide-react"
import { MetallicPartButton, MetallicGetQuoteButton } from "@/components/ui/metallic-part-button"

const CATEGORY = PART_CATEGORIES.find(c => c.id === "engines")!

export default function UsedEnginesPartsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        {/* Header */}
        <div className="bg-gradient-to-br from-background via-card to-background border-b border-border/30">
          <div className="metal-line" />
          <div className="mx-auto max-w-[1280px] px-6 py-14">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/parts" className="hover:text-foreground transition-colors">Parts</Link>
              <span>/</span>
              <span className="text-foreground">Engines</span>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">Engine Parts</span>
            </div>
            <h1 className="font-serif text-[clamp(1.75rem,4vw,3.5rem)] font-bold text-foreground">Used Engine Parts</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-[520px]">
              Complete engines, long blocks, short blocks, cylinder heads, and all internal engine components from our network of 2,000+ verified salvage yards.
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Up to 6-Month Warranty", desc: "Every engine part covered with full return & replacement" },
              { icon: Truck, title: "Free Shipping USA", desc: "Ships to all 50 states, 1-3 business day processing" },
              { icon: Clock, title: "24-Hour Response", desc: "Get quotes within one business day" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="embossed-col rounded-lg p-5 flex items-start gap-3.5">
                <div className="metal-icon-wrap">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Engine Parts with Metallic Buttons */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">All Engine Parts</h2>
          <div className="flex flex-wrap gap-3">
            {AUTO_PARTS_INVENTORY.filter(p => p.category === "engines").map((part) => (
              <MetallicPartButton
                key={part.slug}
                partName={part.name}
                status={part.status}
                href={`/search?part=${encodeURIComponent(part.name)}`}
                size="md"
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <MetallicGetQuoteButton size="lg" />
          </div>
        </div>

        {/* Shop by Make */}
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Shop Engine Parts by Make</h2>
          <div className="flex flex-wrap gap-2">
            {CAR_MAKES.map((make) => (
              <Link
                key={make}
                href={`/search?make=${encodeURIComponent(make)}&category=engines`}
                className="text-xs px-3 py-2 rounded embossed-col text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                {make} Engines
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="text-center embossed-col rounded-lg p-8">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Need Help Finding an Engine Part?</h3>
            <p className="text-sm text-muted-foreground mb-6">Our experts can help you find the exact part for your vehicle.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <MetallicGetQuoteButton size="lg" />
            </div>
          </div>
        </div>

        <BrandLogosSection />
      </main>
      <Footer />
    </>
  )
}
