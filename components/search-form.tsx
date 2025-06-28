"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { getAllMovies } from "@/lib/movies-data"

interface SearchFormProps {
  initialQuery?: string
}

interface SearchFilters {
  genres: string[]
  yearRange: [number, number]
  ratingRange: [number, number]
  quality: string[]
}

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
]
const qualities = ["4K", "HD", "CAM"]
const currentYear = new Date().getFullYear()

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    genres: [],
    yearRange: [1990, currentYear],
    ratingRange: [0, 10],
    quality: [],
  })

  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentSearches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    }
  }, [])

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      const allMovies = getAllMovies()
      const movieTitles = allMovies.map((movie) => movie.title)
      const movieGenres = [...new Set(allMovies.flatMap((movie) => movie.genre))]
      const movieCast = [...new Set(allMovies.flatMap((movie) => movie.cast || []))]

      const allSuggestions = [...movieTitles, ...movieGenres, ...movieCast]
      const filtered = allSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 8)

      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim() || typeof window === "undefined") return

    const updated = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 10)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      saveRecentSearch(query.trim())
      const searchParams = new URLSearchParams()
      searchParams.set("q", query.trim())

      // Add filters to search params
      if (filters.genres.length > 0) {
        searchParams.set("genres", filters.genres.join(","))
      }
      if (filters.yearRange[0] !== 1990 || filters.yearRange[1] !== currentYear) {
        searchParams.set("yearRange", `${filters.yearRange[0]}-${filters.yearRange[1]}`)
      }
      if (filters.ratingRange[0] !== 0 || filters.ratingRange[1] !== 10) {
        searchParams.set("ratingRange", `${filters.ratingRange[0]}-${filters.ratingRange[1]}`)
      }
      if (filters.quality.length > 0) {
        searchParams.set("quality", filters.quality.join(","))
      }

      router.push(`/search?${searchParams.toString()}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    saveRecentSearch(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("recentSearches")
    }
  }

  const toggleGenre = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre) ? prev.genres.filter((g) => g !== genre) : [...prev.genres, genre],
    }))
  }

  const toggleQuality = (quality: string) => {
    setFilters((prev) => ({
      ...prev,
      quality: prev.quality.includes(quality) ? prev.quality.filter((q) => q !== quality) : [...prev.quality, quality],
    }))
  }

  const clearFilters = () => {
    setFilters({
      genres: [],
      yearRange: [1990, currentYear],
      ratingRange: [0, 10],
      quality: [],
    })
  }

  const hasActiveFilters =
    filters.genres.length > 0 ||
    filters.yearRange[0] !== 1990 ||
    filters.yearRange[1] !== currentYear ||
    filters.ratingRange[0] !== 0 ||
    filters.ratingRange[1] !== 10 ||
    filters.quality.length > 0

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search movies, genres, actors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.length > 1) setShowSuggestions(true)
            }}
            className="pl-10 pr-32 py-3 text-lg bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 focus:ring-red-600"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`border-gray-600 ${hasActiveFilters ? "bg-red-600 border-red-600" : ""}`}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-4">
              Search
            </Button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
          <Card className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border-gray-700 z-50">
            <CardContent className="p-0">
              {suggestions.length > 0 && (
                <div className="p-3 border-b border-gray-700">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Search className="h-4 w-4 mr-2" />
                    Suggestions
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {recentSearches.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Recent Searches
                    </div>
                    <button onClick={clearRecentSearches} className="text-red-400 hover:text-red-300">
                      Clear
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </form>

      {/* Advanced Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleContent className="space-y-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-400 hover:text-red-300">
                    Clear All
                  </Button>
                )}
              </div>

              {/* Genres */}
              <div>
                <Label className="text-white font-medium mb-3 block">Genres</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={filters.genres.includes(genre) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.genres.includes(genre)
                          ? "bg-red-600 hover:bg-red-700"
                          : "border-gray-600 hover:bg-gray-800"
                      }`}
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div>
                <Label className="text-white font-medium mb-3 block">
                  Release Year: {filters.yearRange[0]} - {filters.yearRange[1]}
                </Label>
                <Slider
                  value={filters.yearRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, yearRange: value as [number, number] }))}
                  min={1990}
                  max={currentYear}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Rating Range */}
              <div>
                <Label className="text-white font-medium mb-3 block">
                  Rating: {filters.ratingRange[0]} - {filters.ratingRange[1]}
                </Label>
                <Slider
                  value={filters.ratingRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, ratingRange: value as [number, number] }))}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Quality */}
              <div>
                <Label className="text-white font-medium mb-3 block">Quality</Label>
                <div className="flex flex-wrap gap-2">
                  {qualities.map((quality) => (
                    <Badge
                      key={quality}
                      variant={filters.quality.includes(quality) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.quality.includes(quality)
                          ? "bg-red-600 hover:bg-red-700"
                          : "border-gray-600 hover:bg-gray-800"
                      }`}
                      onClick={() => toggleQuality(quality)}
                    >
                      {quality}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.genres.map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-red-600 text-white">
              {genre}
              <button className="ml-2 hover:text-gray-300" onClick={() => toggleGenre(genre)}>
                ×
              </button>
            </Badge>
          ))}
          {filters.quality.map((quality) => (
            <Badge key={quality} variant="secondary" className="bg-red-600 text-white">
              {quality}
              <button className="ml-2 hover:text-gray-300" onClick={() => toggleQuality(quality)}>
                ×
              </button>
            </Badge>
          ))}
          {(filters.yearRange[0] !== 1990 || filters.yearRange[1] !== currentYear) && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {filters.yearRange[0]}-{filters.yearRange[1]}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setFilters((prev) => ({ ...prev, yearRange: [1990, currentYear] }))}
              >
                ×
              </button>
            </Badge>
          )}
          {(filters.ratingRange[0] !== 0 || filters.ratingRange[1] !== 10) && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              Rating {filters.ratingRange[0]}-{filters.ratingRange[1]}
              <button
                className="ml-2 hover:text-gray-300"
                onClick={() => setFilters((prev) => ({ ...prev, ratingRange: [0, 10] }))}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
