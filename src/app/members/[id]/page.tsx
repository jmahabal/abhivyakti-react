import { getAllCastMembers, getAllPlays } from "@/lib/contentful-data";
import { CastMemberDetails } from "@/components/CastMemberDetails";
import { notFound } from "next/navigation";

interface MemberPageProps {
  params: {
    id: string;
  };
}

export default function MemberPage({ params }: MemberPageProps) {
  const castMembers = getAllCastMembers();
  const plays = getAllPlays();
  const member = castMembers.find((m) => m.sys.id === params.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 md:py-16">
      <CastMemberDetails member={member} allPlays={plays} isDetailPage />
    </div>
  );
}
