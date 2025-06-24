import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HTML Fundamentals Course",
  description: "Master the building blocks of the web with hands-on lessons and interactive exercises",
  keywords: ["HTML", "web development", "course", "learning", "fundamentals"],
  authors: [{ name: "Course Platform" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="root" className="min-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  )
}
