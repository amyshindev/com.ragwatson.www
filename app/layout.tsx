import type { Metadata } from "next"
import { Inter, Noto_Sans_KR, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
})
export const metadata: Metadata = {
  title: "Maestro - AI Music Visual Generator",
  description:
    "AI-powered looping visuals for Spotify Canvas, TikTok Reels, and YouTube Shorts",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${outfit.variable} ${inter.variable} ${notoSansKr.variable}`}
    >
      <body
        className={`${notoSansKr.className} antialiased bg-[#0a0a0a] text-zinc-300`}
      >
        <SiteHeader />
        <div className="pt-20">{children}</div>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
