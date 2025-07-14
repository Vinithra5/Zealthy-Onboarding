"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Onboarding" },
    { href: "/admin", label: "Admin" },
    { href: "/data", label: "Data" },
  ]

  return (
    <nav className="fixed top-2 left-0 right-0 z-50 bg-white border-b border-sage-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center pl-4">
            <img
              src="/zealthy-logo.png"
              alt="Zealthy Healthcare Logo"
              className="hidden md:block h-12 w-auto object-contain mr-6 pt-[2px]"
              style={{ height: "70px", objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = "/zealthy-icon.png"
                e.currentTarget.className = "hidden md:block h-12 w-auto object-contain mr-6 pt-[2px]"
              }}
            />

            <img
              src="/zealthy-icon.png"
              alt="Zealthy Icon"
              className="block md:hidden h-11 w-auto object-contain pt-[2px]"
              style={{ height: "44px", objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </Link>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  pathname === item.href ? "text-sage-600" : "text-gray-700 hover:text-sage-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
