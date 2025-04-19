import NextLink from "next/link";
import { cn } from "@/lib/utils";

export function Link({
  className,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  return <NextLink className={cn("hover:underline", className)} {...props} />;
}
