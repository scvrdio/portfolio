import Image from "next/image";
import { Link } from "../ui/Link";

export function HomeHero() {
  return (
    <section className="space-y-14">
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
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-0 mb-6">
        <p className="t-title ty-title">
          Серёжа Ивлев
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-8 mt-4">
          <Link href="https://drive.google.com/file/d/1n7OB6XH48o5YIqdLwqVIowm41XCQs3EM/view" variant="up-right">
            CV
          </Link>
          <Link href="https://t.me/serezhaivlev" variant="up-right">
            Telegram
          </Link>

          <Link href="mailto:ivlev.serezha@gmail.com" variant="up-right">
            ivlev.serezha@gmail.com
          </Link>
        </div>
      </div>

      {/* text */}
      <div className="mt-[-4] mb-[-16]">
        <div className="t-body ty-body">
          <p>
            Продуктовый дизайнер с 3+ годами опыта в web-3, fintech и edtech продуктах. Рисую мобильные приложения для B2C.
            <span className="pbreak" />Высшее образование ИТМО в области программирования.
            <span className="pbreak" />
          </p>

          <p>
            Нахожусь в активном поиске новых вызовов.
            <span className="inline-block align-baseline ml-1">
              <img src="/warrior.svg" alt="" className="inline-block h-[1.1em] w-auto align-[-0.15em]" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
