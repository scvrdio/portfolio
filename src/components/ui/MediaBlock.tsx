import Image from "next/image";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import type { MediaItem } from "@/types/media";

export function MediaBlock({
  items,
  fullWidth = false,
  defaultVideoPlaybackRate = 0.5,
  showSegmentControls = true,
}: {
  items: MediaItem[];
  fullWidth?: boolean;
  defaultVideoPlaybackRate?: number;
  showSegmentControls?: boolean;
}) {
  const count = items.length;
  const isSingle = count === 1;

  const wrapperClassName =
    count === 1 && !fullWidth
      ? "w-full max-w-[450px] overflow-hidden"
      : "flex w-full overflow-hidden";

  const defaultItemClassName =
    count === 1 ? "w-full" : count === 2 ? "basis-1/2" : "basis-1/3";

  return (
    <div className="flex w-full justify-center py-8">
      <div className={wrapperClassName}>
        {items.map((item, idx) => {
          const itemClassName =
            isSingle ? "w-full" : item.itemClassName ?? defaultItemClassName;
          const aspectClassName = item.aspectClassName ?? "";
          const positionClassName =
            item.objectPosition === "top" ? "object-top" : "object-center";
          const fitClassName =
            item.fit === "contain" ? "object-contain" : "object-cover";

          const isStaticImage = item.type === "image" && item.mode === "static";
          const wrapperAspectClassName = isStaticImage
            ? ""
            : item.aspectClassName ?? "aspect-[9/16]";

          return (
            <div
              key={idx}
              className={[
                "relative",
                itemClassName,
                wrapperAspectClassName,
                aspectClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.type === "image" ? (
                item.mode === "static" ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    width={item.width ?? 1600}
                    height={item.height ?? 900}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority={item.priority ?? false}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ""}
                    fill
                    priority={item.priority ?? false}
                    sizes={
                      count === 1 && !fullWidth
                        ? "450px"
                        : "(max-width: 768px) 100vw, 900px"
                    }
                    className={`${fitClassName} ${positionClassName}`}
                  />
                )
              ) : (item.customControls ?? true) ? (
                <VideoPlayer
                  src={item.src}
                  poster={item.poster}
                  playbackRate={item.playbackRate ?? defaultVideoPlaybackRate}
                  segmentDuration={item.segmentDuration}
                  showSegmentControls={showSegmentControls}
                  autoPlay={item.autoPlay ?? true}
                  loop={item.loop ?? true}
                  muted={item.muted ?? true}
                  playsInline={item.playsInline ?? true}
                  className={`h-full w-full ${fitClassName} ${positionClassName}`}
                />
              ) : (
                <video
                  className={`h-full w-full ${fitClassName} ${positionClassName}`}
                  src={item.src}
                  poster={item.poster}
                  autoPlay={item.autoPlay ?? true}
                  loop={item.loop ?? true}
                  muted={item.muted ?? true}
                  playsInline={item.playsInline ?? true}
                  controls={item.controls ?? true}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
