import { Suspense } from "react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import SearchForm from "@/components/search-form"
import SearchResults from "@/components/search-results"

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = typeof params.q === "string" ? params.q : ""

  // Parse filters from search params
  const filters = {
    genres: typeof params.genres === "string" ? params.genres.split(",") : undefined,
    yearRange:
      typeof params.yearRange === "string" ? (params.yearRange.split("-").map(Number) as [number, number]) : undefined,
    ratingRange:
      typeof params.ratingRange === "string"
        ? (params.ratingRange.split("-").map(Number) as [number, number])
        : undefined,
    quality: typeof params.quality === "string" ? params.quality.split(",") : undefined,
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">Search Movies</h1>
            <SearchForm initialQuery={query} />
          </div>

          {query && (
            <Suspense
              fallback={
                <div className="text-center py-8">
                  <div className="text-white">Searching...</div>
                </div>
              }
            >
              <SearchResults query={query} filters={filters} />
            </Suspense>
          )}

          {!query && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-white mb-4">Search for Movies</h2>
              <p className="text-gray-400">Enter a movie title, genre, or actor name to get started</p>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
