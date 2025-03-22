import {
  getHomePage,
  getAllPlays,
  getAllCastMembers,
} from "@/lib/contentful-data";
import { PlayCard } from "@/components/PlayCard";
import { CastMemberCard } from "@/components/CastMemberCard";
import { Footer } from "@/components/layout/Footer";
import { getAssetUrl } from "@/utils/content-helpers";
import Image from "next/image";

export default function HomePage() {
  const homePage = getHomePage();
  const plays = getAllPlays();
  const castMembers = getAllCastMembers();

  const heroVideoUrl = getAssetUrl(homePage?.fields.heroVideo);
  const heroImageUrl = getAssetUrl(homePage?.fields.homepageHeroImage);

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-16 py-8 px-4">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded">
          {heroImageUrl ? (
            <Image
              src={`https:${heroImageUrl}`}
              alt="Abhivyakti Hero"
              fill
              className="absolute inset-0 h-full w-full object-contain"
              priority
            />
          ) : heroVideoUrl ? (
            <>
              <video
                src={`https:${heroVideoUrl}`}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/65">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="mb-4 text-4xl font-playfair md:text-6xl">
                      अभिव्यक्ती / Abhivyakti
                    </h1>
                    <p>Los Angeles’ premier Marathi theater group</p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </section>

        {/* Productions Section */}
        <section className="py-16 -mx-4 px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-12 text-3xl font-playfair">Productions</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plays.map((play) => (
                <PlayCard key={play.sys.id} play={play} allPlays={plays} />
              ))}
            </div>
          </div>
        </section>

        {/* Cast & Crew Section */}
        <section className="text-center py-8">
          <h2 className="mb-12 text-3xl font-playfair">Cast & Crew</h2>
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4 items-center">
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
