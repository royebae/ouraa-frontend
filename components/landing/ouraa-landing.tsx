"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Play, Check, Info } from "lucide-react"

import { OurraWordmark } from "@/components/branding/ouraa-wordmark"
import { OsmoButton } from "@/components/ui/osmo-button"
import { Reveal } from "@/components/animations/reveal"

/* ─── Sample beats (will be replaced by API) ─────────────────────── */

const GENRES = ["All", "Hip Hop / Trap", "R&B / Chill", "Electronic"] as const

const FEATURED_BEATS = [
  {
    slug: "midnight-sky",
    title: "Midnight Sky",
    genre: "Hip Hop / Trap",
    bpm: 140,
    key: "Am",
    price: 29.99,
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzE5NDg0MzEwL21hbnRyYS10ZW1wbGF0ZS0yLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJmaWxsIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDB9LCJ0b0Zvcm1hdCI6IndlYnAifX0=",
    tint: "from-primary/50 via-black/40 to-black/80",
  },
  {
    slug: "ocean-drive",
    title: "Ocean Drive",
    genre: "R&B / Chill",
    bpm: 92,
    key: "Fm",
    price: 24.99,
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzIzMjcxMjQ3L21hbnRyYS15b3V0dWJlLXRodW1ibmFpbC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiZmlsbCIsIndpZHRoIjo2NDAsImhlaWdodCI6NjQwfSwidG9Gb3JtYXQiOiJ3ZWJwIn19",
    tint: "from-cyan-500/40 via-black/40 to-black/80",
  },
  {
    slug: "neon-nights",
    title: "Neon Nights",
    genre: "Electronic",
    bpm: 126,
    key: "G#m",
    price: 34.99,
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzE3ODE0NjY0L21hbnRyYXRlbXBsYXRlMi5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiZmlsbCIsIndpZHRoIjo2NDAsImhlaWdodCI6NjQwfSwidG9Gb3JtYXQiOiJ3ZWJwIn19",
    tint: "from-fuchsia-500/40 via-black/40 to-black/80",
  },
]

/* ─── FAQ ────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: "What license do I get?",
    a: "Every purchase includes a royalty-free license. Basic covers streaming and non-commercial use; Premium adds monetized platforms; Unlimited covers everything including film/TV and sync.",
  },
  {
    q: "How do I get the files after purchase?",
    a: "Immediately after payment you'll receive a download link with your selected format (MP3, WAV, or stems). Downloads never expire.",
  },
  {
    q: "Can I refund a beat?",
    a: "Due to the digital nature of downloads, all sales are final. If there's an issue with your files, reach out and we'll make it right.",
  },
  {
    q: "Do you offer custom beats?",
    a: "Yes. Send your reference tracks and we'll scope a custom production package for your project.",
  },
]

/* ─── BeatCard ───────────────────────────────────────────────────── */

function BeatCard({
  beat,
  index,
}: {
  beat: (typeof FEATURED_BEATS)[number]
  index: number
}) {
  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/beats/${beat.slug}`}
        className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-all duration-300"
      >
        <div className="relative aspect-square rounded-xl mb-4 overflow-hidden">
          <Image
            src={beat.cover}
            alt={`${beat.title} cover art`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${beat.tint} mix-blend-multiply`} />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-white translate-x-[1px]" fill="currentColor" />
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
          {beat.title}
        </h3>
        <p className="text-white/40 text-xs mb-3">{beat.genre}</p>

        <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
          <span>{beat.bpm} BPM</span>
          <span>Key: {beat.key}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">
            ${beat.price}
          </span>
          <span className="text-xs text-white/30 group-hover:text-primary transition-colors">
            Buy
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

/* ─── FAQ Item ───────────────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-5 text-left text-white/90 text-base font-medium"
        onClick={() => setOpen(!open)}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/50 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Landing ───────────────────────────────────────────────── */

export default function OurraLanding() {
  const [activeGenre, setActiveGenre] = useState<(typeof GENRES)[number]>("All")

  const visibleBeats = useMemo(
    () =>
      activeGenre === "All"
        ? FEATURED_BEATS
        : FEATURED_BEATS.filter((b) => b.genre === activeGenre),
    [activeGenre],
  )

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <OurraWordmark href="/" size="sm" />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link href="#beats" className="hover:text-white transition-colors">
            Browse Beats
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Licensing
          </Link>
          <Link
            href="mailto:hello@ouraa.xyz"
            className="hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
        <OsmoButton href="#beats" variant="outline" className="md:hidden">
          Beats
        </OsmoButton>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://framerusercontent.com/images/ypu5OBld5NugrZJspI6dyFOkUnI.jpg?width=3840&height=2160"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/35 to-black/90" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-10 pt-24 pb-20 text-center">
          <Reveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
              Radio-Ready Beats.{" "}
              <span className="text-white/40">Delivered Instantly.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Pick your beats, check out, and get your files and licenses by
              email within minutes.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center">
              <OsmoButton href="#beats" variant="white">
                Browse Beats
              </OsmoButton>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-2 text-xs text-white/60">
              <Info className="w-3.5 h-3.5" />
              Tip: looking for a specific beat? Filter by genre below.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Beats ── */}
      <section
        id="beats"
        className="py-20 px-6 md:px-10 max-w-6xl mx-auto"
      >
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Featured Beats
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Hand-picked tracks ready for your next project.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-10">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                  activeGenre === genre
                    ? "border-primary/50 bg-primary/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-white/20"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleBeats.map((beat, i) => (
            <BeatCard key={beat.slug} beat={beat} index={i} />
          ))}
        </div>
      </section>

      {/* ── License Tiers ── */}
      <section id="pricing" className="py-20 px-6 md:px-10 max-w-5xl mx-auto">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
            Simple Licensing
          </h2>
          <p className="text-white/40 text-sm text-center mb-12">
            Pick the right rights for your project.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Basic",
              price: "$29",
              desc: "For independent artists getting started.",
              features: [
                "MP3 + WAV download",
                "Royalty-free",
                "5,000 streams",
                "Non-commercial",
                "Tagged preview",
              ],
            },
            {
              name: "Premium",
              price: "$49",
              desc: "For serious releases and monetized content.",
              features: [
                "MP3 + WAV download",
                "Royalty-free",
                "Unlimited streams",
                "Music monetization",
                "Untagged files",
              ],
              popular: true,
            },
            {
              name: "Unlimited",
              price: "$99",
              desc: "For commercial projects with full ownership.",
              features: [
                "MP3 + WAV + Stems",
                "Royalty-free",
                "Unlimited streams",
                "TV / Film / Sync",
                "Untagged files",
              ],
            },
          ].map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-6 border ${
                  tier.popular
                    ? "border-primary/40 bg-primary/[0.04]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {tier.popular && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-white/40 text-xs mb-4">{tier.desc}</p>
                <p className="text-3xl font-bold mb-6">
                  {tier.price}
                  <span className="text-sm font-normal text-white/40">
                    /beat
                  </span>
                </p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-white/60 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <OsmoButton
                  href="#beats"
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  Browse Beats
                </OsmoButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-20 px-6 md:px-10 max-w-2xl mx-auto"
      >
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">
            Questions?
          </h2>
          <p className="text-white/40 text-sm text-center mb-12">
            Everything you need to know.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-6 md:px-10 text-center text-sm text-white/30">
        <p>© {new Date().getFullYear()} OURAA. All rights reserved.</p>
      </footer>
    </div>
  )
}
