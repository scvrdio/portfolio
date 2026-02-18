"use client";

import type { CSSProperties } from "react";
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
  autoPlay,
  loop,
  muted,
  playsInline,
  className,
}: {
  src: string;
  poster?: string;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);

  useEffect(() => {
    function update() {
      const video = videoRef.current;
      if (!video) return;

      if (!isScrubbing) {
        setCurrent(video.currentTime);
      }

      rafRef.current = requestAnimationFrame(update);
    }

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isScrubbing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnterPip = (event: Event) => {
      event.preventDefault();
    };

    const onLoaded = () => {
      setDuration(video.duration || 0);
      setIsReady(true);
      setIsPlaying(!video.paused);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("enterpictureinpicture", onEnterPip);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("enterpictureinpicture", onEnterPip);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  }

  function commitSeek(value: number) {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrent(value);
  }

  const shownValue = isScrubbing ? scrubValue : current;
  const percent = duration > 0 ? `${(shownValue / duration) * 100}%` : "0%";

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
      />

      <div className="mt-3 pr-5 flex items-center gap-1">
        <button
          onClick={togglePlay}
          disabled={!isReady}
          className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-40"
        >
          <Image
            src={isPlaying ? "/icones/pause-fill.svg" : "/icones/play-fill.svg"}
            className="w-8 h-8"
            width={32}
            height={32}
            alt=""
          />
        </button>

        <input
          type="range"
          min={0}
          max={Math.max(0, duration)}
          step={0.01}
          value={shownValue}
          disabled={!isReady || duration <= 0}
          style={{ "--range-p": percent } as CSSProperties}
          className="videoRange flex-1"
          onPointerDown={(event) => {
            setIsScrubbing(true);
            setScrubValue(event.currentTarget.valueAsNumber);
          }}
          onInput={(event) => {
            setScrubValue(event.currentTarget.valueAsNumber);
          }}
          onPointerUp={(event) => {
            setIsScrubbing(false);
            commitSeek(event.currentTarget.valueAsNumber);
          }}
        />

        <div className="text-right t-body ty-body text-[14px] pl-4 tabular-nums text-black/60">
          {formatTime(shownValue)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
