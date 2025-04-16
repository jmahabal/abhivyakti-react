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
} from "@/utils/content-helpers";

interface CastMemberDetailsProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
}

export function CastMemberDetails({
  member,
  allPlays,
}: CastMemberDetailsProps) {
  const name = String(member.fields.name ?? "Cast Member");
  const memberPlays = getPlaysByPerson(allPlays, member.sys.id);

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold">{name}</h4>
      <ul className="space-y-2">
        {memberPlays.map((memberPlay) => {
          const playDirectors = memberPlay.fields.director as
            | Entry<CastMemberEntry>[]
            | undefined;
          const playCast = memberPlay.fields.cast as
            | Entry<CastMemberEntry>[]
            | undefined;
          const playBackstage = memberPlay.fields.backstage as
            | Entry<CastMemberEntry>[]
            | undefined;
          const isDirector =
            playDirectors?.some(
              (d: Entry<CastMemberEntry>) => d.sys.id === member.sys.id
            ) ?? false;
          const isCast =
            playCast?.some(
              (c: Entry<CastMemberEntry>) => c.sys.id === member.sys.id
            ) ?? false;
          const isBackstage =
            playBackstage?.some(
              (b: Entry<CastMemberEntry>) => b.sys.id === member.sys.id
            ) ?? false;
          const fields = memberPlay.fields as PlayFields;
          const playDate = formatDateWithOrdinal(fields.date);

          return (
            <li key={memberPlay.sys.id} className="text-sm">
              <span className="font-medium">
                {String(memberPlay.fields.title || "Untitled Play")}
              </span>
              <div className="text-muted-foreground">
                {isCast && "Cast"}
                {isCast && (isDirector || isBackstage) && " & "}
                {isDirector && "Director"}
                {isDirector && isBackstage && " & "}
                {isBackstage && "Backstage"}
                {playDate && ` • ${playDate}`}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
