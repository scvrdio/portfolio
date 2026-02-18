"use client";

import { useRouter } from "next/navigation";
import { useModalClose } from "@/components/ui/Modal";
import { Link } from "../ui/Link";

export function CaseTopBar(props: {
  title: string;
  backHref?: string;
  figmaHref?: string;
  linkLabel?: string;
  isModal?: boolean;
}) {
  const router = useRouter();
  const closeModal = useModalClose();
  const backHref = props.backHref ?? "/";

  return (
    <div className="flex items-center justify-between gap-4">
      {props.isModal ? (
        <button
          type="button"
          onClick={() => (closeModal ? closeModal() : router.back())}
          className="group inline-flex h-8 w-8 items-center justify-center"
          aria-label="Закрыть"
        >
          <span className="t-accent ty-body text-[28px] text-black/60 transition-colors duration-100 group-hover:text-[#0033ff]">×</span>
        </button>
      ) : (
        <Link href={backHref} variant="left">
          Назад
        </Link>
      )}

      {props.figmaHref ? (
        <Link href={props.figmaHref} variant="up-right">
          {props.linkLabel ?? "Figma"}
        </Link>
      ) : null}
    </div>
  );
}
