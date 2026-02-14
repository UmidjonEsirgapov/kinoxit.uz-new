import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MoviePlayer } from "@/components/movie-player";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const movie = await prisma.movie.findUnique({ where: { slug } });
  if (!movie) return { title: "Not Found" };
  return { title: `${movie.title} - Kinoxit` };
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;
  const movie = await prisma.movie.findUnique({ where: { slug } });

  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6"
        >
          ← Back
        </Link>

        <div className="mb-6">
          <MoviePlayer
            sourceType={movie.sourceType as "mover" | "bunny"}
            videoId={movie.videoId}
            title={movie.title}
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-400 text-sm">
          Source: {movie.sourceType} · ID: {movie.videoId}
        </p>
      </div>
    </div>
  );
}
