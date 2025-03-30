import { getHomePage } from "@/lib/contentful-data";
import { getAssetUrl } from "@/utils/content-helpers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const homePage = getHomePage();
  const heroVideoUrl = getAssetUrl(homePage?.fields.heroVideo);
  const heroImageUrl = getAssetUrl(homePage?.fields.homepageHeroImage);

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8 px-4">
      <div className="mx-auto max-w-5xl space-y-1 text-lg text-center">
        <p>
          Abhivyakti is Los Angeles&apos; premier Marathi theater group,
          dedicated to bringing powerful performances and storytelling to
          the stage. Our mission is to preserve and promote Marathi
          culture and theatrical arts in Southern California.
        </p>
        </div>
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

      {/* Content Section */}
      <div className="mx-auto max-w-5xl space-y-1 text-lg text-center">    
        <div className="mt-2">
          <p className="mb-2 text-sm text-gray-600">
            Abhivyakti is a 501(c)(3) tax-exempt non-profit organization.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          >
            <Link href="https://bit.ly/abhivyakti-donation" target="_blank" rel="noopener noreferrer">
              Support Our Mission
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
