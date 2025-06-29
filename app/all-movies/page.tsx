"use client"
import Link from "next/link"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import { getAllMovies } from "@/lib/movies-data"
import MovieCard from "@/components/movie-card"
import { Button } from "@/components/ui/button"

export default function AllMoviesPage() {
  const allMovies = getAllMovies()

  // Group movies by first letter
  const groupedMovies = allMovies.reduce(
    (acc, movie) => {
      const firstLetter = movie.title.charAt(0).toUpperCase()
      const key = /[A-Z]/.test(firstLetter) ? firstLetter : "#"

      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(movie)
      return acc
    },
    {} as Record<string, typeof allMovies>,
  )

  // Sort letters
  const sortedLetters = Object.keys(groupedMovies).sort((a, b) => {
    if (a === "#") return 1
    if (b === "#") return -1
    return a.localeCompare(b)
  })

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">All Movies A-Z</h1>
            <p className="text-gray-400 text-lg">Browse our complete collection of {allMovies.length} movies</p>
          </div>

          {/* Alphabet Navigation */}
          <div className="mb-8 sticky top-16 bg-black/95 backdrop-blur-xl py-4 z-40">
            <div className="flex flex-wrap gap-2">
              {sortedLetters.map((letter) => (
                <Button
                  key={letter}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
                  asChild
                >
                  <Link href={`#section-${letter}`}>{letter}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Movies by Letter */}
          <div className="space-y-12 pb-20 md:pb-8">
            {sortedLetters.map((letter) => (
              <section key={letter} id={`section-${letter}`} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-4xl font-bold text-white">{letter}</h2>
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="text-gray-400 text-sm">
                    {groupedMovies[letter].length} movie{groupedMovies[letter].length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {groupedMovies[letter]
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
              </section>
            ))}
          </div>

          {/* Back to Top */}
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
