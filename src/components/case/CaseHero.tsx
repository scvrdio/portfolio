import Image from "next/image";

export function CaseHero(props: { src: string; alt?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-neutral-100">
      <Image
        src={props.src}
        alt={props.alt ?? ""}
        width={1400}
        height={900}
        className="h-auto w-full"
        priority
      />
    </div>
  );
}
