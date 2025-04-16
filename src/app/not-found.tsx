import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-arbutus-slab">404</h1>
          <div className="space-y-2">
            <p className="text-2xl">Page Not Found</p>
            <p className="text-muted-foreground">
              This scene is missing. Let’s find your next entrance!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
