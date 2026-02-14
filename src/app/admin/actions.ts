"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export type SourceType = "mover" | "bunny";

export async function addMovie(formData: FormData) {
  const title = formData.get("title") as string;
  const posterUrl = (formData.get("posterUrl") as string) || null;
  const sourceType = (formData.get("sourceType") as SourceType) || "mover";
  const videoId = formData.get("videoId") as string;

  if (!title?.trim() || !videoId?.trim()) {
    return { ok: false, error: "Title and Video ID are required." };
  }
  if (sourceType !== "mover" && sourceType !== "bunny") {
    return { ok: false, error: "Source must be mover or bunny." };
  }

  const slug = slugify(title);
  if (!slug) return { ok: false, error: "Title must contain at least one letter or number." };

  try {
    await prisma.movie.create({
      data: {
        title: title.trim(),
        slug,
        posterUrl: posterUrl?.trim() || null,
        sourceType,
        videoId: videoId.trim(),
      },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "P2002") {
      return { ok: false, error: "A movie with this slug already exists. Change the title." };
    }
    return { ok: false, error: err instanceof Error ? err.message : "Failed to add movie." };
  }
}
