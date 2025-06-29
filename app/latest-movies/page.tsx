"use client"
import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import { getAllMovies } from "@/lib/movies-data"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Grid, List } from "lucide-react"

export default function LatestMoviesPage() {
  const allMovies = getAllMovies()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "rating" | "title">("newest")

  // Sort movies based on selected criteria
  const sortedMovies = [...allMovies].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.year - a.year || b.id.localeCompare(a.id)
      case "rating":
        return b.rating - a.rating
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Get latest movies (2024-2025)
  const latestMovies = sortedMovies.filter((movie) => movie.year >= 2024)
  const newAdditions = sortedMovies.filter((movie) => movie.isNew)

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Movies & Shows</h1>
            <p className="text-gray-400 text-lg">
              Discover the newest additions to our collection - {latestMovies.length} latest releases
            </p>
          </div>

          {/* Filter and View Controls */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
                >
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="border-gray-700"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="border-gray-700"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* New Additions Section */}
          {newAdditions.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="text-2xl font-bold text-white">🆕 New Additions</h2>
                <Badge className="bg-red-600 text-white">{newAdditions.length} new</Badge>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                    : "space-y-4"
                }
              >
                {newAdditions.slice(0, 12).map((movie) =>
                  viewMode === "grid" ? (
                    <MovieCard key={movie.id} movie={movie} />
                  ) : (
                    <div key={movie.id} className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <Link href={`/movie/${movie.slug}`}>
                          <h3 className="text-white font-semibold hover:text-red-400">{movie.title}</h3>
                        </Link>
                        <p className="text-gray-400 text-sm">
                          {movie.year} • {movie.genre.join(", ")}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                            {movie.quality}
                          </Badge>
                          <span className="text-yellow-400 text-sm">★ {movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* All Latest Movies Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Calendar className="mr-2 h-6 w-6" />
              All Latest Movies & Shows ({latestMovies.length})
            </h2>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                  : "space-y-4"
              }
            >
              {latestMovies.map((movie) =>
                viewMode === "grid" ? (
                  <MovieCard key={movie.id} movie={movie} />
                ) : (
                  <div key={movie.id} className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link href={`/movie/${movie.slug}`}>
                        <h3 className="text-white font-semibold hover:text-red-400">{movie.title}</h3>
                      </Link>
                      <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {movie.year} • {movie.genre.join(", ")}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                          {movie.quality}
                        </Badge>
                        <span className="text-yellow-400 text-sm">★ {movie.rating}</span>
                        {movie.isNew && <Badge className="bg-green-600 text-white text-xs">NEW</Badge>}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-xl font-bold text-white">Explore More</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/all-movies">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Browse All Movies A-Z
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Browse by Category
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Search Movies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
