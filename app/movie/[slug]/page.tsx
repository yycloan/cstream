import { notFound } from "next/navigation"
import { Suspense } from "react"
import Header from "@/components/header"
import MobileNav from "@/components/mobile-nav"
import MoviePlayer from "@/components/movie-player"
import MovieInfo from "@/components/movie-info"
import DownloadButton from "@/components/download-button"
import MovieComments from "@/components/movie-comments"
import RelatedMovies from "@/components/related-movies"
import EpisodeList from "@/components/episode-list"
import { getMovieBySlug, getRelatedMovies } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MoviePageProps {
  params: Promise<{ slug: string }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params

  // Get the movie by slug
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    notFound()
  }

  // Get related movies
  const relatedMovies = await getRelatedMovies(movie.id, movie.genre)

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
              <MoviePlayer movie={movie} />
            </div>

            <MovieInfo movie={movie} />

            {/* Episode List for Mobile */}
            {movie.multipleDownloads && movie.multipleDownloads.length > 1 && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white text-lg font-semibold mb-4">Episodes</h3>
                <EpisodeList movie={movie} />
              </div>
            )}

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
                  {movie.cast && (
                    <div className="mt-4">
                      <h4 className="text-white font-semibold mb-2">Cast:</h4>
                      <p>{movie.cast.join(", ")}</p>
                    </div>
                  )}
                  {movie.director && (
                    <div className="mt-2">
                      <h4 className="text-white font-semibold mb-2">Director:</h4>
                      <p>{movie.director}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="downloads" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">Download Options</h3>
                  <DownloadButton movie={movie} size="lg" />
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Suspense fallback={<div className="text-white">Loading comments...</div>}>
                  <MovieComments movieId={movie.id} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <MoviePlayer movie={movie} />
                </div>

                {/* Episode List for Desktop - Highlighted Area */}
                {movie.multipleDownloads && movie.multipleDownloads.length > 1 && (
                  <div className="bg-gray-900 rounded-lg p-6">
                    <h3 className="text-white text-xl font-semibold mb-4">Episodes</h3>
                    <EpisodeList movie={movie} />
                  </div>
                )}

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-gray-900">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="downloads" className="data-[state=active]:bg-red-600">
                      Downloads
                    </TabsTrigger>
                    <TabsTrigger value="cast" className="data-[state=active]:bg-red-600">
                      Cast & Crew
                    </TabsTrigger>
                    <TabsTrigger value="comments" className="data-[state=active]:bg-red-600">
                      Comments
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-6">
                    <div className="prose max-w-none text-gray-300">
                      <p>{movie.description}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="downloads" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-white text-lg font-semibold">Download Options</h3>
                      <DownloadButton movie={movie} size="lg" />
                    </div>
                  </TabsContent>

                  <TabsContent value="cast" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {movie.cast?.map((actor, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{actor.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{actor}</p>
                            <p className="text-sm text-gray-400">Actor</p>
                          </div>
                        </div>
                      )) || <p className="text-gray-400">Cast information not available</p>}

                      {movie.director && (
                        <div className="flex items-center space-x-3 col-span-2 mt-4 pt-4 border-t border-gray-700">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{movie.director.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{movie.director}</p>
                            <p className="text-sm text-gray-400">Director</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="comments" className="mt-6">
                    <Suspense fallback={<div className="text-white">Loading comments...</div>}>
                      <MovieComments movieId={movie.id} />
                    </Suspense>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <MovieInfo movie={movie} />

                {/* Quick Download Section */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Quick Download</h3>
                  <DownloadButton movie={movie} size="lg" />
                </div>
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
  // Return empty array to enable dynamic routing
  return []
}
