export type MediaCommon = {
  itemClassName?: string;
  aspectClassName?: string;
  fit?: "cover" | "contain";
  objectPosition?: "center" | "top";
};

export type ImageMediaItem = MediaCommon & {
  type: "image";
  mode?: "fill" | "static";
  width?: number;
  height?: number;
  src: string;
  alt?: string;
  priority?: boolean;
};

export type VideoMediaItem = MediaCommon & {
  type: "video";
  src: string;
  poster?: string;
  playbackRate?: number;
  segmentDuration?: number;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  customControls?: boolean;
};

export type MediaItem = ImageMediaItem | VideoMediaItem;
