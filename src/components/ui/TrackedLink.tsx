"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  event?: AnalyticsEvent;
  params?: Record<string, string | number>;
  [data: `data-${string}`]: string | number | boolean | undefined;
};

/** Link que registra o evento de conversão. Externos abrem em nova aba. */
export function TrackedLink({ href, event, params, onClick, children, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (event) track(event, { href, ...params });
    onClick?.(e);
  };
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const web = href.startsWith("http");
    return (
      <a href={href} target={web ? "_blank" : undefined} rel={web ? "noopener" : undefined} onClick={handle} {...rest}>
        {children}
        {web && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
