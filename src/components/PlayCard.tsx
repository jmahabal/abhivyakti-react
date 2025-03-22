import Image from "next/image";
import type { Entry } from "contentful";
import type {
  PlayEntry,
  CastMemberEntry,
  PlayFields,
} from "@/types/contentful";
import {
  getAssetUrl,
  getCastAndCrew,
  formatDateWithOrdinal,
} from "@/utils/content-helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserHoverDetails } from "@/components/UserHoverDetails";
import { cn } from "@/lib/utils";

interface PlayCardProps {
  play: Entry<PlayEntry>;
  allPlays: Entry<PlayEntry>[];
}

export function PlayCard({ play, allPlays }: PlayCardProps) {
  const photoUrl = getAssetUrl(play.fields.photo);
  const { directors, cast } = getCastAndCrew(play);
  const title = String(play.fields.title || "Untitled Play");
  const playwright = play.fields.playwright
    ? String(play.fields.playwright)
    : undefined;
  const description = play.fields.description
    ? String(play.fields.description)
    : undefined;
  const fields = play.fields as PlayFields;
  const date = formatDateWithOrdinal(fields.date);
  const location = play.fields.location
    ? String(play.fields.location)
    : undefined;

  const castMembers = (play.fields.cast || []) as Entry<CastMemberEntry>[];
  const directorMembers = (play.fields.director ||
    []) as Entry<CastMemberEntry>[];

  return (
    <Card
      className={cn(
        "overflow-hidden border rounded shadow-none",
        photoUrl && "!py-0 !px-0"
      )}
    >
      {photoUrl && (
        <div className="relative h-[240px] w-full">
          <Image
            src={`https:${photoUrl}`}
            alt={title}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      )}
      <div className={cn("p-6", photoUrl && "!px-0")}>
        <CardHeader className="px-0 pt-0 mb-4">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {playwright && (
            <CardDescription className="text-base">
              {playwright}
            </CardDescription>
          )}
          <div className="text-sm my-4">
            {date && <p>{date}</p>}
            {location && <p>{location}</p>}
          </div>
        </CardHeader>
        <CardContent className="space-y-8 px-0 pt-0 overflow-hidden">
          {description && (
            <p className="text-base text-muted-foreground whitespace-pre-wrap">
              {description}
            </p>
          )}
          {cast.length > 0 && (
            <div className="space-y-1">
              <h4 className="font-medium">Cast</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                {castMembers.map((member, index) => (
                  <li key={`cast-${member.sys.id}-${index}`}>
                    <HoverCard openDelay={150} closeDelay={150}>
                      <HoverCardTrigger asChild>
                        <button className="text-sm hover:text-primary cursor-pointer">
                          {String(member.fields.name)}
                        </button>
                      </HoverCardTrigger>
                      <UserHoverDetails
                        userId={member.sys.id}
                        allPlays={allPlays}
                      />
                    </HoverCard>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {directors.length > 0 && (
            <div className="space-y-1">
              <h4 className="font-medium">Direction</h4>
              <ul className="list-none space-y-0.5">
                {directorMembers.map((member, index) => (
                  <li key={`director-${member.sys.id}-${index}`}>
                    <HoverCard openDelay={150} closeDelay={150}>
                      <HoverCardTrigger asChild>
                        <button className="text-sm hover:text-primary cursor-pointer">
                          {String(member.fields.name)}
                        </button>
                      </HoverCardTrigger>
                      <UserHoverDetails
                        userId={member.sys.id}
                        allPlays={allPlays}
                      />
                    </HoverCard>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
