"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Info, Star, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/lib/movies-data"

interface HeroBannerProps {
  movies: Movie[]
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Get the featured movie or fallback to first movie
  const featuredMovie = movies.find((movie) => movie.isFeatured) || movies[0]

  useEffect(() => {
    setIsLoaded(true)

    // Auto-rotate through featured movies every 8 seconds
    if (movies.length > 1) {
      const interval = setInterval(() => {
        setCurrentMovieIndex((prev) => (prev + 1) % movies.length)
      }, 8000)

      return () => clearInterval(interval)
    }
  }, [movies.length])

  // If no movies available, show placeholder
  if (!movies || movies.length === 0) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to CineStream</h2>
          <p className="text-xl text-gray-300">Your ultimate movie streaming destination</p>
        </div>
      </div>
    )
  }

  const currentMovie = movies[currentMovieIndex] || featuredMovie

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop || currentMovie.poster || "/placeholder.svg?height=1080&width=1920"}
          alt={currentMovie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex items-center">
        <div
          className={`max-w-2xl space-y-4 md:space-y-6 ${isLoaded ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}
        >
          {/* Quality Badge */}
          <div className="flex items-center space-x-3">
            <Badge className="bg-red-600 text-white px-3 py-1 text-sm font-bold">{currentMovie.quality}</Badge>
            <Badge variant="outline" className="border-yellow-400 text-yellow-400 px-3 py-1">
              Featured
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">{currentMovie.title}</h1>

          {/* Movie Details */}
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{currentMovie.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{currentMovie.year}</span>
            </div>
            {currentMovie.duration && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{currentMovie.duration}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {currentMovie.genre.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" className="border-gray-500 text-gray-300">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed line-clamp-3 max-w-xl">{currentMovie.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-6 md:px-8 py-3 text-base font-semibold"
              asChild
            >
              <Link href={`/movie/${currentMovie.slug}`}>
                <Play className="mr-2 h-5 w-5 fill-current" />
                Play Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-500 text-white hover:bg-white/10 px-6 md:px-8 py-3 text-base"
              asChild
            >
              <Link href={`/movie/${currentMovie.slug}`}>
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-4 py-3 hidden md:flex">
              <Plus className="mr-2 h-5 w-5" />
              My List
            </Button>
          </div>
        </div>
      </div>

      {/* Movie Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {movies.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMovieIndex ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setCurrentMovieIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
