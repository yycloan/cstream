"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DownloadButton from "@/components/download-button"
import type { Movie } from "@/lib/movies-data"

interface QuickDownloadCardProps {
  movie: Movie
}

export default function QuickDownloadCard({ movie }: QuickDownloadCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {/* Movie Poster */}
          <Link href={`/movie/${movie.slug}`} className="flex-shrink-0">
            <div className="relative w-20 h-28 rounded overflow-hidden">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="80px"
              />
              <Badge className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 py-0.5">{movie.quality}</Badge>
            </div>
          </Link>

          {/* Movie Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/movie/${movie.slug}`}>
              <h3 className="font-semibold text-white line-clamp-2 hover:text-red-400 transition-colors">
                {movie.title}
              </h3>
            </Link>

            <div className="flex items-center space-x-3 mt-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{movie.year}</span>
              </div>
              {movie.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{movie.duration}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {movie.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="mt-3">
              <DownloadButton movie={movie} size="sm" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
