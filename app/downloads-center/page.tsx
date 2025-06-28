"use client"

import { useState } from "react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import QuickDownloadCard from "@/components/quick-download-card"
import FilterBar from "@/components/filter-bar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, TrendingUp, Star, Calendar } from "lucide-react"
import {
  getAllMovies,
  getNewMovies,
  getTopRatedMovies,
  getMostViewedMovies,
  get4KMovies,
  getHDMovies,
} from "@/lib/movies-data"

export default function DownloadsCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allMovies = getAllMovies()
  const newMovies = getNewMovies()
  const topRated = getTopRatedMovies()
  const mostViewed = getMostViewedMovies()
  const movies4K = get4KMovies()
  const moviesHD = getHDMovies()

  const filteredMovies = searchQuery
    ? allMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : allMovies

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <Download className="h-8 w-8 mr-3 text-green-500" />
              Downloads Center
            </h1>
            <p className="text-gray-400 text-lg">Fast and easy movie downloads in multiple qualities</p>
          </div>

          {/* Quick Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search movies to download..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Download Categories */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="bg-gray-900 border-gray-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600">
                <Download className="h-4 w-4 mr-2" />
                All Movies
              </TabsTrigger>
              <TabsTrigger value="new" className="data-[state=active]:bg-green-600">
                <Calendar className="h-4 w-4 mr-2" />
                New Releases
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-green-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                Most Downloaded
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="data-[state=active]:bg-green-600">
                <Star className="h-4 w-4 mr-2" />
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="4k" className="data-[state=active]:bg-green-600">
                4K Quality
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">All Movies</h2>
                <span className="text-gray-400">{filteredMovies.length} movies available</span>
              </div>

              <FilterBar />

              <div className="grid gap-4 pb-20 md:pb-8">
                {filteredMovies.slice(0, 20).map((movie) => (
                  <QuickDownloadCard key={movie.id} movie={movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">New Releases</h2>
                <span className="text-gray-400">{newMovies.length} movies</span>
              </div>

              <div className="grid gap-4 pb-20 md:pb-8">
                {newMovies.map((movie) => (
                  <QuickDownloadCard key={movie.id} movie={movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Most Downloaded</h2>
                <span className="text-gray-400">{mostViewed.length} movies</span>
              </div>

              <div className="grid gap-4 pb-20 md:pb-8">
                {mostViewed.map((movie) => (
                  <QuickDownloadCard key={movie.id} movie={movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top-rated" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Top Rated Movies</h2>
                <span className="text-gray-400">{topRated.length} movies</span>
              </div>

              <div className="grid gap-4 pb-20 md:pb-8">
                {topRated.map((movie) => (
                  <QuickDownloadCard key={movie.id} movie={movie} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="4k" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">4K Ultra HD Movies</h2>
                <span className="text-gray-400">{movies4K.length} movies</span>
              </div>

              <div className="grid gap-4 pb-20 md:pb-8">
                {movies4K.map((movie) => (
                  <QuickDownloadCard key={movie.id} movie={movie} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
