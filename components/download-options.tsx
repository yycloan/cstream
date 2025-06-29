"use client"

import { Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/lib/movies-data"

interface DownloadOptionsProps {
  movie: Movie
}

export default function DownloadOptions({ movie }: DownloadOptionsProps) {
  const handleDownload = (url: string, label?: string) => {
    // Open download link in new tab
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Download className="mr-2 h-5 w-5" />
          Download Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quality Badge */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-red-600 text-red-400">
            {movie.quality || "HD"}
          </Badge>
          <span className="text-gray-400 text-sm">Quality</span>
        </div>

        {/* Multiple Downloads (for TV shows/series) */}
        {movie.multipleDownloads && movie.multipleDownloads.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Available Episodes:</h4>
            {movie.multipleDownloads.map((download, index) => (
              <Button
                key={index}
                onClick={() => handleDownload(download.url, download.label)}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-between"
              >
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  {download.label}
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            ))}
          </div>
        ) : (
          /* Single Download */
          movie.downloadUrl && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Download Movie:</h4>
              <Button
                onClick={() => handleDownload(movie.downloadUrl!)}
                className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-between"
              >
                <span className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download {movie.title}
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )
        )}

        {/* Download Info */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h5 className="text-white font-medium mb-2">Download Information:</h5>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Quality: {movie.quality || "HD"}</li>
            <li>• Duration: {movie.duration || "Unknown"}</li>
            <li>• Language: {movie.language || "Unknown"}</li>
            <li>• File format: MP4/MKV</li>
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 p-3 rounded-lg">
          <p className="text-yellow-400 text-xs">
            ⚠️ Please ensure you have a stable internet connection before downloading. Large files may take time to
            download depending on your connection speed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
