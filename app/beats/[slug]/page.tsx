import Link from "next/link"
import Image from "next/image"
import { OurraWordmark } from "@/components/branding/ouraa-wordmark"
import { OsmoButton } from "@/components/ui/osmo-button"
import { ShareLinkButton } from "@/components/beats/share-link-button"
import { MeshBackground } from "@/components/beats/mesh-background"
import { ChevronLeft, Play, Check } from "lucide-react"

// Sample beat data (will come from API later)
const BEATS_DB: Record<string, {
  title: string
  genre: string
  bpm: number
  key: string
  price: number
  description: string
  tags: string[]
  cover: string
  tint: string
  glow: string
}> = {
  "midnight-sky": {
    title: "Midnight Sky",
    genre: "Hip Hop / Trap",
    bpm: 140,
    key: "Am",
    price: 29.99,
    description: "Dark atmospheric trap beat with rolling 808s and ethereal melodies. Perfect for hard-hitting verses and cinematic hooks.",
    tags: ["dark", "atmospheric", "trap", "808"],
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzE5NDg0MzEwL21hbnRyYS10ZW1wbGF0ZS0yLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJmaWxsIiwid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDB9LCJ0b0Zvcm1hdCI6IndlYnAifX0=",
    tint: "from-primary/50 via-black/40 to-black/80",
    glow: "bg-primary/30",
  },
  "ocean-drive": {
    title: "Ocean Drive",
    genre: "R&B / Chill",
    bpm: 92,
    key: "Fm",
    price: 24.99,
    description: "Smooth R&B beat with warm pads and a laid-back groove. Ideal for love songs and late-night writing sessions.",
    tags: ["smooth", "rnb", "chill", "groove"],
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzIzMjcxMjQ3L21hbnRyYS15b3V0dWJlLXRodW1ibmFpbC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiZmlsbCIsIndpZHRoIjo2NDAsImhlaWdodCI6NjQwfSwidG9Gb3JtYXQiOiJ3ZWJwIn19",
    tint: "from-cyan-500/40 via-black/40 to-black/80",
    glow: "bg-cyan-500/25",
  },
  "neon-nights": {
    title: "Neon Nights",
    genre: "Electronic",
    bpm: 126,
    key: "G#m",
    price: 34.99,
    description: "Pulsating electronic beat with synths and driving percussion. Built for the club and festival stages.",
    tags: ["electronic", "synth", "club", "driving"],
    cover:
      "https://cdn5.beatstars.com/eyJidWNrZXQiOiJwcm9kLWJ0cy10cmFjayIsImtleSI6InByb2QvdHJhY2svYXJ0d29yay9USzE3ODE0NjY0L21hbnRyYXRlbXBsYXRlMi5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiZmlsbCIsIndpZHRoIjo2NDAsImhlaWdodCI6NjQwfSwidG9Gb3JtYXQiOiJ3ZWJwIn19",
    tint: "from-fuchsia-500/40 via-black/40 to-black/80",
    glow: "bg-fuchsia-500/25",
  },
}

export function generateStaticParams() {
  return Object.keys(BEATS_DB).map((slug) => ({ slug }))
}

export default function BeatDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // We read and unwrap
  return <BeatDetailInner slugPromise={params} />
}

async function BeatDetailInner({
  slugPromise,
}: {
  slugPromise: Promise<{ slug: string }>
}) {
  const { slug } = await slugPromise
  const beat = BEATS_DB[slug]

  if (!beat) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Beat not found</h1>
          <Link href="/" className="text-primary hover:underline">
            ← Back to beats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-black text-foreground min-h-screen font-sans antialiased">
      <MeshBackground />
      {/* Toolbar */}
      <div className="relative z-10 max-w-[1120px] mx-auto flex items-center justify-between px-6 md:px-10 pt-6">
        <Link
          href="/"
          aria-label="Back to beats"
          className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <OurraWordmark href="/" size="sm" />
        <ShareLinkButton />
      </div>

      <main className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-10 pt-14 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: cover, sticky with ambient glow */}
          <div className="lg:sticky lg:top-24 self-start w-full">
            <div className="relative">
              <div
                className={`absolute -inset-10 rounded-full blur-3xl opacity-70 ${beat.glow}`}
                aria-hidden="true"
              />
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src={beat.cover}
                  alt={`${beat.title} cover art`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${beat.tint} mix-blend-multiply`} />
              </div>
            </div>
          </div>

          {/* Right: title, meta, description, license rows */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.96] mb-3 max-w-[14ch]">
                  {beat.title}
                </h1>
                <p className="font-mono text-xs text-white/40 tracking-wide mb-1">
                  {beat.bpm} BPM · Key: {beat.key}
                </p>
                <p className="text-white/40 text-sm">{beat.genre}</p>
              </div>
              <button
                type="button"
                aria-label="Play preview"
                className="w-[52px] h-[52px] shrink-0 rounded-full bg-white text-black flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:opacity-95 transition-all"
              >
                <Play className="w-4 h-4 translate-x-[1px]" fill="currentColor" />
              </button>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-[52ch]">
              {beat.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {beat.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* License options */}
            <div className="space-y-3 pt-2">
              {[
                { tier: "Basic", price: 29.99, desc: "MP3 + WAV, non-commercial" },
                { tier: "Premium", price: 49.99, desc: "Untagged, monetization" },
                { tier: "Unlimited", price: 99.99, desc: "Full ownership + stems" },
              ].map((opt) => (
                <div
                  key={opt.tier}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-sm">{opt.tier}</h3>
                    <p className="text-xs text-white/40">{opt.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-base font-bold tabular-nums">
                      ${opt.price}
                    </span>
                    <form
                      action={`${process.env.NEXT_PUBLIC_API_URL || "https://api.ouraa.xyz"}/api/checkout/session`}
                      method="POST"
                    >
                      <input type="hidden" name="beat_id" value={slug} />
                      <input type="hidden" name="license_tier" value={opt.tier.toLowerCase()} />
                      <OsmoButton variant="white">Buy</OsmoButton>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/30 leading-relaxed flex items-center gap-1.5">
              <Check className="w-3 h-3 shrink-0" />
              Royalty-free upon purchase. Files delivered by email within
              minutes.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
