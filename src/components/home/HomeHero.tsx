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
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-0">
        <p className="t-title ty-title hover:underline">
          Серёжа Ивлев
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8 mt-4">
        <a
          href="https://drive.google.com/file/d/1n7OB6XH48o5YIqdLwqVIowm41XCQs3EM/view"
          target="_blank"
          rel="noreferrer"
          className="t-accent ty-body hover:underline"
        >
          CV ↗
        </a>

        <a
          href="https://t.me/serezhaivlev"
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
      </div>

      {/* text */}
      <div className="mt-[-4] mb-[-16]">
        <p className="t-body ty-body">
          Продуктовый дизайнер с 3+ годами опыта в web-3, fintech и edtech продуктах. Рисую мобильные приложения для B2C.
        <span className="pbreak" />Высшее образование ИТМО в области программирования.
        <span className="pbreak" />Нахожусь в активном поиске новых вызовов.
        </p>
      </div>
    </section>
  );
}
