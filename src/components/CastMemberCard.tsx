import type { Entry } from "contentful";
import type { CastMemberEntry, PlayEntry } from "@/types/contentful";
import { getAssetUrl } from "@/utils/content-helpers";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserHoverDetails } from "@/components/UserHoverDetails";

interface CastMemberCardProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
}

export function CastMemberCard({ member, allPlays }: CastMemberCardProps) {
  const photoUrl = getAssetUrl(member.fields.photo);
  const name = String(member.fields.name ?? "Cast Member");
  const hometown = member.fields.hometown
    ? String(member.fields.hometown)
    : undefined;
  const description = member.fields.description
    ? String(member.fields.description)
    : undefined;

  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center space-y-4 cursor-pointer hover:opacity-90">
          {photoUrl && (
            <div className="relative h-40 w-40 overflow-hidden rounded-full">
              <img
                src={`https:${photoUrl}`}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="text-center">
            <h3 className="text-xl font-semibold hover:text-primary">{name}</h3>
            {hometown && (
              <p className="text-sm text-muted-foreground">{hometown}</p>
            )}
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      <UserHoverDetails userId={member.sys.id} allPlays={allPlays} />
    </HoverCard>
  );
}
