import type { ReactNode } from "react";
import type { AnalyticsEvent } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import { TrackedLink } from "./TrackedLink";

type LinkProps = {
  href: string;
  children: ReactNode;
  /** ícone antes do rótulo (ex.: iFood) */
  icon?: ReactNode;
  event?: AnalyticsEvent;
  params?: Record<string, string | number>;
  className?: string;
};

/** Rótulo que troca verticalmente no hover (a cópia é aria-hidden). */
export function Swap({ children }: { children: ReactNode }) {
  return (
    <span className="swap">
      <span className="swap__a">{children}</span>
      <span className="swap__b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 12" aria-hidden="true" focusable="false">
      <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Link editorial: sublinhado que se desenha + seta que responde ao hover. */
export function ArrowLink({ href, children, event, params, className, icon }: LinkProps) {
  return (
    <TrackedLink href={href} event={event} params={params} className={cx("link-arrow", className)}>
      {icon}
      <span className="link-arrow__label">{children}</span>
      <Arrow />
    </TrackedLink>
  );
}

/** Botão principal: magnetismo sutil (desktop) + rótulo que troca verticalmente. */
export function Button({ href, children, event, params, className, icon, tone = "solid" }: LinkProps & { tone?: "solid" | "light" }) {
  return (
    <TrackedLink href={href} event={event} params={params} className={cx("btn", tone === "light" && "btn--light", icon ? "btn--icon" : null, className)} data-magnetic="">
      {icon}
      <span className="btn__label" data-magnetic-label="">
        <Swap>{children}</Swap>
      </span>
      <Arrow />
    </TrackedLink>
  );
}
