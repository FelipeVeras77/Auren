import type { SVGProps } from 'react';

const PATHS = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20.5c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" /></>,
  bag: <><path d="M5 8.5h14l-1 12H6l-1-12Z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></>,
  menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
  close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  arrow: <><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>,
  arrowDown: <><path d="M12 4v15" /><path d="m7 14 5 5 5-5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  whatsapp: <><path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" /><path d="M9.3 9.2c.3 2.4 2.6 4.8 5.2 5.3l1-1.2-1.8-.9-.7.7c-.9-.4-1.9-1.4-2.3-2.3l.7-.7-.9-1.8Z" /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" /></>,
  pinterest: <><circle cx="12" cy="12" r="8" /><path d="m10.5 20 1.8-7.5" /><path d="M9.6 13.6c-.9-2.8.8-5.3 3.4-5.3 2.2 0 3.4 1.5 3.4 3.3 0 2.2-1.2 4-2.9 4-1 0-1.6-.8-1.3-1.8" /></>,
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  filled?: boolean;
}

/** Ícones de traço fino (1.4px), desenhados para o mesmo peso da tipografia. */
export function Icon({ name, size = 20, filled = false, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
