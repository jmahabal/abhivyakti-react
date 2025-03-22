import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col w-full border-t">
      <div className="flex flex-col text-base py-4">
        <div className="flex flex-col border border-border rounded-lg px-[60px] py-5 text-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-2">
            <Mail className="h-2 w-2 text-muted-foreground" />
          </div>
          <a
            href="mailto:abhivyaktila@gmail.com"
            className="text-foreground no-underline"
          >
            abhivyaktila@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <p className="text-xxs text-muted-foreground/80">
          made with love in pasadena, ca
        </p>
      </div>
    </footer>
  );
}
