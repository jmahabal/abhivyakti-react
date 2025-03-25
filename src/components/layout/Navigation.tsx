"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/constants";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/abhivyakti-logo.png"
              alt="Abhivyakti Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-playfair">
              अभिव्यक्ति / Abhivyakti
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link
                href="/events"
                className={cn(
                  "transition-colors hover:text-gray-600",
                  pathname === "/events" && "font-medium text-blue-600"
                )}
              >
                Events
              </Link>
              <Link
                href="/members"
                className={cn(
                  "transition-colors hover:text-gray-600",
                  pathname === "/members" && "font-medium text-blue-600"
                )}
              >
                Members
              </Link>
              <Link
                href="/about"
                className={cn(
                  "transition-colors hover:text-gray-600",
                  pathname === "/about" && "font-medium text-blue-600"
                )}
              >
                About
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-gray-600 hover:text-gray-800"
              >
                <Mail size={20} />
              </a>
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Facebook size={20} />
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
