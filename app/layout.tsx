import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "OURAA | Premium Beats For Your Sound",
  description:
    "Buy premium beats, royalty-free licenses, and stems. Instant delivery after checkout.",
  icons: {
    icon: "/ouraa-mark.webp",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans antialiased">
      <body className="bg-black text-foreground">{children}</body>
    </html>
  )
}
