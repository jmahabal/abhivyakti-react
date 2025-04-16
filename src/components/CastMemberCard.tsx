"use client";

import type { Entry } from "contentful";
import type { CastMemberEntry, PlayEntry } from "@/types/contentful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CastMemberDetails } from "@/components/CastMemberDetails";

interface CastMemberCardProps {
  member: Entry<CastMemberEntry>;
  allPlays: Entry<PlayEntry>[];
}

export function CastMemberCard({ member, allPlays }: CastMemberCardProps) {
  const name = String(member.fields.name ?? "Cast Member");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="text-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <h3 className="text-xl">{name}</h3>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[400px] overflow-y-auto">
        <CastMemberDetails member={member} allPlays={allPlays} />
      </PopoverContent>
    </Popover>
  );
}
