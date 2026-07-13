import Link from "next/link"
import { cn } from "@/lib/utils"

type OurraWordmarkProps = {
  href?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const textSizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
}

export function OurraWordmark({
  href = "/",
  size = "md",
  className,
}: OurraWordmarkProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-baseline gap-0.5 font-extrabold tracking-tight",
        textSizes[size],
        className,
      )}
    >
      <span className="text-white">OUR</span>
      <span className="text-primary">AA</span>
    </span>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
