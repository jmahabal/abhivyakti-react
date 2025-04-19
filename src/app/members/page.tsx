import { getAllCastMembers } from "@/lib/contentful-data";
import { Link } from "@/components/ui/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { getAssetUrl } from "@/utils/content-helpers";

export default function MembersPage() {
  const castMembers = getAllCastMembers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 md:py-16">
      <h1 className="mb-12 text-4xl text-center">Members</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {castMembers
          .sort((a, b) =>
            String(a.fields.name ?? "").localeCompare(
              String(b.fields.name ?? "")
            )
          )
          .map((member) => {
            const name = String(member.fields.name ?? "Cast Member");
            const hometown = member.fields.hometown
              ? String(member.fields.hometown)
              : undefined;
            const photoUrl = getAssetUrl(member.fields.photo);

            return (
              <Card
                key={member.sys.id}
                className="border rounded gap-4 flex flex-row items-center "
              >
                {photoUrl && (
                  <Image
                    src={`https:${photoUrl}`}
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover aspect-square"
                  />
                )}
                <div className="flex flex-col items-start gap-0">
                  <Link href={`/members/${member.sys.id}`} className="w-fit">
                    <h4 className="text-lg">{name}</h4>
                  </Link>
                  {hometown && (
                    <p className="text-sm text-muted-foreground">{hometown}</p>
                  )}
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
