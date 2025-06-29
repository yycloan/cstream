"use client"

import { useState } from "react"
import { Download, Trash2, Play, Pause, CheckCircle, Clock } from "lucide-react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getRandomMovies } from "@/lib/movies-data"

interface DownloadItem {
  id: string
  movie: any
  status: "downloading" | "completed" | "paused" | "queued"
  progress: number
  size: string
  speed?: string
  timeRemaining?: string
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    const movies = getRandomMovies(8)
    return movies.map((movie, index) => ({
      id: movie.id,
      movie,
      status: index < 2 ? "downloading" : index < 4 ? "completed" : index < 6 ? "paused" : "queued",
      progress:
        index < 2
          ? Math.floor(Math.random() * 80) + 10
          : index < 4
            ? 100
            : index < 6
              ? Math.floor(Math.random() * 50)
              : 0,
      size: ["1.2GB", "2.1GB", "850MB", "1.8GB", "3.2GB", "1.5GB", "2.8GB", "1.1GB"][index],
      speed: index < 2 ? `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB/s` : undefined,
      timeRemaining: index < 2 ? `${Math.floor(Math.random() * 30) + 5} min` : undefined,
    }))
  })

  const pauseDownload = (id: string) => {
    setDownloads((prev) => prev.map((item) => (item.id === id ? { ...item, status: "paused" as const } : item)))
  }

  const resumeDownload = (id: string) => {
    setDownloads((prev) => prev.map((item) => (item.id === id ? { ...item, status: "downloading" as const } : item)))
  }

  const removeDownload = (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "downloading":
        return <Download className="h-4 w-4 text-blue-400" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-400" />
      case "queued":
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "downloading":
        return "border-blue-600 text-blue-400"
      case "completed":
        return "border-green-600 text-green-400"
      case "paused":
        return "border-yellow-600 text-yellow-400"
      case "queued":
        return "border-gray-600 text-gray-400"
      default:
        return "border-gray-600 text-gray-400"
    }
  }

  const activeDownloads = downloads.filter((d) => d.status === "downloading").length
  const completedDownloads = downloads.filter((d) => d.status === "completed").length

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Downloads</h1>
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline" className="border-blue-600 text-blue-400">
                {activeDownloads} Active
              </Badge>
              <Badge variant="outline" className="border-green-600 text-green-400">
                {completedDownloads} Completed
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-400">
                {downloads.length} Total
              </Badge>
            </div>
          </div>

          {downloads.length === 0 ? (
            <div className="text-center py-16">
              <Download className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">No Downloads</h2>
              <p className="text-gray-400 mb-6">Start downloading movies to see them here</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <a href="/">Browse Movies</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4 pb-20 md:pb-8">
              {downloads.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Movie Poster */}
                      <div className="w-16 h-24 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.movie.poster || "/placeholder.svg"}
                          alt={item.movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Movie Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{item.movie.title}</h3>
                        <p className="text-sm text-gray-400">
                          {item.movie.year} • {item.size}
                        </p>

                        {/* Status Badge */}
                        <Badge variant="outline" className={`mt-2 ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">{item.status}</span>
                        </Badge>
                      </div>

                      {/* Progress Info */}
                      <div className="flex-1 min-w-0">
                        {item.status === "downloading" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">{item.progress}%</span>
                              <span className="text-gray-400">{item.speed}</span>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                            <p className="text-xs text-gray-500">{item.timeRemaining} remaining</p>
                          </div>
                        )}

                        {item.status === "completed" && (
                          <div className="text-center">
                            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-1" />
                            <p className="text-sm text-green-400">Download Complete</p>
                          </div>
                        )}

                        {item.status === "paused" && (
                          <div className="space-y-2">
                            <Progress value={item.progress} className="h-2" />
                            <p className="text-xs text-yellow-400 text-center">Paused at {item.progress}%</p>
                          </div>
                        )}

                        {item.status === "queued" && (
                          <div className="text-center">
                            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                            <p className="text-sm text-gray-400">Queued</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        {item.status === "downloading" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => pauseDownload(item.id)}
                            className="border-gray-600"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}

                        {item.status === "paused" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resumeDownload(item.id)}
                            className="border-gray-600"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}

                        {item.status === "completed" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Play className="h-4 w-4 mr-1" />
                            Play
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeDownload(item.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
