import type { Entry } from "contentful";
import type {
  CastMemberEntry,
  PlayEntry,
  PlayFields,
} from "@/types/contentful";
import { HoverCardContent } from "@/components/ui/hover-card";
import { getPlaysByPerson } from "@/utils/content-helpers";

interface UserHoverDetailsProps {
  userId: string;
  allPlays: Entry<PlayEntry>[];
}

export function UserHoverDetails({ userId, allPlays }: UserHoverDetailsProps) {
  // Find the user from any play's cast or director list
  const member = allPlays
    .flatMap((play) => [
      ...((play.fields.cast || []) as Entry<CastMemberEntry>[]),
      ...((play.fields.director || []) as Entry<CastMemberEntry>[]),
    ])
    .find((person) => person.sys.id === userId);

  if (!member) return null;

  const memberPlays = getPlaysByPerson(allPlays, userId);

  return (
    <HoverCardContent align="start" className="w-80">
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold">
            {String(member.fields.name)}
          </h4>
          {member.fields.hometown && (
            <p className="text-sm text-muted-foreground">
              {String(member.fields.hometown)}
            </p>
          )}
          {member.fields.description && (
            <p className="mt-2 text-sm">{String(member.fields.description)}</p>
          )}
        </div>
        <div>
          <h5 className="font-medium mb-2">Productions</h5>
          <ul className="space-y-2">
            {memberPlays.map((memberPlay) => {
              const playDirectors = memberPlay.fields.director as
                | Entry<CastMemberEntry>[]
                | undefined;
              const playCast = memberPlay.fields.cast as
                | Entry<CastMemberEntry>[]
                | undefined;
              const isDirector =
                playDirectors?.some(
                  (d: Entry<CastMemberEntry>) => d.sys.id === userId
                ) ?? false;
              const isCast =
                playCast?.some(
                  (c: Entry<CastMemberEntry>) => c.sys.id === userId
                ) ?? false;
              const fields = memberPlay.fields as PlayFields;
              const playDate =
                typeof fields.date === "string"
                  ? new Date(fields.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : null;

              return (
                <li key={memberPlay.sys.id} className="text-sm">
                  <div>
                    <span className="font-medium">
                      {String(memberPlay.fields.title || "Untitled Play")}
                    </span>
                    <div className="text-muted-foreground">
                      {isCast && "Cast"}
                      {isCast && isDirector && " & "}
                      {isDirector && "Director"}
                      {playDate && ` • ${playDate}`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </HoverCardContent>
  );
}
