import { searchMovies } from "@/lib/movies-data"
import MovieCard from "@/components/movie-card"

interface SearchResultsProps {
  query: string
  filters?: {
    genres?: string[]
    yearRange?: [number, number]
    ratingRange?: [number, number]
    quality?: string[]
  }
}

export default function SearchResults({ query, filters }: SearchResultsProps) {
  let results = searchMovies(query)

  // Apply filters
  if (filters) {
    if (filters.genres && filters.genres.length > 0) {
      results = results.filter((movie) => movie.genre.some((genre) => filters.genres!.includes(genre)))
    }

    if (filters.yearRange) {
      results = results.filter((movie) => movie.year >= filters.yearRange![0] && movie.year <= filters.yearRange![1])
    }

    if (filters.ratingRange) {
      results = results.filter(
        (movie) => movie.rating >= filters.ratingRange![0] && movie.rating <= filters.ratingRange![1],
      )
    }

    if (filters.quality && filters.quality.length > 0) {
      results = results.filter((movie) => filters.quality!.includes(movie.quality))
    }
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">Try adjusting your search terms or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Search Results for "{query}"</h2>
        <span className="text-gray-400">
          {results.length} movie{results.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
