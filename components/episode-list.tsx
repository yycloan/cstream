"use client"

import Link from "next/link"
import { Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/lib/movies-data"

interface EpisodeListProps {
  movie: Movie
}

export default function EpisodeList({ movie }: EpisodeListProps) {
  if (!movie.multipleDownloads || movie.multipleDownloads.length <= 1) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movie.multipleDownloads.map((episode, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold text-sm">{episode.label}</h4>
              <span className="text-xs text-gray-400">EP {index + 1}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 flex-1">
                <Link href={`/movie/${movie.slug}/episode/${index + 1}`}>
                  <Play className="w-3 h-3 mr-1" />
                  Watch
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <a href={episode.url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
