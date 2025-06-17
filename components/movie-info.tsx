"use client"

import { Star, Calendar, Clock, Globe, Film, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DownloadButton from "@/components/download-button"
import type { Movie } from "@/lib/movies-data"

interface MovieInfoProps {
  movie: Movie
}

export default function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.year}</span>
          </div>
          {movie.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{movie.duration}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Globe className="h-4 w-4" />
            <span>{movie.country}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="text-white font-semibold">{movie.rating}</span>
          <span className="text-gray-400">/ 10</span>
        </div>
        <Badge variant="secondary" className="bg-red-600 text-white">
          {movie.quality}
        </Badge>
        <Badge variant="outline" className="text-gray-300 border-gray-600">
          {movie.language}
        </Badge>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {movie.genre.map((genre) => (
            <Badge key={genre} variant="outline" className="text-gray-300 border-gray-600">
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-2">Synopsis</h3>
        <p className="text-gray-300 leading-relaxed">{movie.description}</p>
      </div>

      {movie.cast && (
        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Cast
          </h3>
          <p className="text-gray-300">{movie.cast.slice(0, 3).join(", ")}</p>
        </div>
      )}

      {movie.director && (
        <div>
          <h3 className="text-white font-semibold mb-2 flex items-center">
            <Film className="h-4 w-4 mr-2" />
            Director
          </h3>
          <p className="text-gray-300">{movie.director}</p>
        </div>
      )}

      <div className="pt-4 border-t border-gray-700">
        <DownloadButton movie={movie} size="lg" />
      </div>
    </div>
  )
}
