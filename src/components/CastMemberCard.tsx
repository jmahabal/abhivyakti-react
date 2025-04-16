"use client";

import Link from "next/link";
import type { Entry } from "contentful";
import type { CastMemberEntry, PlayEntry } from "@/types/contentful";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CastMemberDetails } from "./CastMemberDetails";

interface CastMemberCardProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
  isDetailPage?: boolean;
}

export function CastMemberCard({
  member,
  allPlays,
  isDetailPage = false,
}: CastMemberCardProps) {
  const name = String(member.fields.name ?? "Cast Member");

  const content = <CastMemberDetails member={member} allPlays={allPlays} />;

  if (isDetailPage) {
    return <span>{name}</span>;
  }

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={`/members/${member.sys.id}`}
          className="text-center cursor-pointer"
        >
          {name}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">{content}</HoverCardContent>
    </HoverCard>
  );
}
