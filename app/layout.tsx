import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zealthy Healthcare Onboarding",
  description: "Zealthy's onboarding platform for multi-step user registration in healthcare",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-cream-50">
          <Navbar />
          <main className="pt-20">{children}</main>
        </div>
      </body>
    </html>
  )
}
