import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col w-full ">
      <div className="flex flex-col text-base">
        <div className="flex flex-col bg-teal-800/20 text-white px-[60px] py-4 text-center">
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
