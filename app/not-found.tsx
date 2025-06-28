"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-red-600">404</div>

        <h1 className="text-3xl font-bold text-white">Page Not Found</h1>

        <p className="text-gray-400 text-lg">Sorry, we couldn't find the movie or page you're looking for.</p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-red-600 hover:bg-red-700">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
            <Link href="/search">
              <Search className="h-4 w-4 mr-2" />
              Search Movies
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-500">If you think this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}
