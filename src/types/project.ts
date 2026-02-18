import type { MediaItem } from "@/types/media";

export type Project = {
  href: string;
  title: string;
  meta: string;
  description: string;
  note: string;
  figmaHref?: string;
  media?: MediaItem[];
};

