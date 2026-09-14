import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react';
import { IconButton } from './Button';
import styles from './Sheet.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Direita (sacola, favoritos), esquerda (menu) ou centro (modais). */
  side?: 'right' | 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Elemento que recebe o foco ao abrir (padrão: primeiro elemento focável). */
  initialFocus?: RefObject<HTMLElement | null>;
}

/**
 * Gaveta/modal construída sobre <dialog> nativo: foco preso, Esc para fechar,
 * conteúdo de fundo inerte e retorno do foco ao gatilho vêm do próprio navegador.
 */
export function Sheet({ open, onClose, title, side = 'right', size = 'md', children, footer, className, initialFocus }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      initialFocus?.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, initialFocus]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={[styles.sheet, styles[side], styles[size], className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // Clique no backdrop (o próprio <dialog>, fora do painel) fecha.
        if (e.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className={styles.panel}>
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <IconButton icon="close" label="Fechar" onClick={onClose} className={styles.close} />
          </header>
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}
