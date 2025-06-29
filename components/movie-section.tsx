import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/movie-card"

interface Movie {
  id: string
  title: string
  poster: string
  genre: string[]
  year: number
  rating: number
  views: number
  quality: string
  slug: string
}

interface MovieSectionProps {
  title: string
  movies: Movie[]
  viewAllLink?: string
}

export default function MovieSection({ title, movies, viewAllLink }: MovieSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllLink && (
          <Button variant="ghost" asChild>
            <Link href={viewAllLink} className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
