import Link from "next/link"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Action", slug: "action", icon: "⚡", movieCount: 45, description: "High-octane thrills and excitement" },
  { name: "Comedy", slug: "comedy", icon: "😂", movieCount: 32, description: "Laugh-out-loud entertainment" },
  { name: "Drama", slug: "drama", icon: "🎭", movieCount: 58, description: "Compelling stories and characters" },
  { name: "Horror", slug: "horror", icon: "👻", movieCount: 28, description: "Spine-chilling scares" },
  { name: "Romance", slug: "romance", icon: "💕", movieCount: 24, description: "Love stories that touch the heart" },
  { name: "Sci-Fi", slug: "sci-fi", icon: "🚀", movieCount: 35, description: "Futuristic adventures" },
  { name: "Thriller", slug: "thriller", icon: "🔥", movieCount: 41, description: "Edge-of-your-seat suspense" },
  { name: "Animation", slug: "animation", icon: "🎨", movieCount: 19, description: "Animated masterpieces" },
  { name: "Adventure", slug: "adventure", icon: "🗺️", movieCount: 33, description: "Epic journeys and quests" },
  { name: "Crime", slug: "crime", icon: "🔫", movieCount: 37, description: "Gritty crime stories" },
  { name: "Fantasy", slug: "fantasy", icon: "🧙‍♂️", movieCount: 26, description: "Magical worlds and creatures" },
  { name: "Mystery", slug: "mystery", icon: "🔍", movieCount: 22, description: "Puzzles waiting to be solved" },
  { name: "TV Shows", slug: "tv-shows", icon: "📺", movieCount: 0, description: "Binge-worthy series" },
  { name: "Documentaries", slug: "documentary", icon: "📽️", movieCount: 15, description: "Real stories, real impact" },
  { name: "Family", slug: "family", icon: "👨‍👩‍👧‍👦", movieCount: 21, description: "Fun for the whole family" },
  { name: "Music", slug: "music", icon: "🎵", movieCount: 8, description: "Musical films and concerts" },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse Categories</h1>
            <p className="text-gray-400 text-lg">Discover movies by your favorite genres</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-20 md:pb-8">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-red-600 transition-all duration-300 cursor-pointer group h-full">
                  <CardContent className="p-4 md:p-6 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-red-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{category.description}</p>
                    </div>
                    <div className="mt-auto">
                      {category.movieCount > 0 ? (
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-300 group-hover:border-red-400 group-hover:text-red-400"
                        >
                          {category.movieCount} movies
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-300 group-hover:border-red-400 group-hover:text-red-400"
                        >
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Popular Categories Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Most Popular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter((cat) => cat.movieCount > 30)
                .slice(0, 6)
                .map((category) => (
                  <Link key={`popular-${category.slug}`} href={`/category/${category.slug}`}>
                    <Card className="bg-gradient-to-r from-red-900/20 to-red-600/20 border-red-600/30 hover:from-red-800/30 hover:to-red-500/30 transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl">{category.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-xl mb-1">{category.name}</h3>
                            <p className="text-gray-300 text-sm mb-2">{category.description}</p>
                            <Badge className="bg-red-600 text-white">{category.movieCount} movies</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
