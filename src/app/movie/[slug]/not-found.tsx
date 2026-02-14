import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-2">Movie not found</h1>
      <p className="text-gray-400 mb-6">The movie you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
      >
        Go home
      </Link>
    </div>
  );
}
