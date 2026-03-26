"use client";

import { Container } from "@/components/container";
import Script from "next/script";
import { useEffect, useRef } from "react";

function YardCalendar() {
  const authcode = "ljiF3y90";
  const yardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = yardRef.current;
    if (!host) return;

    const applyFix = () => {
      const shadow = host.shadowRoot;
      if (!shadow) return false;

      if (shadow.querySelector('style[data-yard-text-fix="1"]')) {
        return true;
      }

      const style = document.createElement("style");
      style.setAttribute("data-yard-text-fix", "1");
      style.textContent = `
        .yard-event-title,
        .yard-event-title a,
        .yard-shorten-text {
          color: #111 !important;
        }

        .yard-event,
        .yard-event * {
          text-shadow: none !important;
        }
      `;

      shadow.appendChild(style);
      return true;
    };

    const tryApply = () => {
      if (!applyFix()) {
        requestAnimationFrame(tryApply);
      }
    };

    tryApply();
  }, [authcode]);

  return (
    <>
      <Script
        src="https://remote.yard.global/yard.js"
        strategy="afterInteractive"
      />
      <div
        ref={yardRef}
        key={authcode}
        className="yard"
        data-product="calendar"
        data-authcode={authcode}
        style={{ minHeight: 700 }}
      />
    </>
  );
}

export default function EventsPage() {
  return (
    <div>
      <Container
        asChild
        className="pt-[200px] relative text-foreground flex flex-col"
      >
        <section>
          <div className="flex flex-col gap-2 lg:gap-4 mb-12">
            <h1 className="text-4xl text-left lg:text-start lg:text-[64px] font-heading font-bold leading-tight">
              Events
            </h1>
            <p className="font-body text-left lg:text-start text-md lg:text-lg">
              Discover upcoming blockchain events, hackathons, conferences, and community
              <br />
              gatherings from across the ecosystem.
            </p>
          </div>
        </section>
      </Container>

      <Container asChild className="py-12 rounded-2xl">
        <section className="flex justify-center items-center">
          <div className="w-full">
            <YardCalendar />
          </div>
        </section>
      </Container>
    </div>
  );
}