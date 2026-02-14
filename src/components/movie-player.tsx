"use client";

type SourceType = "mover" | "bunny";

interface MoviePlayerProps {
  sourceType: SourceType;
  videoId: string;
  title: string;
}

export function MoviePlayer({ sourceType, videoId, title }: MoviePlayerProps) {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || "";

  const getEmbedUrl = (): string => {
    if (sourceType === "bunny") {
      return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`;
    }
    if (sourceType === "mover") {
      return `https://mover.uz/video/embed/${videoId}/`;
    }
    return "";
  };

  const url = getEmbedUrl();

  if (!url) {
    return (
      <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center text-white/80">
        Video source not configured (sourceType: {sourceType})
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-xs text-white">
        {sourceType === "bunny" ? "Bunny" : "Mover"}
      </div>
    </div>
  );
}
