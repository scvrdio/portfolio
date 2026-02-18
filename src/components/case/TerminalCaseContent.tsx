import { MetricPills } from "@/components/ui/MetricPills";
import { Section } from "@/components/ui/Section";
import { TextBlock } from "@/components/ui/TextBlock";
import { MediaBlock } from "@/components/ui/MediaBlock";

function TerminalMediaBlock(props: Parameters<typeof MediaBlock>[0]) {
  return (
    <MediaBlock
      {...props}
      defaultVideoPlaybackRate={1}
      showSegmentControls={false}
    />
  );
}

export function TerminalCaseContent() {
  return (
    <>
{/* ВВЕДЕНИЕ */}
        <Section title="Terminal">
          <TextBlock accent="Описание">
            Приложение с интегрированными партнерскими казуальными мини-играми, встроенными заданиями и реферальной системой.
          </TextBlock>

          <TextBlock accent="Цель">
            Создать продукт, который объединяет игровые механики и финансовые операции Web-3, делая их понятными и вовлекающими для широкой аудитории. Показать потенциал платформы и упростить юзерфлоу от входа до транзакции.
          </TextBlock>

          <TextBlock accent="Узкие места">
            Web-3 сложно воспринимается базовым пользователем. Интерфейсы перегружены терминами, флоу операций непонятен, высокий процент ошибок при пополнении и выводе средств (неверные токены, MEMO, потерянные транзакции). Это снижает доверие и удержание, а также увеличивает нагрузку на поддержку.
          </TextBlock>
        </Section>

        <Section title="Первая версия">

          <TextBlock accent="Задача">
            Создать MVP, подтверждающий интерес к геймификации Web-3 и собирающий первую аудиторию. Цель — проверить гипотезу востребованности и получить фидбек для развития платформы.
          </TextBlock>

          <TextBlock accent="Решение">
            Разработал игру-головоломку, где пользователи разгадывали шифр и получали очки, конвертируемые в вознаграждение. Добавил систему ранжирования и подсчета очков. Провел сбор пользовательского и фидбека и анализ рынка.
          </TextBlock>

          <TerminalMediaBlock
            fullWidth
            items={[
              {
                type: "video",
                src: "/cases/terminal/ver1.mp4",
                autoPlay: true,
                aspectClassName: "aspect-[12/9]",
                fit: "contain",
                loop: true,
                muted: true,
                controls: true,
              },
            ]}
          />

          <TextBlock accent="Результат">
            Гипотеза подтвердилась: пользователи web-3 активно вовлекалась и приглашали своих друзей.
          </TextBlock>

          <MetricPills
            items={[
              { label: "ПРИРОСТ ЮЗЕРОВ", value: "+60 000" },
              { label: "AVG TIME СЕССИИ", value: "4,2 мин" },
              { label: "RR7", value: "80%" },
            ]}
          />

        </Section>

        <Section title="Вторая версия">

          <TextBlock accent="Задача">
            Создать сервис мини-игр с целью попадания в актуальные тренды, расширения аудитории с Web-3 до Web-2, удержания интереса и повышения вовлеченности.
          </TextBlock>

          <TextBlock accent="Проблема">
            Web-3 сегмент остается сложным для восприятия обычного пользователя, порог входа высокий. Камнем преткновения являются механики пополнения и вывода средств.
          </TextBlock>

          <TextBlock accent="Решение">
            Платформа перенесена в Telegram Mini Apps, активно растущую экосистему, которая привлекает множество пользователей вне сегмента Web-3.
            <span className="pbreak" /> В первую очередь создал раздел с мини-играми, в который добавил первые три игры: «Монетка» — флагман приложения, созданный инхаус, а также нативно интегрированные из других приложений «Дурак» и «Покер».
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "video",
                src: "/cases/terminal/Games.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
              },
            ]}
          />

          <TextBlock>
            В Монетке пользователь может играть на внутреннюю волюту с ограничением по количеству игр, а также на TON без ограничения. Добавил стрики и увеличение коэффициента с каждым новым броском для удержания пользователя в игре.
            <span className="pbreak" /> Создал маркетинговый флоу, позволяющий пользователю забрать бесплатный выигрыш для игры в Монетку, а также демо-версию для безопасного теста механики игры.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "video",
                src: "/cases/terminal/Coinflip.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
                customControls: false,
              },
              {
                type: "image",
                src: "/cases/terminal/Marketing.png",
                aspectClassName: "aspect-[9/16]",
              },
            ]}
          />

          <TextBlock>
            После добавления мини-игр, создал страницу с получением ежедневного бонуса, который можно потратить на активацию Модов, дающих пользователям бенефиты в играх. Здесь же добавил возможность увеличить выигрыш с помощью механики 50/50 — удвоил бонус или проиграл его.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "image",
                src: "/cases/terminal/Push.png",
                aspectClassName: "aspect-[9/16]",
              },
              {
                type: "video",
                src: "/cases/terminal/Push x2.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
                customControls: false,
              },
            ]}
          />

          <TextBlock>
            Страница Модов представляет пользователям возможность купить обычные Моды, а также лимитированные — с особыми условиями и ограничением по сроку действия.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "video",
                src: "/cases/terminal/Earn.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
              },
            ]}
          />

          <TextBlock>
            Создал страницу с заданиями, на которой пользователь может выполнить задания от партнеров или ввести код из социальных сетей для получения внутренней валюты.
            <span className="pbreak" />На странице профиля пользователь может пригласить друзей по реферальной ссылке и получать пассивный доход с их пополнений. Здесь же находятся настройки приложения, ссылки на ТП, гайд, соц. сети и CTA на покупку NFT из коллекции, так же дающей особые условия.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "image",
                src: "/cases/terminal/Tasks.png",
                aspectClassName: "aspect-[9/16]",
              },
              {
                type: "image",
                src: "/cases/terminal/Settings.png",
                aspectClassName: "aspect-[9/16]",
              },
            ]}
          />

          <TextBlock>
            После выкатки приложения, получил фич-реквест от команды поддержки с просьбой об улучшении пользовательского флоу пополнения и вывода средств. Флоу не включал пошаговый гайд, так как при проектировании не учли низкую осведомленность пользователей Web-2 об особенностях транзакций в криптовалюте.
            <span className="pbreak" />После реализации гайда и оптимизации флоу, количество обращений в ТП, связанных с транзакциями, снизилось на 70%.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "video",
                src: "/cases/terminal/Deposit.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
                customControls: false,
              },
              {
                type: "video",
                src: "/cases/terminal/Withdraw.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
                customControls: false,
              },
            ]}
          />

          <TextBlock>
            Создал анимированные онбординги с использованием lottie-анимаций. Они появляются перед входом в приложение, а также при открытии новых страниц и механик.
          </TextBlock>

          <TerminalMediaBlock
            items={[
              {
                type: "video",
                src: "/cases/terminal/Onboarding.mp4",
                aspectClassName: "aspect-[9/16]",
                autoPlay: true,
                loop: true,
                muted: true,
                controls: false,
              },
            ]}
          />

          <TextBlock accent="Результат">
            Создал анимированные онбординги с использованием lottie-анимаций. Они появляются перед входом в приложение, а также при открытии новых страниц и механик.
          </TextBlock>

          <MetricPills
            items={[
              { label: "DAU", value: "+4% в день" },
              { label: "RR30", value: "42%" },
              { label: "CR", value: "27%" },
              { label: "ВРЕМЯ ТРАНЗАКЦИИ", value: "4 мин → 1 мин" },
              { label: "ОБРАЩЕНИЯ В ТП", value: "-70%" },
            ]}
          />

        </Section>

        <Section title="Вывод">

          <TextBlock>
            После выхода второй версии, приложение стало полноценной игровой платформой с финансовыми сценариями. Основные задачи выполнены: пользователи легче осваивались в приложении, быстрее учились проводить транзакции, реже допускали ошибки и просто наслаждались играми.
            <span className="pbreak" />После релиза я занимался пост-аналитикой и улучшением UX: переработал логическую архитектуру сервиса, увеличив CR в пополнение баланса, расширил и оптимизировал стейты интерфейса в корнер-кейсах, добавил внутриигровые уведомления и CTA.
          </TextBlock>

        </Section>
    </>
  );
}

