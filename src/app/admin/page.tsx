import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth-basic";
import { AddMovieForm } from "./add-movie-form";
import Link from "next/link";

export default async function AdminPage() {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Add Movie</h1>
          <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">
            ← Home
          </Link>
          <Link href="/admin/logout" className="text-sm text-gray-400 hover:text-white">
            Sign out
          </Link>
          </div>
        </div>
        <AddMovieForm />
      </div>
    </div>
  );
}
