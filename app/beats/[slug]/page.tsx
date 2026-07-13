import Link from "next/link"
import { OurraWordmark } from "@/components/branding/ouraa-wordmark"
import { OsmoButton } from "@/components/ui/osmo-button"
import { Headphones, ChevronLeft } from "lucide-react"

// Sample beat data (will come from API later)
const BEATS_DB: Record<string, {
  title: string
  genre: string
  bpm: number
  key: string
  price: number
  description: string
  tags: string[]
}> = {
  "midnight-sky": {
    title: "Midnight Sky",
    genre: "Hip Hop / Trap",
    bpm: 140,
    key: "Am",
    price: 29.99,
    description: "Dark atmospheric trap beat with rolling 808s and ethereal melodies. Perfect for hard-hitting verses and cinematic hooks.",
    tags: ["dark", "atmospheric", "trap", "808"],
  },
  "ocean-drive": {
    title: "Ocean Drive",
    genre: "R&B / Chill",
    bpm: 92,
    key: "Fm",
    price: 24.99,
    description: "Smooth R&B beat with warm pads and a laid-back groove. Ideal for love songs and late-night writing sessions.",
    tags: ["smooth", "rnb", "chill", "groove"],
  },
  "neon-nights": {
    title: "Neon Nights",
    genre: "Electronic",
    bpm: 126,
    key: "G#m",
    price: 34.99,
    description: "Pulsating electronic beat with synths and driving percussion. Built for the club and festival stages.",
    tags: ["electronic", "synth", "club", "driving"],
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
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <OurraWordmark href="/" size="sm" />
        <Link
          href="/"
          className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
      </nav>

      <main className="pt-24 pb-20 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Cover + Info */}
          <div>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center mb-6">
              <Headphones className="w-20 h-20 text-white/10" />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {beat.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Details + Buy */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {beat.title}
            </h1>
            <p className="text-white/40 text-base mb-4">{beat.genre}</p>

            <div className="flex items-center gap-4 text-sm text-white/30 mb-6">
              <span>{beat.bpm} BPM</span>
              <span>Key: {beat.key}</span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {beat.description}
            </p>

            {/* License options */}
            <div className="space-y-3 mb-8">
              {[
                { tier: "Basic", price: 29.99, desc: "MP3 + WAV, non-commercial" },
                { tier: "Premium", price: 49.99, desc: "Untagged, monetization" },
                { tier: "Unlimited", price: 99.99, desc: "Full ownership + stems" },
              ].map((opt) => (
                <div
                  key={opt.tier}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-sm">{opt.tier}</h3>
                    <p className="text-xs text-white/40">{opt.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">${opt.price}</span>
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

            <p className="text-xs text-white/30 leading-relaxed">
              By purchasing you agree to the license terms. All beats are
              royalty-free upon purchase.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
