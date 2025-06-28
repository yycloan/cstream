"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface MovieCommentsProps {
  movieId: string
}

export default function MovieComments({ movieId }: MovieCommentsProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!rating) {
      toast({
        title: "Please provide a rating.",
      })
      return
    }

    // Simulate comment submission
    toast({
      title: "Review submitted successfully!",
    })
    setRating(null)
    setComment("")
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Rate and Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-900 rounded-lg">
        <div>
          <Label htmlFor="rating" className="text-white mb-2 block">
            Rating:
          </Label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                type="button"
                variant={rating === value ? "default" : "outline"}
                className={rating === value ? "bg-red-600 hover:bg-red-700" : ""}
                onClick={() => setRating(value)}
              >
                {value} Star{value !== 1 ? "s" : ""}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="comment" className="text-white mb-2 block">
            Comment:
          </Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
            rows={4}
          />
        </div>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Submit Review
        </Button>
      </form>
    </div>
  )
}
