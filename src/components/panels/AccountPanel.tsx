import { WHATSAPP_EXAMPLE } from '../../data/info';
import { useShop } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

/**
 * Sem backend de autenticação, a conta mostra o que de fato existe:
 * favoritos e sacola salvos no navegador, e atalhos de atendimento.
 */
export function AccountPanel() {
  const { panel, closePanel, openPanel, openInfo, favorites, count } = useShop();

  return (
    <Sheet open={panel === 'account'} onClose={closePanel} title="Sua conta" size="sm">
      <p style={{ marginBottom: '1.5rem' }}>
        Nesta versão da Auren, sua sacola e seus favoritos ficam salvos neste navegador, sem precisar de cadastro.
      </p>
      <div className={styles.stack} style={{ marginTop: 0 }}>
        <button type="button" className={styles.linkRow} onClick={() => openPanel('favorites')}>
          <Icon name="heart" /> Favoritos <span>{favorites.length}</span>
        </button>
        <button type="button" className={styles.linkRow} onClick={() => openPanel('cart')}>
          <Icon name="bag" /> Sacola <span>{count}</span>
        </button>
        <button type="button" className={styles.linkRow} onClick={() => { closePanel(); openInfo('trocas'); }}>
          <Icon name="arrow" /> Trocas e devoluções
        </button>
        <a className={styles.linkRow} href={WHATSAPP_EXAMPLE.href} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" /> Acompanhar pedido pelo WhatsApp <span>exemplo</span>
        </a>
      </div>
    </Sheet>
  );
}
