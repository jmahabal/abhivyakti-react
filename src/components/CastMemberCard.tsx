import type { Entry } from "contentful";
import type { CastMemberEntry, PlayEntry } from "@/types/contentful";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { UserHoverDetails } from "@/components/UserHoverDetails";

interface CastMemberCardProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
}

export function CastMemberCard({ member, allPlays }: CastMemberCardProps) {
  const name = String(member.fields.name ?? "Cast Member");

  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <div className="text-center cursor-pointer">
          <h3 className="text-xl hover:text-primary">{name}</h3>
        </div>
      </HoverCardTrigger>
      <UserHoverDetails userId={member.sys.id} allPlays={allPlays} />
    </HoverCard>
  );
}
