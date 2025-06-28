"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Download, User, Grid3X3 } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Download, label: "Downloads", href: "/downloads-center" },
  { icon: Grid3X3, label: "Categories", href: "/categories" },
  { icon: User, label: "Profile", href: "/profile" },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-gray-800 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/downloads-center" && pathname === "/downloads")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? "text-red-500 bg-red-500/10" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
