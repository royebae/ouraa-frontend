import Image from "next/image"
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

const markSizes = {
  sm: 22,
  md: 28,
  lg: 40,
}

export function OurraWordmark({
  href = "/",
  size = "md",
  className,
}: OurraWordmarkProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-center font-extrabold tracking-tight",
        textSizes[size],
        className,
      )}
    >
      <Image
        src="/ouraa-mark.webp"
        alt="OURAA"
        width={markSizes[size]}
        height={markSizes[size]}
        className="rounded-full shrink-0"
      />
    </span>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
