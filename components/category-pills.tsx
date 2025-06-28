"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  { name: "Action", slug: "action", icon: "💥" },
  { name: "Comedy", slug: "comedy", icon: "😂" },
  { name: "Drama", slug: "drama", icon: "🎭" },
  { name: "Horror", slug: "horror", icon: "👻" },
  { name: "Romance", slug: "romance", icon: "💕" },
  { name: "Sci-Fi", slug: "sci-fi", icon: "🚀" },
  { name: "Thriller", slug: "thriller", icon: "🔥" },
  { name: "Animation", slug: "animation", icon: "🎨" },
  { name: "Documentary", slug: "documentary", icon: "📽️" },
  { name: "Fantasy", slug: "fantasy", icon: "🧙‍♂️" },
  { name: "Adventure", slug: "adventure", icon: "🗺️" },
  { name: "Crime", slug: "crime", icon: "🔫" },
]

export default function CategoryPills() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
        <Link href="/categories" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
          View All
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 pb-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Badge
                variant="secondary"
                className="px-6 py-3 text-sm bg-gray-800 border border-gray-700 hover:bg-red-600 hover:border-red-500 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <span className="mr-2 text-base">{category.icon}</span>
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-gray-800" />
      </ScrollArea>
    </div>
  )
}
