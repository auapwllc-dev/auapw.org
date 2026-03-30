"use client"

import Link from "next/link"
import { Menu, X, Zap, ShoppingCart, Heart, Home, ChevronDown, Globe, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { BrandWordmark } from "@/components/brand-wordmark"
import { Logo } from "@/components/logo"
import { useTheme } from "@/components/theme-provider"
import { useCartStore } from "@/lib/stores/cart-store"
import { useWishlistStore } from "@/lib/stores/wishlist-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const cartItems = useCartStore((state) => state.getTotalItems())
  const wishlistCount = useWishlistStore((state) => state.getCount())
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Handle scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        // Always show header at top of page
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down & past threshold - hide header
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Theme mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Used Parts", href: "/parts" },
    { label: "Engines", href: "/used-engines" },
    { label: "Transmissions", href: "/used-transmissions" },
  ]

  const allPages = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Used Parts", href: "/parts" },
    { label: "Used Engines", href: "/used-engines" },
    { label: "Used Transmissions", href: "/used-transmissions" },
    { label: "All Makes", href: "/makes" },
    { label: "Inventory", href: "/inventory" },
    { label: "Search", href: "/search" },
    { label: "Get a Quote", href: "/quote" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Cart", href: "/cart" },
    { label: "Compare Parts", href: "/comparison" },
  ]

  const partsCategories = [
    { label: "Engine Parts", href: "/used-engines-parts" },
    { label: "Transmission Parts", href: "/used-transmissions-parts" },
    { label: "Drivetrain Parts", href: "/used-drivetrain-parts" },
    { label: "Electrical Parts", href: "/used-electrical-parts" },
    { label: "Cooling & Climate", href: "/used-cooling-parts" },
    { label: "Brakes & Safety", href: "/used-brakes-parts" },
    { label: "Suspension & Steering", href: "/used-suspension-parts" },
    { label: "Body & Interior", href: "/used-body-parts" },
    { label: "Exhaust System", href: "/used-exhaust-parts" },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Animated premium banner with scrolling text */}
      <div className="header-boss-banner">
        <div className="header-boss-banner-scroll">
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>2,000+ Verified Yards</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>Free Shipping All Parts</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>24/7 Customer Support</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>2,000+ Verified Yards</span>
          </div>
          <div className="header-boss-banner-item">
            <Zap className="w-3 h-3" />
            <span>Free Shipping All Parts</span>
          </div>
        </div>
      </div>

      {/* Premium glassmorphic header */}
      <div className="header-boss-container">
        <div className="header-boss-bg" />

        <div className="mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 flex items-center h-full justify-between gap-2 sm:gap-4 relative z-10">

          {/* Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 shrink-0 group header-boss-logo-group">
            <div className="header-boss-logo-ring">
              <Logo size="md" priority showGlow />
            </div>
            {/* Hide brand text on very small screens, show abbreviated on small, full on md+ */}
            <div className="hidden sm:flex flex-col justify-center pt-[2px]">
              <BrandWordmark size="nav" showSubline />
            </div>
            {/* Mobile: Just show small text */}
            <span className="sm:hidden text-xs font-bold text-foreground tracking-wide">AUAPW</span>
          </Link>

          {/* Center — embossed typography navigation (desktop only) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-boss-nav-text group relative"
              >
                <span className="header-boss-nav-label text-sm lg:text-base xl:text-lg font-semibold">{item.label}</span>
                <span className="header-boss-nav-glow" />
              </Link>
            ))}

            {/* Parts Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="header-boss-nav-text group relative flex items-center gap-1.5 outline-none">
                <span className="header-boss-nav-label text-sm lg:text-base xl:text-lg font-semibold">Parts</span>
                <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
                <span className="header-boss-nav-glow" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-xs lg:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                  Parts by Category
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {partsCategories.map((cat) => (
                  <DropdownMenuItem key={cat.href} asChild>
                    <Link
                      href={cat.href}
                      className="flex items-center gap-2 cursor-pointer text-sm lg:text-base py-2"
                    >
                      {cat.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/parts"
                    className="flex items-center gap-2 cursor-pointer text-sm lg:text-base font-semibold text-primary py-2"
                  >
                    View All Parts
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Review All Website Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="header-boss-nav-text group relative flex items-center gap-1.5 outline-none">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 opacity-70" />
                <span className="header-boss-nav-label text-sm lg:text-base xl:text-lg font-semibold">All Pages</span>
                <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
                <span className="header-boss-nav-glow" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64 bg-card/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel className="text-xs lg:text-sm font-bold tracking-widest uppercase text-muted-foreground">
                  Review All Website
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allPages.map((page) => (
                  <DropdownMenuItem key={page.href} asChild>
                    <Link
                      href={page.href}
                      className="flex items-center gap-2 cursor-pointer text-sm lg:text-base py-2"
                    >
                      {page.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right — CTA, phone, menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme toggle - Desktop (bigger) */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hidden sm:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700" />
                )}
              </button>
            )}

            {/* Cart indicator */}
            <Link href="/cart" className="relative hidden sm:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors" title="Cart">
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Wishlist indicator */}
            <Link href="/wishlist" className="relative hidden sm:flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors" title="Wishlist">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Desktop: Premium GET QUOTE button */}
            <Link 
              href="/quote" 
              className="hidden md:flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-2 border-zinc-500 text-zinc-100 font-bold text-sm lg:text-base hover:-translate-y-0.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)]"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Quote
            </Link>

            {/* Mobile: Phone and Email icons */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <a href="tel:8888185001" className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Bottom shimmer rule */}
        <div className="header-boss-rule" />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed left-0 right-0 top-[calc(28px+64px)] sm:top-[calc(36px+72px)] bg-card/98 backdrop-blur-xl border-b border-border/50 z-50 lg:hidden max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="px-4 py-5 flex flex-col gap-3">
              {/* Theme Toggle for Mobile */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/30">
                <span className="text-sm font-medium text-foreground">Theme</span>
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border hover:bg-secondary/50 transition-colors"
aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    {resolvedTheme === "dark" ? (
                      <Sun className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <Moon className="w-6 h-6 text-slate-700" />
                    )}
                  </button>
                )}
              </div>

              {/* Main Navigation */}
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 active:bg-secondary/70 transition-colors text-sm font-semibold border border-border/20"
                  >
                    {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-border/30 my-1" />

              {/* Parts Categories Section */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-bold tracking-wider uppercase text-primary">Parts by Category</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {partsCategories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-3 text-xs font-medium rounded-lg bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors text-center text-primary border border-primary/20"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-border/30 my-1" />

              {/* All Pages Section */}
              <div className="flex items-center gap-2 px-1">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold tracking-wider uppercase text-blue-400">All Pages</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {allPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2.5 text-xs font-medium rounded-lg bg-secondary/30 hover:bg-secondary/50 active:bg-secondary/70 transition-colors text-center border border-border/20"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-border/30 my-1" />

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/cart" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/30"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart {cartItems > 0 && `(${cartItems})`}
                </Link>
                <Link 
                  href="/wishlist" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-red-500/10 text-red-400 text-sm font-bold border border-red-500/30"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
              </div>

              {/* Contact + CTA */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <a 
                  href="tel:8888185001" 
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-b from-zinc-600 to-zinc-800 border border-zinc-500 text-white font-bold text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <Link 
                  href="/quote" 
                  onClick={() => setMobileOpen(false)} 
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
