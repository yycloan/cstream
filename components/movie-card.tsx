"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/lib/movies-data"

interface MovieCardProps {
  movie: Movie
  priority?: boolean
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 md:hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative w-32 md:w-48 lg:w-56">
        <Link href={`/movie/${movie.slug}`}>
          <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-800">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={priority}
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 224px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quality Badge */}
            <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1">
              {movie.quality}
            </Badge>

            {/* Rating */}
            <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-xs font-semibold">{movie.rating}</span>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm">
                <Play className="h-6 w-6 fill-current" />
              </Button>
            </div>
          </div>
        </Link>

        {/* Expanded Info (Desktop Only) */}
        <div
          className={`absolute top-full left-0 right-0 bg-gray-900 rounded-b-md shadow-2xl z-20 transition-all duration-300 hidden md:block ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-white text-sm line-clamp-2">{movie.title}</h3>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-green-400 text-xs font-semibold">{Math.round(movie.rating * 10)}% Match</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((genre) => (
                <span key={genre} className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded">
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200 flex-1">
                <Play className="h-4 w-4 mr-1 fill-current" />
                Play
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                <Plus className="h-4 w-4" />
              </Button>
              {movie.downloadUrl && (
                <a href={movie.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
                    <Download className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Title */}
      <div className="mt-2 md:hidden">
        <h3 className="text-white text-sm font-medium line-clamp-2">{movie.title}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-gray-400 text-xs">{movie.year}</span>
          <span className="text-green-400 text-xs font-semibold">{Math.round(movie.rating * 10)}%</span>
        </div>
      </div>
    </div>
  )
}
