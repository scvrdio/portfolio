import type { MediaItem } from "@/components/ui/MediaBlock";

export type Project = {
  href: string;
  title: string;
  meta: string;
  description: string;
  note: string;
  figmaHref?: string;
  media?: MediaItem[];
};
