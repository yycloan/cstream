import { movies, type Movie } from "./movies-data"

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  // Find movie by slug
  const movie = movies.find((movie) => movie.slug === slug)
  return movie || null
}

export async function getRelatedMovies(movieId: string, genres: string[]): Promise<Movie[]> {
  // Get related movies by genre, excluding the current movie
  const relatedMovies = movies.filter(
    (movie) => movie.id !== movieId && movie.genre.some((genre) => genres.includes(genre)),
  )

  // Return up to 6 related movies
  return relatedMovies.slice(0, 6)
}

export async function getAllMovies(): Promise<Movie[]> {
  return movies
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const lowercaseQuery = query.toLowerCase()
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowercaseQuery) ||
      movie.genre.some((genre) => genre.toLowerCase().includes(lowercaseQuery)) ||
      movie.cast?.some((actor) => actor.toLowerCase().includes(lowercaseQuery)) ||
      movie.director?.toLowerCase().includes(lowercaseQuery),
  )
}
