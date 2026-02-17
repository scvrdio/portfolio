import { Link } from "../ui/Link";

export function CaseTopBar(props: {
    title: string;
    backHref?: string;
    figmaHref?: string;
}) {
    const backHref = props.backHref ?? "/";

    return (
        <div className="flex items-center justify-between gap-4">

            <Link href={backHref} variant="left">
                Назад
            </Link>

            {props.figmaHref ? (
                <Link href={props.figmaHref} variant="up-right">
                Figma
                </Link>
            ) : null}
        </div>
    );
}
