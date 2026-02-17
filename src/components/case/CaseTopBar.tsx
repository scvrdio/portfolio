import Link from "next/link";

export function CaseTopBar(props: {
  title: string;
  backHref?: string;
  figmaHref?: string;
}) {
  const backHref = props.backHref ?? "/";

  return (
    <div className="flex items-center justify-between gap-4">
      <Link href={backHref} className="t-title hover:underline">
        ← <span className="t-title">{props.title}</span>
      </Link>

      {props.figmaHref ? (
        <a
          href={props.figmaHref}
          target="_blank"
          rel="noreferrer"
          className="t-accent hover:underline"
        >
          Figma ↗
        </a>
      ) : null}
    </div>
  );
}
