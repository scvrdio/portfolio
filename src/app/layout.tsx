import "./globals.css";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Серёжа Ивлев",
  description: "Портфолио",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
              }

              #app-loader {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: grid;
                place-items: center;
                background: #fff;
                color: #111;
                opacity: 1;
                transition: opacity 300ms ease;
              }

              #app-loader-inner {
                text-align: center;
                font-family: sans-serif;
              }

              #loader-logo {
                display: block;
                width: 60px;
                height: 44px;
                margin: 0 auto 20px;
                animation: loader-logo-float 1400ms ease-in-out infinite;
              }

              #loader-logo svg {
                display: block;
                width: 100%;
                height: 100%;
              }

              #loader-vpn {
                display: none;
                margin-top: 12px;
                max-width: 360px;
                font-size: 14px;
                line-height: 1.5;
              }

              #app-loader.show-vpn #loader-vpn {
                display: block;
              }

              html:not(.ready) #app-content {
                visibility: hidden;
              }

              html.ready #app-loader {
                opacity: 0;
                pointer-events: none;
              }

              @keyframes loader-logo-float {
                0%, 100% {
                  transform: translateY(0);
                  opacity: 1;
                }
                50% {
                  transform: translateY(-1.5px) scale(0.985);
                  opacity: 0.9;
                }
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var root = document.documentElement;
                var timerId = setTimeout(function () {
                  var loader = document.getElementById("app-loader");
                  if (loader) loader.classList.add("show-vpn");
                }, 5000);

                function markReady() {
                  root.classList.add("ready");
                  clearTimeout(timerId);
                }

                if (document.readyState === "complete") {
                  markReady();
                  return;
                }

                window.addEventListener("load", markReady, { once: true });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-neutral-900">
        <div id="app-loader" aria-live="polite" aria-busy="true">
          <div id="app-loader-inner">
            <div id="loader-logo" aria-hidden="true">
              <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M59.902 16.043C60.7431 25.0417 56.0752 32.8288 49.4759 33.4362C42.8765 34.0435 36.8449 27.2411 36.0037 18.2424C35.1626 9.24383 39.8306 1.45666 46.4299 0.849308C53.0292 0.24196 59.0609 7.04443 59.902 16.043Z"
                  fill="#0033FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.2805 43.9492C27.1706 43.131 33.4589 32.6408 32.3258 20.5186C31.1927 8.39636 23.0674 -0.767379 14.1773 0.0507903C5.28718 0.86896 -1.00111 11.3592 0.131977 23.4814C1.26506 35.6036 9.39045 44.7674 18.2805 43.9492Z"
                  fill="#0033FF"
                />
              </svg>
            </div>
            <div id="loader-vpn">Если сайт не грузится, подключитесь, пожалуйста с VPN</div>
          </div>
        </div>

        <div id="app-content">
          <main className="py-10">
            <Container>{children}</Container>
          </main>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
