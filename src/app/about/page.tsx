import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

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
              <div className="mt-12">
                <p className="mb-4 text-sm text-gray-600">
                  Abhivyakti is a 501(c)(3) tax-exempt non-profit organization.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                >
                  <Link href="/donate">Support Our Mission</Link>
                </Button>
              </div>
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
