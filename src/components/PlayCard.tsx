import Image from "next/image";
import type { Entry } from "contentful";
import type {
  PlayEntry,
  CastMemberEntry,
  PlayFields,
} from "@/types/contentful";
import { getAssetUrl, getCastAndCrew } from "@/utils/content-helpers";
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
  const date =
    typeof fields.date === "string"
      ? new Date(fields.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : null;
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
        photoUrl && "!py-0"
      )}
    >
      {photoUrl && (
        <div className="relative max-h-[300px] overflow-hidden">
          <Image
            src={`https:${photoUrl}`}
            alt={title}
            width={800}
            height={600}
            className="w-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <CardHeader className="space-y-2 px-0 pt-0">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {playwright && (
            <CardDescription className="text-base">
              {playwright}
            </CardDescription>
          )}
          <div className="text-sm mb-4">
            {date && <p>{date}</p>}
            {location && <p>{location}</p>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pt-0">
          {description && (
            <p className="text-base text-muted-foreground">{description}</p>
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
