import { Footer } from "@/components/layout/Footer";
import { Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { DonateSection } from "@/components/DonateSection";

export default function AboutPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto w-full max-w-7xl flex-grow px-4 py-8">
        <section className="py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-4xl">About Abhivyakti</h1>
            <div className="space-y-6 text-lg">
              <p>
                Abhivyakti is Los Angeles&apos; premier Marathi theater group,
                dedicated to bringing powerful performances and storytelling to
                the stage. Our mission is to preserve and promote Marathi
                culture and theatrical arts in Southern California.
              </p>
              <p>
                Founded with a passion for authentic storytelling, we bring
                together talented artists from the Marathi-speaking community to
                create compelling theatrical experiences that resonate with
                audiences of all backgrounds.
              </p>
              <DonateSection className="mt-12" />
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl">Email us</h2>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-600" />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
