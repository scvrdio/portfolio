"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Common = {
    itemClassName?: string;
    aspectClassName?: string;
    fit?: "cover" | "contain";
    objectPosition?: "center" | "top";
};

type MediaItem =
    | (Common & {
        type: "image";
        mode?: "fill" | "static";
        width?: number;
        height?: number;
        src: string;
        alt?: string;
        priority?: boolean;
    })
    | (Common & {
        type: "video";
        src: string;
        poster?: string;
        autoPlay?: boolean;
        loop?: boolean;
        muted?: boolean;
        playsInline?: boolean;
        controls?: boolean;
        customControls?: boolean; // по умолчанию true
    });

function formatTime(sec: number) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    const m = Math.floor(sec / 60);
    return `${m}:${s}`;
}

function VideoPlayer({
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

    // 60fps обновление прогресса
    useEffect(() => {
        function update() {
            const v = videoRef.current;
            if (!v) return;

            if (!isScrubbing) {
                setCurrent(v.currentTime);
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


    // события загрузки и play/pause
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        v.addEventListener("enterpictureinpicture", (e) => {
            e.preventDefault();
        });

        const onLoaded = () => {
            setDuration(v.duration || 0);
            setIsReady(true);
            setIsPlaying(!v.paused);
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("play", onPlay);
        v.addEventListener("pause", onPause);

        if (v.readyState >= 1) onLoaded();

        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("play", onPlay);
            v.removeEventListener("pause", onPause);
        };
    }, []);

    function togglePlay() {
        const v = videoRef.current;
        if (!v) return;
        v.paused ? v.play() : v.pause();
    }

    function commitSeek(value: number) {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = value;
        setCurrent(value);
    }

    const shownValue = isScrubbing ? scrubValue : current;
    const percent =
        duration > 0 ? `${(shownValue / duration) * 100}%` : "0%";

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
            />

            <div className="mt-3 pr-5 flex items-center gap-1">
                <button
                    onClick={togglePlay}
                    disabled={!isReady}
                    className="h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-40"
                >
                    <img
                        src={isPlaying ? "/icones/pause-fill.svg" : "/icones/play-fill.svg"}
                        className="w-8 h-8"
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
                    style={{ ["--range-p" as any]: percent }}
                    className="videoRange flex-1"
                    onPointerDown={(e) => {
                        setIsScrubbing(true);
                        const el = e.currentTarget;
                        setScrubValue(el.valueAsNumber); // берем реальное значение инпута
                    }}
                    onInput={(e) => {
                        const el = e.currentTarget;
                        setScrubValue(el.valueAsNumber); // обновляем во время движения пальца
                    }}
                    onPointerUp={(e) => {
                        const el = e.currentTarget;
                        setIsScrubbing(false);
                        commitSeek(el.valueAsNumber); // коммитим из инпута, не из стейта
                    }}
                />

                <div className="text-right t-body ty-body text-[14px] pl-4 tabular-nums text-black/60">
                    {formatTime(shownValue)} / {formatTime(duration)}
                </div>
            </div>
        </div>
    );
}

export function MediaBlock({
    items,
    fullWidth = false,
}: {
    items: [MediaItem] | [MediaItem, MediaItem] | [MediaItem, MediaItem, MediaItem];
    fullWidth?: boolean;
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
                {items.map((it, idx) => {
                    const itemClassName = isSingle ? "w-full" : it.itemClassName ?? defaultItemClassName;
                    const aspectClassName = it.aspectClassName ?? "";
                    const pos = it.objectPosition === "top" ? "object-top" : "object-center";
                    const fit = it.fit === "contain" ? "object-contain" : "object-cover";

                    const isStaticImage = it.type === "image" && it.mode === "static";
                    const wrapperAspect = isStaticImage ? "" : it.aspectClassName ?? "aspect-[9/16]";

                    return (
                        <div
                            key={idx}
                            className={["relative", itemClassName, wrapperAspect, aspectClassName]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {it.type === "image" ? (
                                it.mode === "static" ? (
                                    <Image
                                        src={it.src}
                                        alt={it.alt ?? ""}
                                        width={it.width ?? 1600}
                                        height={it.height ?? 900}
                                        className="h-auto w-full"
                                        sizes="(max-width: 768px) 100vw, 900px"
                                        priority={it.priority ?? false}
                                    />
                                ) : (
                                    <Image
                                        src={it.src}
                                        alt={it.alt ?? ""}
                                        fill
                                        priority={it.priority ?? false}
                                        sizes={count === 1 && !fullWidth ? "450px" : "(max-width: 768px) 100vw, 900px"}
                                        className={`${fit} ${pos}`}
                                    />
                                )
                            ) : (it.customControls ?? true) ? (
                                <VideoPlayer
                                    src={it.src}
                                    poster={it.poster}
                                    autoPlay={it.autoPlay ?? true}
                                    loop={it.loop ?? true}
                                    muted={it.muted ?? true}
                                    playsInline={it.playsInline ?? true}
                                    className={`h-full w-full ${fit} ${pos}`}
                                />
                            ) : (
                                <video
                                    className={`h-full w-full ${fit} ${pos}`}
                                    src={it.src}
                                    poster={it.poster}
                                    autoPlay={it.autoPlay ?? true}
                                    loop={it.loop ?? true}
                                    muted={it.muted ?? true}
                                    playsInline={it.playsInline ?? true}
                                    controls
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
