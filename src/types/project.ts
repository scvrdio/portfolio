import type { MediaItem } from "@/types/media";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  href: string;
  title: string;
  meta: string;
  description: string;
  note: string;
  metrics?: ProjectMetric[];
  figmaHref?: string;
  media?: MediaItem[];
};

