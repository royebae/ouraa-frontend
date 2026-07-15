"use client"

import { useState } from "react"
import { Check, Share2 } from "lucide-react"

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label="Copy link to this beat"
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
    </button>
  )
}
