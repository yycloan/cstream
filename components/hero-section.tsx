"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Download, Plus, Info, Star, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Movie {
  id: string
  title: string
  description: string
  poster: string
  backdrop: string
  genre: string[]
  year: number
  rating: number
  views: number
  quality: string
  duration: string
  cast?: string[]
}

interface HeroSectionProps {
  movie: Movie
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdrop || "/placeholder.svg?height=1080&width=1920"}
          alt={movie.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Movie Info */}
          <div className={`space-y-8 ${isLoaded ? "animate-in slide-in-from-left duration-1000" : "opacity-0"}`}>
            {/* Quality Badge */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-lg font-bold">
                {movie.quality}
              </Badge>
              <Badge variant="outline" className="border-cyan-400 text-cyan-400 px-3 py-1">
                Featured
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              {movie.title}
            </h1>

            {/* Movie Details */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-xl font-semibold">{movie.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span>{movie.duration}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((g) => (
                <Badge
                  key={g}
                  variant="outline"
                  className="border-purple-400 text-purple-300 hover:bg-purple-400/20 transition-colors"
                >
                  {g}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">{movie.description}</p>

            {/* Cast */}
            {movie.cast && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Starring:</p>
                <p className="text-white">{movie.cast.slice(0, 3).join(", ")}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-2 h-6 w-6" />
                Watch Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Download className="mr-2 h-6 w-6" />
                Download
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 px-6 py-4 rounded-full transition-all duration-300"
              >
                <Plus className="mr-2 h-6 w-6" />
                Watchlist
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 px-6 py-4 rounded-full transition-all duration-300"
              >
                <Info className="mr-2 h-6 w-6" />
                More Info
              </Button>
            </div>
          </div>

          {/* Movie Poster */}
          <div
            className={`flex justify-center lg:justify-end ${isLoaded ? "animate-in slide-in-from-right duration-1000 delay-300" : "opacity-0"}`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative">
                <Image
                  src={movie.poster || "/placeholder.svg?height=600&width=400"}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
