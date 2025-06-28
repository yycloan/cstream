import MovieCard from "@/components/movie-card"
import type { Movie } from "@/lib/movies-data"

interface RelatedMoviesProps {
  movies: Movie[]
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {
  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">More Like This</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
