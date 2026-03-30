import Link from "next/link"
import { PART_CATEGORIES } from "@/lib/data"
import { CircleDot, Link2, Zap, Snowflake, Activity, Square, Settings } from "lucide-react"

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  engines: Settings,
  transmissions: CircleDot,
  drivetrain: Link2,
  electrical: Zap,
  cooling: Snowflake,
  suspension: Activity,
  body: Square,
}

export function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-primary">What We Source</span>
            </div>
            <h2 className="font-serif text-[clamp(1.75rem,4vw,3rem)] font-bold intelligent-premium-text text-3d-section text-balance">Parts Categories</h2>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {PART_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id]
            return (
              <Link
                key={cat.id}
                href={`/parts/${cat.id}`}
                className="group glass-card rounded-sm p-6 sm:p-7 lg:p-8 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              >
                {Icon ? (
                  <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                ) : null}
                <h3 className="text-base lg:text-lg font-bold tracking-wide text-foreground mb-2">{cat.label}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground mb-4">{cat.parts.length} parts available</p>
                <div className="border-t border-border/30 pt-3 flex flex-wrap gap-1.5">
                  {cat.parts.slice(0, 3).map((p) => (
                    <span key={p} className="px-2.5 py-1.5 bg-secondary/50 border border-border/40 text-xs text-muted-foreground rounded-sm">{p}</span>
                  ))}
                  <span className="px-2.5 py-1.5 bg-secondary/50 border border-border/40 text-xs text-muted-foreground rounded-sm">+{cat.parts.length - 3}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
