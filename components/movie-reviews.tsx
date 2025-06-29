"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

interface Review {
  id: string
  user: {
    name: string
    avatar?: string
    verified?: boolean
  }
  content: string
  rating: number
  likes: number
  dislikes: number
  timestamp: string
  helpful: boolean
  spoiler: boolean
}

interface MovieReviewsProps {
  movieId: string
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", verified: true },
    content:
      "Amazing movie! The cinematography was absolutely stunning and the story kept me engaged throughout. The download quality was excellent - crystal clear 1080p. Highly recommend downloading this one!",
    rating: 5,
    likes: 24,
    dislikes: 2,
    timestamp: "2 hours ago",
    helpful: true,
    spoiler: false,
  },
  {
    id: "2",
    user: { name: "Sarah Wilson" },
    content:
      "Good movie but felt a bit long. The acting was great though, especially the lead performance. Downloaded in 720p and it looked great on my laptop.",
    rating: 4,
    likes: 15,
    dislikes: 3,
    timestamp: "1 day ago",
    helpful: false,
    spoiler: false,
  },
  {
    id: "3",
    user: { name: "Mike Chen", verified: true },
    content:
      "Not what I expected but still enjoyable. The plot twists were well executed. Warning: Contains spoilers! The ending where the main character reveals their true identity was shocking.",
    rating: 3,
    likes: 8,
    dislikes: 1,
    timestamp: "3 days ago",
    helpful: false,
    spoiler: true,
  },
  {
    id: "4",
    user: { name: "Emma Rodriguez" },
    content:
      "Absolutely loved this film! Perfect for a weekend download. The 4K version is worth the extra space - the visuals are incredible. One of the best movies I've downloaded this year.",
    rating: 5,
    likes: 31,
    dislikes: 0,
    timestamp: "1 week ago",
    helpful: true,
    spoiler: false,
  },
]

export default function MovieReviews({ movieId }: MovieReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [sortBy, setSortBy] = useState("newest")
  const [showSpoilers, setShowSpoilers] = useState(false)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        user: { name: "You" },
        content: newReview.trim(),
        rating: newRating,
        likes: 0,
        dislikes: 0,
        timestamp: "Just now",
        helpful: false,
        spoiler: newReview.toLowerCase().includes("spoiler"),
      }
      setReviews([review, ...reviews])
      setNewReview("")
      setNewRating(5)

      toast({
        title: "Review Posted",
        description: "Your review has been posted successfully!",
      })
    }
  }

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
    )
  }

  const handleDislike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review)),
    )
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={() => interactive && onRatingChange?.(i + 1)}
      />
    ))
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.likes - b.dislikes - (a.likes - a.dislikes)
      case "rating-high":
        return b.rating - a.rating
      case "rating-low":
        return a.rating - b.rating
      default: // newest
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Reviews ({reviews.length})
        </h3>
      </div>

      {/* Rating Overview */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating))}</div>
              <p className="text-gray-400">Based on {reviews.length} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Review Form */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Write a Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
              <div className="flex space-x-1">{renderStars(newRating, true, setNewRating)}</div>
            </div>

            <Textarea
              placeholder="Share your thoughts about this movie and download experience..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
              rows={4}
            />

            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Post Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs value={sortBy} onValueChange={setSortBy} className="w-auto">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="helpful">Most Helpful</TabsTrigger>
              <TabsTrigger value="rating-high">Highest Rated</TabsTrigger>
              <TabsTrigger value="rating-low">Lowest Rated</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSpoilers(!showSpoilers)}
            className="border-gray-600"
          >
            {showSpoilers ? "Hide" : "Show"} Spoilers
          </Button>
        </div>

        {sortedReviews.map((review) => (
          <Card key={review.id} className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-700 text-white">{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{review.user.name}</span>
                      {review.user.verified && (
                        <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                          Verified
                        </Badge>
                      )}
                      <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {review.helpful && (
                        <Badge variant="outline" className="border-green-600 text-green-400">
                          Helpful
                        </Badge>
                      )}
                      <span className="text-sm text-gray-400">{review.timestamp}</span>
                    </div>
                  </div>

                  {review.spoiler && !showSpoilers ? (
                    <div className="bg-gray-800 border border-yellow-600 rounded p-4">
                      <div className="flex items-center text-yellow-400 mb-2">
                        <Flag className="h-4 w-4 mr-2" />
                        This review contains spoilers
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSpoilers(true)}
                        className="border-yellow-600 text-yellow-400"
                      >
                        Show Spoiler
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{review.content}</p>
                  )}

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(review.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{review.likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(review.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="text-sm">{review.dislikes}</span>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
