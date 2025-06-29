import { notFound } from "next/navigation"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import MovieGrid from "@/components/movie-grid"
import { getAllMovies } from "@/lib/movies-data"

interface AlphabetPageProps {
  params: Promise<{ letter: string }>
}

export default async function AlphabetPage({ params }: AlphabetPageProps) {
  const { letter } = await params

  // Validate letter parameter
  const validLetters = [
    "#",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

  if (!validLetters.includes(letter.toLowerCase())) {
    notFound()
  }

  const allMovies = getAllMovies()

  // Filter movies by first letter
  const filteredMovies = allMovies.filter((movie) => {
    const firstChar = movie.title.charAt(0).toUpperCase()
    if (letter === "#") {
      return !/[A-Z]/.test(firstChar)
    }
    return firstChar === letter.toUpperCase()
  })

  const displayLetter = letter === "#" ? "Numbers" : letter.toUpperCase()

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Movies Starting with "{displayLetter}"</h1>
            <p className="text-gray-400">
              {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="pb-20 md:pb-8">
            <MovieGrid movies={filteredMovies} />
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

// Generate static params for all letters
export async function generateStaticParams() {
  const letters = [
    "#",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

  return letters.map((letter) => ({
    letter,
  }))
}
