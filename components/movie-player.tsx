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
    return (
      url?.includes("strtape.tech/e/") ||
      url?.includes("iframe") ||
      url?.includes("vide0.net/e/") ||
      url?.includes("embed") ||
      url?.includes("player")
    )
  }

  const getEmbedUrl = (url: string) => {
    // If it's already a full embed URL, return as is
    if (url.includes("http") && (url.includes("embed") || url.includes("/e/"))) {
      return url
    }

    // Handle strtape URLs
    if (url.includes("strtape.tech/e/") || url.includes("vide0.net/e/")) {
      return url
    }

    // Default fallback for strtape
    return `https://strtape.tech/e/${url}`
  }

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {showPlayer && getCurrentVideoUrl() ? (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {isVideoEmbed(getCurrentVideoUrl()!) ? (
              <iframe
                src={getEmbedUrl(getCurrentVideoUrl()!)}
                width="800"
                height="600"
                allowFullScreen
                allowTransparency
                allow="autoplay; encrypted-media; picture-in-picture; web-share; fullscreen"
                scrolling="no"
                frameBorder="0"
                loading="lazy"
                className="w-full h-full"
                title={`${movie.title} Player`}
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            ) : (
              <video controls className="w-full h-full" poster={movie.backdrop || movie.poster} crossOrigin="anonymous">
                <source src={getCurrentVideoUrl()} type="video/mp4" />
                <source src={getCurrentVideoUrl()} type="video/webm" />
                <source src={getCurrentVideoUrl()} type="video/ogg" />
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
                  className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto hover:bg-red-700 transition-colors cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                  onClick={handlePlay}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">{movie.duration}</p>
                  <p className="text-gray-400 text-xs mt-1">Click to play</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episode Selection for Series - Only show if not currently playing */}
        {!showPlayer && movie.multipleDownloads && movie.multipleDownloads.length > 1 && (
          <div className="p-4 border-t border-gray-700">
            <h4 className="font-semibold mb-3 text-white">Quick Episode Selection</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {movie.multipleDownloads.slice(0, 8).map((episode, index) => (
                <Button
                  key={index}
                  variant={selectedEpisode === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleEpisodeSelect(index)}
                  className={`text-xs ${
                    selectedEpisode === index
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
                  }`}
                >
                  {episode.label}
                </Button>
              ))}
              {movie.multipleDownloads.length > 8 && (
                <div className="text-xs text-gray-400 flex items-center justify-center">
                  +{movie.multipleDownloads.length - 8} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex flex-wrap gap-2">
            {movie.videoUrl && (
              <Button onClick={handlePlay} className="bg-red-600 hover:bg-red-700 text-white font-medium">
                <Play className="w-4 h-4 mr-2" />
                {showPlayer ? "Playing..." : "Watch Now"}
              </Button>
            )}

            {movie.downloadUrl && (
              <Button
                variant="outline"
                asChild
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <a href={movie.downloadUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
              </Button>
            )}

            {movie.multipleDownloads && movie.multipleDownloads.length <= 3 && (
              <div className="flex flex-wrap gap-2">
                {movie.multipleDownloads.map((download, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
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
