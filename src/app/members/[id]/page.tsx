import { getAllCastMembers, getAllPlays } from "@/lib/contentful-data";
import { CastMemberDetails } from "@/components/CastMemberDetails";
import { notFound } from "next/navigation";

interface MemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await Promise.resolve(params);
  const castMembers = getAllCastMembers();
  const plays = getAllPlays();
  const member = castMembers.find((m) => m.sys.id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-16">
      <CastMemberDetails member={member} allPlays={plays} isDetailPage />
    </div>
  );
}
