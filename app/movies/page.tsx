import { Suspense } from "react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import MovieRow from "@/components/movie-row"
import FilterBar from "@/components/filter-bar"
import {
  getAllMovies,
  getTopRatedMovies,
  getMostViewedMovies,
  getNewMovies,
  getMoviesByGenre,
  get4KMovies,
  getHDMovies,
  getRecentMovies,
  getClassicMovies,
} from "@/lib/movies-data"

export default function MoviesPage() {
  const allMovies = getAllMovies()
  const topRated = getTopRatedMovies()
  const mostViewed = getMostViewedMovies()
  const newMovies = getNewMovies()
  const actionMovies = getMoviesByGenre("Action")
  const dramaMovies = getMoviesByGenre("Drama")
  const comedyMovies = getMoviesByGenre("Comedy")
  const movies4K = get4KMovies()
  const moviesHD = getHDMovies()
  const recentMovies = getRecentMovies()
  const classicMovies = getClassicMovies()

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Movies</h1>
            <p className="text-gray-400 text-lg">Discover amazing movies from our collection</p>
          </div>

          <Suspense fallback={<div className="h-12 bg-gray-900 animate-pulse rounded" />}>
            <FilterBar />
          </Suspense>

          <div className="space-y-8 md:space-y-12 mt-8 pb-20 md:pb-8">
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Top Rated Movies" movies={topRated} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Most Viewed" movies={mostViewed} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="New Releases" movies={newMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="4K Ultra HD" movies={movies4K} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="HD Quality" movies={moviesHD} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Action Movies" movies={actionMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Drama" movies={dramaMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Comedy" movies={comedyMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Recent Movies" movies={recentMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="Classic Movies" movies={classicMovies} />
            </Suspense>

            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse rounded" />}>
              <MovieRow title="All Movies" movies={allMovies} />
            </Suspense>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
