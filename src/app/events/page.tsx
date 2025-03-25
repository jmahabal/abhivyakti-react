import { getAllPlays } from "@/lib/contentful-data";
import { PlayCard } from "@/components/PlayCard";

export default function EventsPage() {
  const plays = getAllPlays();

  return (
    <div className="mx-auto max-w-7xl space-y-16 py-8 px-4">
      <section className="py-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-12 text-4xl">Events</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plays.map((play) => (
              <PlayCard key={play.sys.id} play={play} allPlays={plays} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
