import styles from './Hallmark.module.css';

/**
 * Selo "925" inspirado no punção de contraste gravado nas peças de prata.
 * Puramente decorativo; o texto equivalente sempre aparece próximo ao selo.
 */
export function Hallmark({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span className={[styles.mark, styles[tone], className].filter(Boolean).join(' ')} aria-hidden="true">
      925
    </span>
  );
}
