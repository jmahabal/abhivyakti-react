import type { Entry } from "contentful";
import type { CastMemberEntry } from "@/types/contentful";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";

interface CastCrewSectionProps {
  title: string;
  members: Entry<CastMemberEntry>[];
}

export function CastCrewSection({ title, members }: CastCrewSectionProps) {
  if (members.length === 0) return null;
  const shouldUseGrid = members.length > 1;

  return (
    <div className="space-y-1">
      <h4 className="font-medium text-left">{title}</h4>
      <ul className={cn(shouldUseGrid && "grid grid-cols-2 gap-x-4 gap-y-0.5")}>
        {members.map((member) => (
          <li className="text-left pl-2 -indent-2" key={member.sys.id}>
            {member.fields.name && (
              <Link href={`/members/${member.sys.id}`}>
                {String(member.fields.name)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
