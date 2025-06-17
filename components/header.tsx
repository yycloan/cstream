"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Search, ArrowLeft, Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showBackButton = pathname !== "/"

  const getPageTitle = () => {
    if (pathname === "/") return ""
    if (pathname === "/movies") return "Movies"
    if (pathname === "/categories") return "Categories"
    if (pathname === "/all-movies") return "All Movies A-Z"
    if (pathname === "/search") return "Search"
    if (pathname === "/downloads") return "Downloads"
    if (pathname === "/downloads-center") return "Downloads Center"
    if (pathname === "/admin") return "Admin Dashboard"
    if (pathname.startsWith("/movie/")) return "Movie Details"
    if (pathname.startsWith("/category/")) return "Category"
    if (pathname.startsWith("/alphabet/")) return "Browse A-Z"
    return ""
  }

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-gray-800"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-white hover:text-gray-300 md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : null}

            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl md:text-2xl lg:text-3xl font-black text-red-600">CINESTREAM</div>
            </Link>

            {showBackButton && getPageTitle() && (
              <h1 className="text-lg font-semibold text-white md:hidden">{getPageTitle()}</h1>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {showBackButton && (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-white hover:text-gray-300 flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            )}
            <Link
              href="/"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/" ? "text-red-400" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/movies" ? "text-red-400" : ""}`}
            >
              Movies
            </Link>
            <Link
              href="/downloads-center"
              className={`text-white hover:text-gray-300 font-medium transition-colors flex items-center space-x-1 ${pathname === "/downloads-center" ? "text-red-400" : ""}`}
            >
              <Download className="h-4 w-4" />
              <span>Downloads</span>
            </Link>
            <Link
              href="/categories"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/categories" ? "text-red-400" : ""}`}
            >
              Categories
            </Link>
            <Link
              href="/all-movies"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/all-movies" ? "text-red-400" : ""}`}
            >
              All Movies A-Z
            </Link>
            <Link
              href="/search"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/search" ? "text-red-400" : ""}`}
            >
              Search
            </Link>
            <Link
              href="/latest-movies"
              className={`text-white hover:text-gray-300 font-medium transition-colors ${pathname === "/latest-movies" ? "text-red-400" : ""}`}
            >
              Latest Movies
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden md:block">
              {showSearch ? (
                <Input
                  placeholder="Search..."
                  className="w-64 bg-black/50 border-gray-600 text-white placeholder-gray-400"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-gray-300"
                  onClick={() => setShowSearch(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 md:hidden" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-xl">
            <nav className="py-4 space-y-2">
              <Link
                href="/"
                className={`block px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className={`block px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/movies" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Movies
              </Link>
              <Link
                href="/downloads-center"
                className={`flex items-center px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/downloads-center" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                <Download className="h-4 w-4 mr-2" />
                Downloads Center
              </Link>
              <Link
                href="/categories"
                className={`block px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/categories" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Categories
              </Link>
              <Link
                href="/all-movies"
                className={`block px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/all-movies" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                All Movies A-Z
              </Link>
              <Link
                href="/latest-movies"
                className={`block px-4 py-2 text-white hover:bg-gray-800 transition-colors ${pathname === "/latest-movies" ? "bg-red-600" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                Latest Movies
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
