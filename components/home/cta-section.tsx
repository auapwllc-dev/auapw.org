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
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <Link href="/search" className="w-44 sm:w-52 inline-block hover:-translate-y-1 transition-transform duration-200">
            <img src="/images/button-find-your-part.jpg" alt="Search Parts Now" className="w-full h-auto drop-shadow-xl" />
          </Link>
          <a href="tel:8888185001" className="w-40 sm:w-44 inline-block hover:-translate-y-0.5 transition-transform">
            <img src="/images/button-call-now.png" alt="Call Now (888) 818-5001" className="w-full h-auto rounded-full shadow-lg shadow-black/50" />
          </a>
          <Link href="/quote" className="w-44 sm:w-52 inline-block hover:-translate-y-1 transition-transform duration-200">
            <img src="/images/button-request-free-quote.png" alt="Request Free Quote" className="w-full h-auto drop-shadow-xl" />
          </Link>
        </div>
      </div>
    </section>
  )
}
