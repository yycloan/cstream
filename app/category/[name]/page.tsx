import { notFound } from "next/navigation"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import MovieGrid from "@/components/movie-grid"
import FilterBar from "@/components/filter-bar"
import { getMoviesByGenre } from "@/lib/movies-data"

interface CategoryPageProps {
  params: Promise<{ name: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const categoryMap: Record<string, string> = {
  action: "Action",
  comedy: "Comedy",
  drama: "Drama",
  horror: "Horror",
  romance: "Romance",
  "sci-fi": "Sci-Fi",
  thriller: "Thriller",
  animation: "Animation",
  adventure: "Adventure",
  crime: "Crime",
  fantasy: "Fantasy",
  mystery: "Mystery",
  "tv-shows": "TV Shows",
  documentary: "Documentary",
  family: "Family",
  music: "Music",
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { name } = await params
  const filters = await searchParams

  // Map URL slug to proper genre name
  const genreName = categoryMap[name.toLowerCase()]

  if (!genreName) {
    notFound()
  }

  // Get movies by genre, or handle special cases
  let movies
  if (name === "tv-shows") {
    // For now, return empty array for TV shows (coming soon)
    movies = []
  } else {
    movies = getMoviesByGenre(genreName)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white capitalize mb-2">
                {genreName} {name === "tv-shows" ? "" : "Movies"}
              </h1>
              <p className="text-gray-400">
                {movies.length > 0
                  ? `${movies.length} ${genreName.toLowerCase()} ${name === "tv-shows" ? "shows" : "movies"} available`
                  : name === "tv-shows"
                    ? "TV Shows coming soon!"
                    : `No ${genreName.toLowerCase()} movies found`}
              </p>
            </div>
          </div>

          <FilterBar />

          {movies.length > 0 ? (
            <div className="pb-20 md:pb-8">
              <MovieGrid movies={movies} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">{name === "tv-shows" ? "📺" : "🎬"}</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {name === "tv-shows" ? "TV Shows Coming Soon!" : `No ${genreName} Movies Found`}
              </h2>
              <p className="text-gray-400 mb-6">
                {name === "tv-shows"
                  ? "We're working on adding TV shows to our platform. Stay tuned!"
                  : `We don't have any ${genreName.toLowerCase()} movies in our collection yet.`}
              </p>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

// Generate static params for known categories
export async function generateStaticParams() {
  return Object.keys(categoryMap).map((name) => ({
    name,
  }))
}
