"use client";

import { useActionState } from "react";
import { addMovie } from "./actions";

type State = { ok: boolean; error?: string } | null;

export function AddMovieForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev: State, formData: FormData) => addMovie(formData),
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
          {state.error}
        </div>
      )}
      {state?.ok && (
        <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-sm">
          Movie added successfully.
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          placeholder="Movie title"
        />
      </div>

      <div>
        <label htmlFor="posterUrl" className="block text-sm font-medium text-gray-300 mb-1">
          Poster URL
        </label>
        <input
          id="posterUrl"
          name="posterUrl"
          type="url"
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          placeholder="https://example.com/poster.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Source *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="sourceType" value="mover" defaultChecked className="rounded" />
            <span>Mover.uz</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="sourceType" value="bunny" className="rounded" />
            <span>Bunny.net</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="videoId" className="block text-sm font-medium text-gray-300 mb-1">
          Video ID *
        </label>
        <input
          id="videoId"
          name="videoId"
          type="text"
          required
          className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          placeholder="e.g. 12345 (Mover) or video-id (Bunny)"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium transition-colors"
      >
        {isPending ? "Adding…" : "Add Movie"}
      </button>
    </form>
  );
}
