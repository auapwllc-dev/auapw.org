import Link from "next/link"
import { Search, MessageSquare } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 text-center relative bg-gradient-to-br from-card via-secondary to-card">
      <div className="metal-line absolute top-0 left-0 right-0" />
      <div className="metal-line absolute bottom-0 left-0 right-0" />
      <div className="mx-auto max-w-[900px] px-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">Your Trusted Partner</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </div>

        <p className="text-sm font-bold tracking-[0.15em] text-muted-foreground uppercase mb-5">
          For All Vehicles &middot; Automotive Services & Solutions
        </p>
        <p className="text-muted-foreground text-sm max-w-[440px] mx-auto mb-10 leading-relaxed">
          Search our nationwide inventory network or speak directly with our team. Every request receives a response within 24 hours.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Link 
            href="/search" 
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 border-2 border-zinc-400 text-zinc-900 font-bold text-base hover:-translate-y-0.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.4)]"
          >
            <Search className="w-5 h-5" />
            Find Your Part
          </Link>
          <Link 
            href="/quote" 
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-2 border-zinc-500 text-zinc-100 font-bold text-base hover:-translate-y-0.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <MessageSquare className="w-5 h-5" />
            Get Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
