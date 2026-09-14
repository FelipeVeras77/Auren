import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  lede?: ReactNode;
  tone?: 'light' | 'dark';
  aside?: ReactNode;
}

/** Cabeçalho de seção com numeração e filete, como a ficha técnica de uma peça. */
export function SectionHeading({ index, eyebrow, title, id, lede, tone = 'light', aside }: Props) {
  return (
    <header className={`${styles.head} ${styles[tone]}`}>
      <p className={styles.eyebrow}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        {eyebrow}
      </p>
      <div className={styles.row}>
        <div>
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
          {lede && <p className={styles.lede}>{lede}</p>}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </header>
  );
}
