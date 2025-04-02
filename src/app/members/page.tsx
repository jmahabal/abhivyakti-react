import { getAllCastMembers, getAllPlays } from "@/lib/contentful-data";
import { CastMemberCard } from "@/components/CastMemberCard";

export default function MembersPage() {
  const castMembers = getAllCastMembers();
  const plays = getAllPlays();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 md:py-16">
      <h1 className="mb-12 text-4xl text-center">Members</h1>
      <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4 items-center">
        {castMembers
          .sort((a, b) =>
            String(a.fields.name ?? "").localeCompare(
              String(b.fields.name ?? "")
            )
          )
          .map((member) => (
            <CastMemberCard
              key={member.sys.id}
              member={member}
              allPlays={plays}
            />
          ))}
      </div>
    </div>
  );
}
