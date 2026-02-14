import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Kinoxit</h1>
          <Link
            href="/admin"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Admin
          </Link>
        </header>

        {movies.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-4">No movies yet.</p>
            <Link
              href="/admin"
              className="inline-block px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
            >
              Add a movie (Admin)
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.slug}`}
                className="group block rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-purple-500 transition-all"
              >
                <div className="aspect-[2/3] bg-gray-700 relative">
                  {movie.posterUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                      🎬
                    </div>
                  )}
                </div>
                <div className="p-2 md:p-3">
                  <h2 className="font-medium text-sm md:text-base line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {movie.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
