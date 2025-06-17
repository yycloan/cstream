"use client"

import { useState } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]

const qualities = ["4K", "HD", "CAM"]

const countries = ["United States", "India", "South Korea", "China", "Japan", "Nigeria", "Canada"]

export default function FilterBar() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const clearFilters = () => {
    setSelectedGenre(null)
    setSelectedYear(null)
    setSelectedQuality(null)
    setSelectedCountry(null)
  }

  const hasActiveFilters = selectedGenre || selectedYear || selectedQuality || selectedCountry

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-white font-medium">Filters</span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Buttons */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 pb-4">
          {/* Genre Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedGenre ? "default" : "outline"}
                className={
                  selectedGenre ? "bg-red-600 hover:bg-red-700" : "border-gray-600 text-white hover:bg-gray-800"
                }
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {selectedGenre || "Genre"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-gray-700">
              <DropdownMenuLabel className="text-gray-400">Select Genre</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {genres.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedYear ? "default" : "outline"}
                className={
                  selectedYear ? "bg-red-600 hover:bg-red-700" : "border-gray-600 text-white hover:bg-gray-800"
                }
              >
                {selectedYear || "Year"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-gray-700">
              <DropdownMenuLabel className="text-gray-400">Select Year</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {years.map((year) => (
                <DropdownMenuItem
                  key={year}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                >
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quality Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedQuality ? "default" : "outline"}
                className={
                  selectedQuality ? "bg-red-600 hover:bg-red-700" : "border-gray-600 text-white hover:bg-gray-800"
                }
              >
                {selectedQuality || "Quality"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-gray-700">
              <DropdownMenuLabel className="text-gray-400">Select Quality</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {qualities.map((quality) => (
                <DropdownMenuItem
                  key={quality}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedQuality(quality === selectedQuality ? null : quality)}
                >
                  {quality}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Country Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedCountry ? "default" : "outline"}
                className={
                  selectedCountry ? "bg-red-600 hover:bg-red-700" : "border-gray-600 text-white hover:bg-gray-800"
                }
              >
                {selectedCountry || "Country"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-gray-700">
              <DropdownMenuLabel className="text-gray-400">Select Country</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country}
                  className="text-white hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedCountry(country === selectedCountry ? null : country)}
                >
                  {country}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedGenre && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {selectedGenre}
              <button className="ml-2 hover:text-gray-300" onClick={() => setSelectedGenre(null)}>
                ×
              </button>
            </Badge>
          )}
          {selectedYear && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {selectedYear}
              <button className="ml-2 hover:text-gray-300" onClick={() => setSelectedYear(null)}>
                ×
              </button>
            </Badge>
          )}
          {selectedQuality && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {selectedQuality}
              <button className="ml-2 hover:text-gray-300" onClick={() => setSelectedQuality(null)}>
                ×
              </button>
            </Badge>
          )}
          {selectedCountry && (
            <Badge variant="secondary" className="bg-red-600 text-white">
              {selectedCountry}
              <button className="ml-2 hover:text-gray-300" onClick={() => setSelectedQuality(null)}>
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
