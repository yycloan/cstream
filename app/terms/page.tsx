export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using CineStream, you accept and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on CineStream for personal,
                non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
              <p>
                The materials on CineStream are provided on an 'as is' basis. CineStream makes no warranties, expressed
                or implied, and hereby disclaims and negates all other warranties including without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
              <p>
                In no event shall CineStream or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on CineStream, even if CineStream or a CineStream authorized representative has
                been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at support@cinestream.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
