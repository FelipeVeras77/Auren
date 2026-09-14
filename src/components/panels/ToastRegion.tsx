import { useShop } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import styles from './ToastRegion.module.css';

/** Região viva sempre presente no DOM, para que leitores de tela anunciem cada aviso. */
export function ToastRegion() {
  const { toast, dismissToast } = useShop();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={styles.toast}>
          <Icon name="check" size={18} className={styles.check} />
          <p>{toast.message}</p>
          {toast.action && (
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                toast.action?.onClick();
                dismissToast();
              }}
            >
              {toast.action.label}
            </button>
          )}
          <button type="button" className={styles.close} aria-label="Fechar aviso" onClick={dismissToast}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
