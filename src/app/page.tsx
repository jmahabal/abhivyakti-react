import { getHomePage } from "@/lib/contentful-data";
import { getAssetUrl } from "@/utils/content-helpers";
import Image from "next/image";

export default function HomePage() {
  const homePage = getHomePage();
  const heroVideoUrl = getAssetUrl(homePage?.fields.heroVideo);
  const heroImageUrl = getAssetUrl(homePage?.fields.homepageHeroImage);

  return (
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
                  <p>Los Angeles&apos; premier Marathi theater group</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
