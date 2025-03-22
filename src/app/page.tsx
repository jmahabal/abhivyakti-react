import {
  getHomePage,
  getAllPlays,
  getAllCastMembers,
} from "@/lib/contentful-data";
import { PlayCard } from "@/components/PlayCard";
import { CastMemberCard } from "@/components/CastMemberCard";
import { Footer } from "@/components/layout/Footer";
import { getAssetUrl } from "@/utils/content-helpers";

export default function HomePage() {
  const homePage = getHomePage();
  const plays = getAllPlays();
  const castMembers = getAllCastMembers();
  const heroVideoUrl = getAssetUrl(homePage?.fields.heroVideo);

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-16 py-8 px-4">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded">
          {heroVideoUrl && (
            <video
              src={`https:${heroVideoUrl}`}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0">
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-white">
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                  Abhivyakti / अभिव्यक्ती
                </h1>
                <p>Los Angeles’ premier Marathi theater group</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Productions Section */}
        <section className="text-center">
          <h2 className="mb-8 text-3xl font-bold">Latest Productions</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plays.slice(0, 3).map((play) => (
              <PlayCard key={play.sys.id} play={play} allPlays={plays} />
            ))}
          </div>
        </section>

        {/* All Productions Section */}
        <section className="py-16 -mx-4 px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-8 text-3xl font-bold">All Productions</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plays.map((play) => (
                <PlayCard key={play.sys.id} play={play} allPlays={plays} />
              ))}
            </div>
          </div>
        </section>

        {/* Cast & Crew Section */}
        <section className="text-center">
          <h2 className="mb-8 text-3xl font-bold">Cast & Crew</h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {castMembers
              .sort((a, b) =>
                String(a.fields.name ?? "").localeCompare(
                  String(b.fields.name ?? "")
                )
              )
              .map((member) => (
                <CastMemberCard
                  key={member.sys.id}
                  member={member}
                  allPlays={plays}
                />
              ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
