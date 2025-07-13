import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealthy Healthcare Onboarding",
  description:
    "A custom healthcare onboarding platform with configurable multi-step form flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
  );
}
