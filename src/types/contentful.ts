import type { Entry, EntrySkeletonType } from "contentful";

export interface ContentfulFile {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

export interface ContentfulAssetFields {
  title?: string;
  description?: string;
  file: ContentfulFile;
}

export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
  };
  fields: ContentfulAssetFields;
}

export interface CastMemberFields {
  name: string;
  hometown?: string;
  description?: string;
  contactInformation?: string;
  photo?: ContentfulAsset;
}

export interface PlayFields {
  title?: string;
  playwright?: string;
  director?: Entry<CastMemberEntry>[];
  description?: string;
  date?: string;
  cast?: Entry<CastMemberEntry>[];
  location?: string;
  youtubeUrl?: string;
  photo?: ContentfulAsset;
  backstage?: Entry<CastMemberEntry>[];
}

export interface HomePageFields {
  heroVideo?: ContentfulAsset;
}

export interface CastMemberEntry extends EntrySkeletonType {
  contentTypeId: "castMember";
  fields: CastMemberFields;
}

export interface PlayEntry extends EntrySkeletonType {
  contentTypeId: "play";
  fields: PlayFields;
}

export interface HomePageEntry extends EntrySkeletonType {
  contentTypeId: "homePage";
  fields: HomePageFields;
}

export interface ContentfulData {
  plays: Entry<PlayEntry>[];
  castMembers: Entry<CastMemberEntry>[];
  homePage: Entry<HomePageEntry> | null;
  metadata: {
    timestamp: string;
    totalPlays: number;
    totalCastMembers: number;
  };
}
