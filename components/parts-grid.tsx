"use client"

import Link from "next/link"
import { AUTO_PARTS_INVENTORY } from "@/lib/data"
import { MetallicPartButton, MetallicGetQuoteButton } from "@/components/ui/metallic-part-button"

interface PartsGridProps {
  brand?: string
  model?: string
  category?: string
  limit?: number
  showGetQuote?: boolean
}

export function PartsGrid({ 
  brand, 
  model, 
  category, 
  limit,
  showGetQuote = true 
}: PartsGridProps) {
  // Filter parts by category if provided
  const parts = category 
    ? AUTO_PARTS_INVENTORY.filter(p => p.category === category)
    : AUTO_PARTS_INVENTORY

  const displayParts = limit ? parts.slice(0, limit) : parts

  // Build the href based on brand/model context
  const getPartHref = (partSlug: string) => {
    if (brand && model) {
      return `/makes/${brand.toLowerCase().replace(/\s+/g, '-')}/${model.toLowerCase().replace(/\s+/g, '-')}/${partSlug}`
    }
    if (brand) {
      return `/makes/${brand.toLowerCase().replace(/\s+/g, '-')}?part=${partSlug}`
    }
    return `/quote?part=${encodeURIComponent(partSlug)}`
  }

  return (
    <div className="space-y-6">
      {/* Parts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {displayParts.map((part) => (
          <MetallicPartButton
            key={part.slug}
            partName={part.name}
            status={part.status}
            href={getPartHref(part.slug)}
            size="sm"
          />
        ))}
      </div>

      {/* Get Quote Button */}
      {showGetQuote && (
        <div className="flex justify-center pt-4">
          <MetallicGetQuoteButton size="lg" />
        </div>
      )}
    </div>
  )
}

// Compact version for sidebars/cards
export function PartsGridCompact({ 
  brand,
  category,
  limit = 12 
}: { 
  brand?: string
  category?: string
  limit?: number 
}) {
  const parts = category 
    ? AUTO_PARTS_INVENTORY.filter(p => p.category === category).slice(0, limit)
    : AUTO_PARTS_INVENTORY.slice(0, limit)

  return (
    <div className="flex flex-wrap gap-2">
      {parts.map((part) => (
        <MetallicPartButton
          key={part.slug}
          partName={part.name}
          status={part.status}
          href={brand ? `/makes/${brand.toLowerCase().replace(/\s+/g, '-')}?part=${part.slug}` : `/quote?part=${part.slug}`}
          size="sm"
        />
      ))}
    </div>
  )
}

// Hero version with featured parts
export function FeaturedPartsRow() {
  const featuredParts = [
    { name: "Engine", slug: "engine", status: "In Stock" },
    { name: "Transmission", slug: "transmission", status: "In Stock" },
    { name: "Transfer Case", slug: "transfer-case", status: "In Stock" },
    { name: "Turbo Charger", slug: "turbo-charger", status: "In Stock" },
    { name: "CV Pump", slug: "cv-pump", status: "In Stock" },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {featuredParts.map((part) => (
        <MetallicPartButton
          key={part.slug}
          partName={part.name}
          status={part.status}
          href={`/quote?part=${part.slug}`}
          size="md"
        />
      ))}
      <MetallicGetQuoteButton size="md" />
    </div>
  )
}
