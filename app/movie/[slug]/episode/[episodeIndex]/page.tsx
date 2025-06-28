import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import MoviePlayer from "@/components/movie-player"
import MovieInfo from "@/components/movie-info"
import DownloadButton from "@/components/download-button"
import MovieComments from "@/components/movie-comments"
import RelatedMovies from "@/components/related-movies"
import { getMovieBySlug, getRelatedMovies } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EpisodePageProps {
  params: Promise<{ slug: string; episodeIndex: string }>
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug, episodeIndex } = await params
  const episodeIdx = Number.parseInt(episodeIndex)

  // Get the movie by slug
  const movie = await getMovieBySlug(slug)

  if (!movie || !movie.multipleDownloads || !movie.multipleDownloads[episodeIdx]) {
    notFound()
  }

  const episode = movie.multipleDownloads[episodeIdx]
  const relatedMovies = await getRelatedMovies(movie.id, movie.genre)

  // Create episode-specific movie object
  const episodeMovie = {
    ...movie,
    title: `${movie.title} - ${episode.label}`,
    videoUrl: episode.url,
    downloadUrl: episode.url,
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Series Button */}
          <div className="mb-6">
            <Button variant="outline" asChild className="text-white border-gray-600 hover:bg-gray-800 bg-transparent">
              <Link href={`/movie/${slug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {movie.title}
              </Link>
            </Button>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
              <MoviePlayer movie={episodeMovie} />
            </div>

            <MovieInfo movie={episodeMovie} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="downloads" className="data-[state=active]:bg-red-600">
                  Downloads
                </TabsTrigger>
                <TabsTrigger value="comments" className="data-[state=active]:bg-red-600">
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-6">
                <div className="prose prose-sm max-w-none text-gray-300">
                  <p>{movie.description}</p>
                  <div className="mt-4">
                    <h4 className="text-white font-semibold mb-2">Episode:</h4>
                    <p>{episode.label}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="downloads" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">Download This Episode</h3>
                  <DownloadButton movie={episodeMovie} size="lg" />
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Suspense fallback={<div className="text-white">Loading comments...</div>}>
                  <MovieComments movieId={`${movie.id}-ep-${episodeIdx}`} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <MoviePlayer movie={episodeMovie} />
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-gray-900">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="downloads" className="data-[state=active]:bg-red-600">
                      Downloads
                    </TabsTrigger>
                    <TabsTrigger value="comments" className="data-[state=active]:bg-red-600">
                      Comments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <div className="prose max-w-none text-gray-300">
                      <p>{movie.description}</p>
                      <div className="mt-4">
                        <h4 className="text-white font-semibold mb-2">Episode:</h4>
                        <p>{episode.label}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="downloads" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-white text-lg font-semibold">Download This Episode</h3>
                      <DownloadButton movie={episodeMovie} size="lg" />
                    </div>
                  </TabsContent>

                  <TabsContent value="comments" className="mt-6">
                    <Suspense fallback={<div className="text-white">Loading comments...</div>}>
                      <MovieComments movieId={`${movie.id}-ep-${episodeIdx}`} />
                    </Suspense>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <MovieInfo movie={episodeMovie} />

                {/* Quick Download Section */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Quick Download</h3>
                  <DownloadButton movie={episodeMovie} size="lg" />
                </div>

                {/* Other Episodes */}
                {movie.multipleDownloads && movie.multipleDownloads.length > 1 && (
                  <div className="bg-gray-900 rounded-lg p-6">
                    <h3 className="text-white text-lg font-semibold mb-4">Other Episodes</h3>
                    <div className="space-y-2">
                      {movie.multipleDownloads.map((ep, index) => (
                        <Link
                          key={index}
                          href={`/movie/${slug}/episode/${index}`}
                          className={`block p-3 rounded-lg transition-colors ${
                            index === episodeIdx
                              ? "bg-red-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {ep.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Movies */}
          {relatedMovies.length > 0 && (
            <div className="mt-12 pb-20 md:pb-8">
              <Suspense fallback={<div className="text-white">Loading related movies...</div>}>
                <RelatedMovies movies={relatedMovies} />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

// Generate static params for better performance
export async function generateStaticParams() {
  return []
}
