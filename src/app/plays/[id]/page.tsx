import { getAllPlays } from "@/lib/contentful-data";
import { PlayCard } from "@/components/PlayCard";
import { notFound } from "next/navigation";

interface PlayPageProps {
  params: {
    id: string;
  };
}

export default function PlayPage({ params }: PlayPageProps) {
  const plays = getAllPlays();
  const play = plays.find((p) => p.sys.id === params.id);

  if (!play) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-16">
      <PlayCard play={play} allPlays={plays} isDetailPage />
    </div>
  );
}
