import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DonateSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <p className="mb-4 text-md text-gray-600">
        Abhivyakti is a 501(c)(3) tax-exempt non-profit organization.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
      >
        <Link
          href="https://bit.ly/abhivyakti-donation"
          target="_blank"
          rel="noopener noreferrer"
        >
          Support Our Mission
        </Link>
      </Button>
    </div>
  );
};
