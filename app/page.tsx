import { Suspense } from "react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import HeroBanner from "@/components/hero-banner"
import MovieRow from "@/components/movie-row"
import CategoryPills from "@/components/category-pills"
import AlphabetSlider from "@/components/alphabet-slider"
import {
  getFeaturedMovies,
  getTrendingMovies,
  getNewMovies,
  getMoviesByGenre,
  getAllMovies,
  getTopRatedMovies,
  getMostViewedMovies,
  getRecentlyAddedMovies,
  getBollywoodMovies,
  getKoreanMovies,
  getChineseMovies,
  getClassicMovies,
  getRandomMovies,
} from "@/lib/movies-data"
import type { Movie } from "@/types"

export default function HomePage() {
  // Get all movies first
  const allMovies = getAllMovies()

  // Create sets to track used movie IDs to prevent duplicates
  const usedMovieIds = new Set<string>()

  // Helper function to get unique movies for a section
  const getUniqueMovies = (movies: Movie[], count?: number) => {
    const uniqueMovies = movies.filter((movie) => !usedMovieIds.has(movie.id))
    const selectedMovies = count ? uniqueMovies.slice(0, count) : uniqueMovies
    selectedMovies.forEach((movie) => usedMovieIds.add(movie.id))
    return selectedMovies
  }

  // Get movies for different sections without duplicates
  const featuredMovies = getUniqueMovies(getFeaturedMovies())
  const trendingMovies = getUniqueMovies(getTrendingMovies())
  const newMovies = getUniqueMovies(getNewMovies())
  const actionMovies = getUniqueMovies(getMoviesByGenre("Action"), 12)
  const dramaMovies = getUniqueMovies(getMoviesByGenre("Drama"), 12)
  const comedyMovies = getUniqueMovies(getMoviesByGenre("Comedy"), 12)
  const horrorMovies = getUniqueMovies(getMoviesByGenre("Horror"), 12)
  const sciFiMovies = getUniqueMovies(getMoviesByGenre("Sci-Fi"), 12)
  const topRatedMovies = getUniqueMovies(getTopRatedMovies(), 12)
  const mostViewedMovies = getUniqueMovies(getMostViewedMovies(), 12)
  const recentlyAddedMovies = getUniqueMovies(getRecentlyAddedMovies(), 12)
  const bollywoodMovies = getUniqueMovies(getBollywoodMovies(), 12)
  const koreanMovies = getUniqueMovies(getKoreanMovies(), 12)
  const chineseMovies = getUniqueMovies(getChineseMovies(), 12)
  const classicMovies = getUniqueMovies(getClassicMovies(), 12)

  // Get remaining movies for random section
  const remainingMovies = allMovies.filter((movie) => !usedMovieIds.has(movie.id))
  const randomMovies = getRandomMovies(12)
    .filter((movie) => !usedMovieIds.has(movie.id))
    .slice(0, 12)

  // Ensure we have movies for hero banner - fallback to all movies if no featured
  const heroMovies = featuredMovies.length > 0 ? featuredMovies : allMovies.slice(0, 5)

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-16">
        {/* Hero Banner */}
        <Suspense
          fallback={
            <div className="h-[70vh] bg-gradient-to-br from-gray-900 to-black animate-pulse flex items-center justify-center">
              <div className="text-white text-xl">Loading...</div>
            </div>
          }
        >
          <HeroBanner movies={heroMovies} />
        </Suspense>

        {/* Navigation Sections */}
        <div className="px-4 md:px-6 lg:px-8 py-8 space-y-12">
          {/* Category Pills */}
          <Suspense fallback={<div className="h-24 bg-gray-900 animate-pulse rounded" />}>
            <CategoryPills />
          </Suspense>

          {/* Alphabet Slider */}
          <Suspense fallback={<div className="h-24 bg-gray-900 animate-pulse rounded" />}>
            <AlphabetSlider />
          </Suspense>
        </div>

        {/* Content Rows */}
        <div className="space-y-8 md:space-y-12 py-8 md:py-12 pb-20 md:pb-8">
          {trendingMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🔥 Trending Now" movies={trendingMovies} priority />
            </Suspense>
          )}

          {newMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🆕 New Releases" movies={newMovies} />
            </Suspense>
          )}

          {recentlyAddedMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="📅 Recently Added" movies={recentlyAddedMovies} />
            </Suspense>
          )}

          {topRatedMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="⭐ Top Rated" movies={topRatedMovies} />
            </Suspense>
          )}

          {mostViewedMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="👁️ Most Viewed" movies={mostViewedMovies} />
            </Suspense>
          )}

          {actionMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="⚡ Action Movies" movies={actionMovies} />
            </Suspense>
          )}

          {dramaMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🎭 Drama" movies={dramaMovies} />
            </Suspense>
          )}

          {comedyMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="😂 Comedy" movies={comedyMovies} />
            </Suspense>
          )}

          {horrorMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="👻 Horror" movies={horrorMovies} />
            </Suspense>
          )}

          {sciFiMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🚀 Sci-Fi" movies={sciFiMovies} />
            </Suspense>
          )}

          {bollywoodMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🇮🇳 Bollywood Movies" movies={bollywoodMovies} />
            </Suspense>
          )}

          {koreanMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🇰🇷 Korean Movies" movies={koreanMovies} />
            </Suspense>
          )}

          {chineseMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🇨🇳 Chinese Movies" movies={chineseMovies} />
            </Suspense>
          )}

          {classicMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🎬 Classic Movies" movies={classicMovies} />
            </Suspense>
          )}

          {randomMovies.length > 0 && (
            <Suspense fallback={<div className="h-48 bg-gray-900 animate-pulse mx-4 rounded" />}>
              <MovieRow title="🎲 You Might Like" movies={randomMovies} />
            </Suspense>
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
