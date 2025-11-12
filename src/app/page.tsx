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

      {heroImageUrl ? (
        <section className="relative w-full aspect-[16/9] overflow-hidden rounded">
          <Image
            src={`https:${heroImageUrl}`}
            alt="Abhivyakti Hero"
            fill
            priority
            className="object-cover"
          /></section>
      ) : heroVideoUrl ? (
        <section className="relative w-full mx-auto max-w-[640px]">
          <video
            src={`https:${heroVideoUrl}`}
            autoPlay
            muted
            loop
            playsInline
          />
        </section>
      ) : null}


      <DonateSection className="mx-auto" />
    </div>
  );
}
