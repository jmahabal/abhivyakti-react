import { getAllPlays } from "@/lib/contentful-data";
import { PlayCard } from "@/components/PlayCard";
import { notFound } from "next/navigation";

interface PlayPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;
  const plays = getAllPlays();
  const play = plays.find((p) => p.sys.id === id);

  if (!play) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-16">
      <PlayCard play={play} isDetailPage />
    </div>
  );
}
