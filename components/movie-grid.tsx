import MovieCard from "@/components/movie-card"
import type { Movie } from "@/lib/movies-data"

interface MovieGridProps {
  movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎬</div>
        <h2 className="text-2xl font-bold text-white mb-4">No Movies Found</h2>
        <p className="text-gray-400">Try adjusting your filters or browse other categories.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
