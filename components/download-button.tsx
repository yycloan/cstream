"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface DownloadButtonProps {
  movie: {
    id: string
    title: string
    downloadUrl?: string
    multipleDownloads?: Array<{ label: string; url: string }>
  }
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  showQuality?: boolean
}

export default function DownloadButton({
  movie,
  variant = "default",
  size = "default",
  showQuality = true,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (url: string, title?: string) => {
    if (!url || url === "#") {
      toast({
        title: "Download Unavailable",
        description: "This download link is not available yet.",
        variant: "destructive",
      })
      return
    }

    setIsDownloading(true)

    try {
      // Simulate adding to downloads
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Open download link
      window.open(url, "_blank")

      toast({
        title: "Download Started",
        description: `${title || movie.title} download has started.`,
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error starting the download. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // If movie has multiple downloads (like TV series with episodes)
  if (movie.multipleDownloads && movie.multipleDownloads.length > 0) {
    return (
      <div className="space-y-2">
        {movie.multipleDownloads.map((download, index) => (
          <Button
            key={index}
            variant={variant}
            size={size}
            onClick={() => handleDownload(download.url, download.label)}
            disabled={isDownloading}
            className={`${variant === "default" ? "bg-green-600 hover:bg-green-700" : ""} w-full`}
          >
            {isDownloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            {isDownloading ? "Starting..." : `Download ${download.label}`}
          </Button>
        ))}
      </div>
    )
  }

  // Single download button
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => handleDownload(movie.downloadUrl || "")}
      disabled={isDownloading || !movie.downloadUrl}
      className={variant === "default" ? "bg-green-600 hover:bg-green-700" : ""}
    >
      {isDownloading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {isDownloading ? "Starting..." : "Download"}
    </Button>
  )
}
