"use client"

import { useState } from "react"
import { CAR_MAKES, CAR_MODELS, YEARS } from "@/lib/data"
import { Phone, AlertCircle, CheckCircle2, Loader2, Copy, Check } from "lucide-react"

const CONTACT_EMAIL = "aupworld@gmail.com"
const PHONE_DISPLAY = "(888) 818-5001"
const PHONE_SALES = "888-818-5001"

interface QuoteFormProps {
  defaultPart?: "Engine" | "Transmission" | ""
  compact?: boolean
}

export function QuoteForm({ defaultPart = "", compact = false }: QuoteFormProps) {
  const [part, setPart] = useState(defaultPart)
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [option, setOption] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const models = make ? CAR_MODELS[make] || [] : []

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!make) { setError("Please select a vehicle make."); return }
    if (!name.trim()) { setError("Please enter your name."); return }
    if (!phone.trim()) { setError("Please enter your phone number."); return }

    setLoading(true)

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ part, make, model, year, option, name, phone, email, state: "", zip, message }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Submission failed")
      }
      
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us directly.")
    } finally {
      setLoading(false)
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fieldClass =
    "w-full font-sans text-[13px] sm:text-sm px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg border border-border/50 bg-input text-foreground appearance-none outline-none transition-all focus:border-primary/55 focus:ring-1 focus:ring-primary/20"

  if (success) {
    return (
      <div className="glass-card rounded-lg p-8 text-center border border-green-500/20 bg-green-500/5">
        <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-5" />
        <h3 className="text-2xl font-bold text-foreground mb-3">Quote Request Submitted!</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-2">
          Thank you, <span className="font-semibold text-foreground">{name}</span>!
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Your quote request has been received. Our team will contact you at <span className="font-semibold text-foreground">{phone}</span> within 24 hours.
        </p>
        
        <div className="bg-card/50 border border-border/30 rounded-lg p-4 mb-5">
          <h4 className="text-sm font-bold text-foreground mb-3">Your Request Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-left text-sm">
            <div><span className="text-muted-foreground">Part:</span> <span className="font-medium text-foreground">{part || "Not specified"}</span></div>
            <div><span className="text-muted-foreground">Make:</span> <span className="font-medium text-foreground">{make}</span></div>
            <div><span className="text-muted-foreground">Model:</span> <span className="font-medium text-foreground">{model || "Not specified"}</span></div>
            <div><span className="text-muted-foreground">Year:</span> <span className="font-medium text-foreground">{year || "Not specified"}</span></div>
          </div>
        </div>

        <p className="text-muted-foreground text-xs mb-4">
          Need immediate assistance? Call us at{" "}
          <a href={`tel:${PHONE_SALES.replace(/-/g, "")}`} className="text-primary font-bold hover:underline">{PHONE_DISPLAY}</a>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${PHONE_SALES.replace(/-/g, "")}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:bg-primary/90 transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <button
            onClick={() => {
              setSuccess(false)
              setMake(""); setModel(""); setName(""); setPhone("")
              setEmail(""); setZip(""); setMessage(""); setPart(defaultPart)
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border text-foreground text-sm rounded-lg bg-muted/30 hover:bg-muted/60 transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="glass-card rounded-xl sm:rounded-2xl h-full flex flex-col"
      style={{ background: "rgba(7,9,15,0.45)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <div className={compact ? "p-3 sm:p-4" : "p-4 sm:p-6 lg:p-8 flex flex-col h-full"}>
        <h3 className="text-[11px] sm:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary mb-4 sm:mb-6 lg:mb-[65px] font-roboto">
          Fill Form to Get Quote
        </h3>

        {error && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-part" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Part
              </label>
              <select id="qf-part" className={fieldClass} value={part} onChange={(e) => setPart(e.target.value)}>
                <option value="">Select Part</option>
                <option value="Engine">Engine</option>
                <option value="Transmission">Transmission</option>
              </select>
            </div>
            <div>
              <label htmlFor="qf-make" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Make <span className="text-red-400">*</span>
              </label>
              <select id="qf-make" className={fieldClass} value={make} onChange={(e) => { setMake(e.target.value); setModel("") }} aria-required="true">
                <option value="">Select Make</option>
                {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-model" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Model
              </label>
              <select id="qf-model" className={fieldClass} value={model} onChange={(e) => setModel(e.target.value)} disabled={!make}>
                <option value="">{make ? "Select Model" : "Select Make First"}</option>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="qf-year" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Year
              </label>
              <select id="qf-year" className={fieldClass} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select Year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="qf-option" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Select Option
              </label>
              <select id="qf-option" className={fieldClass} value={option} onChange={(e) => setOption(e.target.value)}>
                <option value="">Select Option</option>
                <option value="2WD">2WD</option>
                <option value="4WD">4WD</option>
                <option value="AWD">AWD</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-name" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input id="qf-name" type="text" className={fieldClass} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="qf-phone" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Phone <span className="text-red-400">*</span>
              </label>
              <input id="qf-phone" type="tel" className={fieldClass} placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div>
              <label htmlFor="qf-email" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Email
              </label>
              <input id="qf-email" type="email" className={fieldClass} placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="qf-zip" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                ZIP Code
              </label>
              <input id="qf-zip" type="text" inputMode="numeric" className={fieldClass} placeholder="ZIP Code" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} autoComplete="postal-code" />
            </div>
          </div>

          {!compact && (
            <div className="mb-3 sm:mb-4">
              <label htmlFor="qf-msg" className="block text-[0.58rem] sm:text-[0.62rem] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-muted-foreground mb-1.5 sm:mb-2">
                Additional Details
              </label>
              <textarea
                id="qf-msg"
                className={`${fieldClass} min-h-[60px] sm:min-h-[80px]`}
                placeholder="Any additional details about the part you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}

          <div className="mt-auto pt-3 sm:pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-2 border-zinc-500 text-zinc-100 font-bold text-base hover:-translate-y-0.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  GET A QUOTE
                </>
              )}
            </button>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-2 sm:mt-3 leading-relaxed text-center">
              No spam, no obligation. We&apos;ll contact you within 24 hours.
            </p>
          </div>

          {/* Fallback contact info */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-[10px] text-muted-foreground text-center mb-2">Or contact us directly:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a 
                href={`tel:${PHONE_SALES.replace(/-/g, "")}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-foreground border border-border/50 rounded-lg hover:border-primary/50 hover:text-primary transition-all"
              >
                <Phone className="w-3 h-3" /> {PHONE_DISPLAY}
              </a>
              <button 
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-foreground border border-border/50 rounded-lg hover:border-primary/50 hover:text-primary transition-all"
              >
                {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : CONTACT_EMAIL}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
