"use client";

import type { Entry } from "contentful";
import type {
  CastMemberEntry,
  PlayEntry,
  PlayFields,
} from "@/types/contentful";
import {
  getPlaysByPerson,
  formatDateWithOrdinal,
  getAssetUrl,
} from "@/utils/content-helpers";
import { cn } from "@/lib/utils";
import { Link } from "@/components/ui/link";
import Image from "next/image";

interface CastMemberDetailsProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
  isDetailPage?: boolean;
}

export function CastMemberDetails({
  member,
  allPlays,
  isDetailPage = false,
}: CastMemberDetailsProps) {
  const name = String(member.fields.name ?? "Cast Member");
  const memberPlays = getPlaysByPerson(allPlays, member.sys.id);
  const photoUrl = getAssetUrl(member.fields.photo);
  const hometown = member.fields.hometown
    ? String(member.fields.hometown)
    : undefined;

  // Group plays by role
  const playsByRole = memberPlays.reduce(
    (acc, play) => {
      const playDirectors = play.fields.director as
        | Entry<CastMemberEntry>[]
        | undefined;
      const playCast = play.fields.cast as Entry<CastMemberEntry>[] | undefined;
      const playBackstage = play.fields.backstage as
        | Entry<CastMemberEntry>[]
        | undefined;

      const isDirector =
        playDirectors?.some((d) => d.sys.id === member.sys.id) ?? false;
      const isCast = playCast?.some((c) => c.sys.id === member.sys.id) ?? false;
      const isBackstage =
        playBackstage?.some((b) => b.sys.id === member.sys.id) ?? false;

      if (isDirector) acc["director"].push(play);
      if (isCast) acc["cast"].push(play);
      if (isBackstage) acc["backstage"].push(play);

      return acc;
    },
    { director: [], cast: [], backstage: [] } as {
      director: Entry<PlayEntry>[];
      cast: Entry<PlayEntry>[];
      backstage: Entry<PlayEntry>[];
    }
  );

  // Sort each group by date in reverse chronological order
  const sortByDate = (a: Entry<PlayEntry>, b: Entry<PlayEntry>) => {
    const dateA = (a.fields as PlayFields).date
      ? new Date(String((a.fields as PlayFields).date))
      : new Date(0);
    const dateB = (b.fields as PlayFields).date
      ? new Date(String((b.fields as PlayFields).date))
      : new Date(0);
    return dateB.getTime() - dateA.getTime();
  };

  playsByRole["director"].sort(sortByDate);
  playsByRole["cast"].sort(sortByDate);
  playsByRole["backstage"].sort(sortByDate);

  const renderPlayList = (plays: Entry<PlayEntry>[], role: string) => {
    if (plays.length === 0) return null;

    return (
      <div className="text-left">
        <h5 className="text-lg font-semibold mb-3">{role}</h5>
        <ul className="space-y-4">
          {plays.map((play) => {
            const fields = play.fields as PlayFields;
            const playDate = formatDateWithOrdinal(fields.date);

            return (
              <li key={play.sys.id} className="text-sm">
                {play.fields.title && (
                  <Link href={`/plays/${play.sys.id}`} className="text-lg">
                    {String(play.fields.title)}
                  </Link>
                )}
                {playDate && (
                  <div className="text-muted-foreground">{playDate}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", isDetailPage && "text-center")}>
      {photoUrl && (
        <div className="relative w-[200px] h-[200px] mx-auto mb-6">
          <Image
            src={`https:${photoUrl}`}
            alt={name}
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
      )}
      <div>
        <h4 className="text-lg font-semibold mb-1">{name}</h4>
        {hometown && <p className="text-muted-foreground">{hometown}</p>}
      </div>

      <div className="space-y-16">
        {renderPlayList(playsByRole["director"], "Director")}
        {renderPlayList(playsByRole["cast"], "Cast")}
        {renderPlayList(playsByRole["backstage"], "Backstage")}
      </div>
    </div>
  );
}
