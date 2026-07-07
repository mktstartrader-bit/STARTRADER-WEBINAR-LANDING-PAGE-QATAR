/**
 * Inline SVG icon set for the landing page.
 *
 * Stroke icons follow a consistent 24×24 line style (currentColor, 2px stroke)
 * so they inherit color from their context. `Check` reproduces the exact
 * brand-blue "correct" mark exported from the Figma design.
 */

type IconProps = {
  className?: string;
  size?: number;
};

const stroke = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function Check({ className, size = 24 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.801 10.222C19.931 10.794 20 11.389 20 12C20 16.415 16.415 20 12 20C7.585 20 4 16.415 4 12C4 7.585 7.585 4 12 4C12.923 4 13.809 4.156 14.634 4.444C15.155 4.626 15.725 4.351 15.907 3.83C16.089 3.308 15.814 2.738 15.293 2.556C14.261 2.196 13.153 2 12 2C6.481 2 2 6.481 2 12C2 17.519 6.481 22 12 22C17.519 22 22 17.519 22 12C22 11.237 21.914 10.493 21.752 9.778C21.629 9.24 21.093 8.903 20.555 9.025C20.017 9.147 19.679 9.683 19.801 10.222ZM11 12.586L19.293 4.293C19.683 3.903 20.317 3.903 20.707 4.293C21.097 4.683 21.097 5.317 20.707 5.707L11.707 14.707C11.317 15.098 10.683 15.098 10.293 14.707L7.293 11.707C6.903 11.317 6.903 10.683 7.293 10.293C7.683 9.903 8.317 9.903 8.707 10.293L11 12.586Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Calendar({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function CalendarCheck({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
    </svg>
  );
}

export function Clock({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Monitor({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function User({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function Globe({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" />
    </svg>
  );
}

export function ShieldCheck({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Coins({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" />
    </svg>
  );
}

export function BarChart({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17V5M8 17v-3" />
    </svg>
  );
}

export function Refresh({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

export function TrendingUp({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M22 7 13.5 15.5l-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

export function Droplet({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

export function DollarSign({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M12 1v22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function MessageSquare({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function Plus({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ChevronDown({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Tick({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} {...stroke(size)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Qatar flag — maroon field with the nine-point white serrated band. */
export function QatarFlag({ className, size = 24 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 20) / 28}
      viewBox="0 0 28 20"
      fill="none"
      aria-hidden
    >
      <rect width="28" height="20" rx="2.5" fill="#ffffff" />
      <path
        d="M10 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H10l3-2.22L10 15.55l3-2.22L10 11.11l3-2.22L10 6.66l3-2.22L10 2.22z"
        fill="#8A1538"
      />
      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="19"
        rx="2.5"
        stroke="#e3e8ef"
        strokeWidth="1"
      />
    </svg>
  );
}
