import { format } from "date-fns";
import type { Entry } from "contentful";
import type { PlayEntry, CastMemberEntry } from "@/types/contentful";

export const getAssetUrl = (asset?: {
  fields?: { file?: { url?: string } };
}) => {
  return asset?.fields?.file?.url;
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  try {
    return format(new Date(dateString), "MMMM d, yyyy");
  } catch {
    return dateString;
  }
};

export const getPlaysByPerson = (
  plays: Entry<PlayEntry>[],
  memberId: string
) => {
  return plays.filter((play) => {
    const castMembers = play.fields.cast as
      | Entry<CastMemberEntry>[]
      | undefined;
    const directors = play.fields.director as
      | Entry<CastMemberEntry>[]
      | undefined;

    const inCast =
      castMembers?.some((actor) => actor.sys.id === memberId) ?? false;
    const inDirectors =
      directors?.some((director) => director.sys.id === memberId) ?? false;

    return inCast || inDirectors;
  });
};

export const getCastAndCrew = (play: Entry<PlayEntry>) => {
  const directorEntries = play.fields.director as
    | Entry<CastMemberEntry>[]
    | undefined;
  const castEntries = play.fields.cast as Entry<CastMemberEntry>[] | undefined;

  const directors =
    directorEntries
      ?.map((d: Entry<CastMemberEntry>) => d.fields.name)
      .filter(
        (name: string | undefined): name is string => typeof name === "string"
      ) ?? [];

  const cast =
    castEntries
      ?.map((c: Entry<CastMemberEntry>) => c.fields.name)
      .filter(
        (name: string | undefined): name is string => typeof name === "string"
      ) ?? [];

  return {
    directors,
    cast,
  };
};
