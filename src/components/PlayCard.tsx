"use client";

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
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

interface PlayCardProps {
  play: Entry<PlayEntry>;
  isDetailPage?: boolean;
}

export function PlayCard({ play, isDetailPage = false }: PlayCardProps) {
  const photoUrl = getAssetUrl(play.fields.photo);
  const { directors, cast, backstage } = getCastAndCrew(play);
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
  const backstageMembers = (play.fields.backstage ||
    []) as Entry<CastMemberEntry>[];

  const content = (
    <>
      {photoUrl && (
        <div className="relative w-full h-min">
          {isDetailPage ? (
            <Image
              src={`https:${photoUrl}`}
              alt={title}
              fill
              priority
              className="max-w-3xl mx-auto max-h-[400px] object-cover h-min! relative!"
            />
          ) : (
            <div className="relative w-full h-[240px]">
              <Image
                src={`https:${photoUrl}`}
                alt={title}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          )}
        </div>
      )}
      <div className={cn(photoUrl ? "px-0" : "p-6", "pb-6")}>
        <CardHeader className="px-0 pt-0 mb-4">
          <Link href={`/plays/${play.sys.id}`}>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </Link>
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
        <CardContent
          className={cn(
            "space-y-8 pt-0 w-full overflow-hidden",
            photoUrl && !isDetailPage ? "px-8" : "px-0"
          )}
        >
          {description && (
            <p className="text-base text-muted-foreground whitespace-pre-wrap">
              {description}
            </p>
          )}
          {cast.length > 0 && (
            <div className="space-y-1">
              <h4 className="font-medium text-left">Cast</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                {castMembers.map((member, index) => (
                  <li
                    key={`cast-${member.sys.id}-${index}`}
                    className="text-left"
                  >
                    <Link href={`/members/${member.sys.id}`}>
                      {String(member.fields.name ?? "Cast Member")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {backstage.length > 0 && (
            <div className="space-y-1">
              <h4 className="font-medium text-left">Backstage</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                {backstageMembers.map((member, index) => (
                  <li
                    key={`backstage-${member.sys.id}-${index}`}
                    className="text-left"
                  >
                    <Link href={`/members/${member.sys.id}`}>
                      {String(member.fields.name ?? "Cast Member")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {directors.length > 0 && (
            <div className="space-y-1">
              <h4 className="font-medium text-left">Direction</h4>
              <ul className="list-none space-y-0.5">
                {directorMembers.map((member, index) => (
                  <li
                    key={`director-${member.sys.id}-${index}`}
                    className="text-left"
                  >
                    <Link href={`/members/${member.sys.id}`}>
                      {String(member.fields.name ?? "Cast Member")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>
    </>
  );

  if (isDetailPage) {
    return (
      <Card
        className={cn(
          "overflow-hidden rounded shadow-none border-none",
          photoUrl && "!py-0 !px-0"
        )}
      >
        {content}
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden border rounded shadow-none",
        photoUrl && "!py-0 !px-0"
      )}
    >
      {content}
    </Card>
  );
}
