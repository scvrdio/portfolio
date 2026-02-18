import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    href: "/case/look",
    title: "Look",
    meta: "Product Designer / Product Lead",
    description:
      "Приложение для ведения персональной библиотеки видеоконтента с созданием списков, отслеживанием прогресса просмотра сериала, социальными функциями и персональным рекомом.",
    note: "Вёл проект от идеи до запуска MVP.",
    figmaHref: "https://t.me/wellook_bot",
    media: [
      {
        type: "image",
        src: "/projects/look-hero.png?v=20260218",
        mode: "static",
        width: 2016,
        height: 1310,
        priority: true,
      },
    ],
  },
  {
    href: "/case/popolam",
    title: "Пополам",
    meta: "Product Designer · Янв 2025 — Окт 2025",
    description: "Приложение для быстрого деления чеков между людьми с использованием компьютерного зрения и ML-алгоритмов.",
    note: "Нарисовал дизайн, улучшил флоу деления чека и подключения СБП.",
    figmaHref: "https://www.figma.com/design/YSb8QXs053NIUCRF9qtqTV/%D0%9F%D0%BE%D0%BF%D0%BE%D0%BB%D0%B0%D0%BC?node-id=0-1&t=4xq48AqBtQE5TY0X-1",
    media: [
      {
        type: "image",
        src: "/projects/popolam-hero.png?v=20260218",
        mode: "static",
        width: 2016,
        height: 1310,
        priority: true,
      },
    ],
  },
  {
    href: "/case/terminal",
    title: "Terminal",
    meta: "Product Designer · Сен 2022 — Дек 2024",
    description: "Web-3 платформа мини-игр в Telegram с месячной аудиторией 5М+ пользователей.",
    note: "Разработал дизайн и репозиционирование на web-2 аудиторию, улучшил конверсию в пополнение, фокусировался на активации и ретеншене.",
    media: [
      {
        type: "image",
        src: "/projects/terminal-hero.png?v=20260218",
        mode: "static",
        width: 2016,
        height: 1316,
        priority: true,
      },
    ],
  },
];
