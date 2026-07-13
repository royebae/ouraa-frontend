"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function OsmoButton({
  children,
  href,
  variant = "white",
  className = "",
}: {
  children: ReactNode
  href?: string
  variant?: "white" | "outline" | "primary"
  className?: string
}) {
  const styles: Record<string, string> = {
    white: "bg-white text-black",
    outline: "bg-transparent border border-white/20 text-white",
    primary: "bg-primary text-primary-foreground",
  }

  const inner = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full overflow-hidden font-medium tracking-tight px-5 py-2.5 text-sm transition-all duration-500 cursor-pointer",
        styles[variant],
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  )

  return href ? <Link href={href}>{inner}</Link> : inner
}
