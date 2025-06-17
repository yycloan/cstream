"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface MovieRatingProps {
  movieId: string
  currentRating?: number
  totalRatings?: number
  userRating?: number
  onRatingChange?: (rating: number) => void
}

export default function MovieRating({
  movieId,
  currentRating = 0,
  totalRatings = 0,
  userRating = 0,
  onRatingChange,
}: MovieRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(userRating)
  const { toast } = useToast()

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating)
    onRatingChange?.(rating)

    toast({
      title: "Rating Submitted",
      description: `You rated this movie ${rating} star${rating !== 1 ? "s" : ""}`,
    })
  }

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1
      const isFilled = interactive ? starValue <= (hoveredRating || selectedRating) : starValue <= rating

      return (
        <Star
          key={i}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-400 hover:text-yellow-400"
          }`}
          onClick={() => interactive && handleRatingClick(starValue)}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
        />
      )
    })
  }

  return (
    <div className="space-y-4">
      {/* Current Rating Display */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(currentRating)}
          <span className="text-white font-semibold ml-2">{currentRating.toFixed(1)}</span>
        </div>
        <span className="text-gray-400 text-sm">
          ({totalRatings.toLocaleString()} rating{totalRatings !== 1 ? "s" : ""})
        </span>
      </div>

      {/* User Rating */}
      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-white font-medium mb-2">Rate this movie:</h4>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">{renderStars(selectedRating, true)}</div>
          {selectedRating > 0 && (
            <span className="text-yellow-400 text-sm">
              Your rating: {selectedRating} star{selectedRating !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {selectedRating > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedRating(0)
              onRatingChange?.(0)
              toast({
                title: "Rating Removed",
                description: "Your rating has been removed",
              })
            }}
            className="text-gray-400 hover:text-white mt-2 p-0 h-auto"
          >
            Remove rating
          </Button>
        )}
      </div>
    </div>
  )
}
