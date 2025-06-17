"use client"

import { useState } from "react"
import { Play, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/lib/movies-data"

interface MoviePlayerProps {
  movie: Movie
}

export default function MoviePlayer({ movie }: MoviePlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [selectedEpisode, setSelectedEpisode] = useState(0)

  const handlePlay = () => {
    setShowPlayer(true)
  }

  const handleEpisodeSelect = (index: number) => {
    setSelectedEpisode(index)
    setShowPlayer(true)
  }

  const getCurrentVideoUrl = () => {
    if (movie.multipleDownloads && movie.multipleDownloads[selectedEpisode]) {
      return movie.multipleDownloads[selectedEpisode].url
    }
    return movie.videoUrl
  }

  const isVideoEmbed = (url: string) => {
    return url?.includes("vide0.net/e/") || url?.includes("iframe")
  }

  const getEmbedUrl = (url: string) => {
    if (url?.includes("vide0.net/e/")) {
      return url
    }
    return url
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {showPlayer && getCurrentVideoUrl() ? (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {isVideoEmbed(getCurrentVideoUrl()!) ? (
              <div className="w-full h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={getEmbedUrl(getCurrentVideoUrl()!)}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  loading="lazy"
                  className="w-full h-full"
                  title={`${movie.title} Player`}
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={() => console.log("Iframe failed to load")}
                />
              </div>
            ) : (
              <video controls className="w-full h-full" poster={movie.backdrop || movie.poster}>
                <source src={getCurrentVideoUrl()} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: `url(${movie.backdrop || movie.poster})`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto hover:bg-red-700 transition-colors cursor-pointer"
                  onClick={handlePlay}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">{movie.duration}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episode Selection for Series */}
        {movie.multipleDownloads && movie.multipleDownloads.length > 1 && (
          <div className="p-4 border-t">
            <h4 className="font-semibold mb-3">Episodes</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {movie.multipleDownloads.map((episode, index) => (
                <Button
                  key={index}
                  variant={selectedEpisode === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleEpisodeSelect(index)}
                  className="text-xs"
                >
                  {episode.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2">
            {movie.videoUrl && (
              <Button onClick={handlePlay} className="bg-red-600 hover:bg-red-700">
                <Play className="w-4 h-4 mr-2" />
                Watch Now
              </Button>
            )}

            {movie.downloadUrl && (
              <Button variant="outline" asChild>
                <a href={movie.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </Button>
            )}

            {movie.multipleDownloads && (
              <div className="flex flex-wrap gap-2">
                {movie.multipleDownloads.map((download, index) => (
                  <Button key={index} variant="outline" size="sm" asChild>
                    <a href={download.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {download.label}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
