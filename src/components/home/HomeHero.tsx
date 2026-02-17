import Image from "next/image";

export function HomeHero() {
  return (
    <section className="space-y-12">
      {/* avatar */}
      <Image
        src="/profile/me.png"
        alt="Серёжа Ивлев"
        width={128}
        height={128}
        priority
        className="rounded-full"
        sizes="512px"
      />

      {/* links row */}
      <div className="flex flex-wrap items-baseline gap-x-10 gap-y-2">
        <p className="t-title ty-title hover:underline">
          Серёжа Ивлев
        </p>

        <a
          href="/cv.pdf"
          target="_blank"
          rel="noreferrer"
          className="t-accent ty-body hover:underline"
        >
          CV ↗
        </a>

        <a
          href="https://t.me/USERNAME"
          target="_blank"
          rel="noreferrer"
          className="t-accent ty-body hover:underline"
        >
          Telegram ↗
        </a>

        <a
          href="mailto:ivlev.serezha@gmail.com"
          className="t-accent ty-body hover:underline"
        >
          ivlev.serezha@gmail.com
        </a>
      </div>

      {/* text */}
      <div className="space-y-3">
        <p className="t-body ty-body">
          Продуктовый дизайнер с 3+ годами опыта в web-3, fintech и edtech продуктах. Рисую мобильные приложения для B2C.
        </p>
        <p className="t-body ty-body">
          Высшее образование ИТМО в области программирования.
        </p>
        <p className="t-body ty-body">
          Нахожусь в активном поиске новых вызовов.
        </p>
      </div>
    </section>
  );
}
