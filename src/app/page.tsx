import { getHomePage } from "@/lib/contentful-data";
import { getAssetUrl } from "@/utils/content-helpers";

import Image from "next/image";
import { DonateSection } from "@/components/DonateSection";

export default function HomePage() {
  const homePage = getHomePage();
  const heroVideoUrl = getAssetUrl(homePage?.fields.heroVideo);
  const heroImageUrl = getAssetUrl(homePage?.fields.homepageHeroImage);

  return (
    <div className="mx-auto max-w-[920px] space-y-10 py-24 md:py-16 px-4 flex flex-col items-start text-center ">
      <p className="max-w-[65ch] mx-auto text-lg">
        Abhivyakti is Los Angeles’ premier Marathi theater group, dedicated to
        bringing powerful performances and storytelling to the stage. Our
        mission is to preserve and promote Marathi culture and theatrical arts
        in Southern California.
      </p>

      {/* Hero Section */}
      <section className="relative w-full aspect-[16/9] overflow-hidden rounded">
        {heroImageUrl ? (
          <Image
            src={`https:${heroImageUrl}`}
            alt="Abhivyakti Hero"
            fill
            priority
            className="object-cover"
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
                  <h1 className="mb-4 text-4xl font-arbutus-slab md:text-6xl">
                    अभिव्यक्ती / Abhivyakti
                  </h1>
                  <p>Los Angeles&apos; premier Marathi theater group</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </section>

      <DonateSection className="mx-auto" />
    </div>
  );
}
