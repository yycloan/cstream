import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AdManager } from "@/components/ad-manager"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CineStream - Movie Streaming Platform",
  description: "Stream and download your favorite movies",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          src="//pl26876153.profitableratecpm.com/a7/66/b2/a766b2a718487caba94eabfc7e0a3369.js"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AdManager />
          <main className="min-h-screen bg-black">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
