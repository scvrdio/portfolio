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
        controls?: boolean;
        playsInline?: boolean;
    });

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

    const defaultItemClassName = count === 1 ? "w-full" : count === 2 ? "basis-1/2" : "basis-1/3";

    return (
        <div className="flex w-full justify-center">
            <div className={wrapperClassName}>
                {items.map((it, idx) => {
                    const itemClassName = isSingle ? "w-full" : it.itemClassName ?? defaultItemClassName;

                    // дефолт оставляем портретный, чтобы телефоны не ломались
                    const aspectClassName = it.aspectClassName ?? "";

                    const pos = it.objectPosition === "top" ? "object-top" : "object-center";
                    const fit = it.fit === "contain" ? "object-contain" : "object-cover";

                    const isStaticImage = it.type === "image" && it.mode === "static";
                    const wrapperAspect = isStaticImage ? "" : (it.aspectClassName ?? "aspect-[9/16]");


                    return (
                        <div key={idx} className={["relative", itemClassName, wrapperAspect, aspectClassName].filter(Boolean).join(" ")}>
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
                                        sizes={
                                            count === 1 && !fullWidth
                                                ? "450px"
                                                : "(max-width: 768px) 100vw, 900px"
                                        }
                                        className={`${fit} ${pos}`}
                                    />
                                )
                            ) : (
                                <video
                                    className={`h-full w-full ${fit} ${pos}`}
                                    src={it.src}
                                    poster={it.poster}
                                    autoPlay={it.autoPlay ?? true}
                                    loop={it.loop ?? true}
                                    muted={it.muted ?? true}
                                    controls={it.controls ?? false}
                                    playsInline={it.playsInline ?? true}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
