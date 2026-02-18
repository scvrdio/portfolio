"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const seconds = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(sec / 60);
  return `${minutes}:${seconds}`;
}

export function VideoPlayer({
  src,
  poster,
  playbackRate = 1,
  segmentDuration = 2,
  showSegmentControls = true,
  autoPlay,
  loop,
  muted,
  playsInline,
  className,
}: {
  src: string;
  poster?: string;
  playbackRate?: number;
  segmentDuration?: number;
  showSegmentControls?: boolean;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  playsInline: boolean;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function update() {
      const video = videoRef.current;
      if (!video) return;
      setCurrent(video.currentTime);

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnterPip = (event: Event) => {
      event.preventDefault();
    };

    const onLoaded = () => {
      setDuration(video.duration || 0);
      setIsReady(true);
    };

    video.addEventListener("enterpictureinpicture", onEnterPip);
    video.addEventListener("loadedmetadata", onLoaded);

    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("enterpictureinpicture", onEnterPip);
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const safeRate = Number.isFinite(playbackRate) ? playbackRate : 1;
    video.playbackRate = safeRate;
  }, [playbackRate]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  }

  function seekToSegment(index: number) {
    const video = videoRef.current;
    if (!video || duration <= 0) return;

    const segmentStart = Math.min(index * safeSegmentDuration, Math.max(duration - 0.01, 0));
    video.currentTime = segmentStart;
    setCurrent(segmentStart);
  }

  function seekPrevSegment() {
    if (duration <= 0) return;
    const currentSegmentIndex = Math.floor(current / safeSegmentDuration);
    seekToSegment(Math.max(0, currentSegmentIndex - 1));
  }

  function seekNextSegment() {
    if (duration <= 0) return;
    const currentSegmentIndex = Math.floor(current / safeSegmentDuration);
    seekToSegment(Math.min(totalSegments - 1, currentSegmentIndex + 1));
  }

  const safeSegmentDuration =
    Number.isFinite(segmentDuration) && segmentDuration > 0 ? segmentDuration : 2;
  const totalSegments = duration > 0 ? Math.ceil(duration / safeSegmentDuration) : 0;
  const renderedSegments = Math.max(totalSegments, 1);
  const canSeek = isReady && duration > 0;

  return (
    <div className="flex flex-col">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload="metadata"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className={className}
        onClick={togglePlay}
      />

      {showSegmentControls ? (
        <div className="mt-3 pr-5 flex items-center gap-1">
          <button
            type="button"
            onClick={seekPrevSegment}
            disabled={!canSeek}
            className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-40"
            aria-label="Previous segment"
          >
            <Image
              src="/icones/rewind-fill.svg"
              className="w-8 h-8"
              width={32}
              height={32}
              alt=""
            />
          </button>

          <div className="videoRangeWrap flex-1">
            <div className="videoRangeTrack">
              {Array.from({ length: renderedSegments }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className="videoRangeSegment"
                  onClick={() => seekToSegment(index)}
                  disabled={!canSeek || index >= totalSegments}
                  aria-label={`Seek to ${formatTime(index * safeSegmentDuration)}`}
                >
                  {(() => {
                    const segmentStart = index * safeSegmentDuration;
                    const segmentLength = Math.max(
                      0.0001,
                      Math.min(safeSegmentDuration, Math.max(duration - segmentStart, 0)),
                    );
                    const fillPercent = Math.max(
                      0,
                      Math.min(100, ((current - segmentStart) / segmentLength) * 100),
                    );

                    return (
                      <div
                        className="videoRangeSegmentFill"
                        style={{ width: `${fillPercent}%` }}
                      />
                    );
                  })()}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={seekNextSegment}
            disabled={!canSeek}
            className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-40"
            aria-label="Next segment"
          >
            <Image
              src="/icones/forward-fill.svg"
              className="w-8 h-8"
              width={32}
              height={32}
              alt=""
            />
          </button>
        </div>
      ) : null}
    </div>
  );
}
