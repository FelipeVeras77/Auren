import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Button.module.css';

type Variant = 'solid' | 'ghost' | 'link';
type Tone = 'light' | 'dark';

interface CommonProps {
  variant?: Variant;
  /** Tom da superfície onde o botão está (define o contraste). */
  tone?: Tone;
  withArrow?: boolean;
  full?: boolean;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'solid', tone = 'light', withArrow, full, children, className, ...rest } = props;
  const cls = [styles.btn, styles[variant], styles[tone], full && styles.full, className].filter(Boolean).join(' ');
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <Icon name="arrow" size={18} className={styles.arrow} />}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export function IconButton({
  label,
  icon,
  badge,
  filled,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon: Parameters<typeof Icon>[0]['name']; badge?: number; filled?: boolean }) {
  return (
    <button type="button" className={[styles.icon, className].filter(Boolean).join(' ')} aria-label={label} {...rest}>
      <Icon name={icon} filled={filled} />
      {badge ? (
        <span className={styles.badge} aria-hidden="true">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
