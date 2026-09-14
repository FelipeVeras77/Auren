import { WHATSAPP_EXAMPLE } from '../../data/info';
import { useShop } from '../../store/ShopContext';
import { NAV_LINKS } from '../layout/Header';
import { Icon } from '../ui/Icon';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

export function MobileMenu() {
  const { panel, closePanel, openPanel, setFilter, favorites } = useShop();

  return (
    <Sheet open={panel === 'menu'} onClose={closePanel} side="left" size="sm" title="Menu">
      <nav aria-label="Menu principal" className={styles.menuNav}>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href + l.label}>
              <a
                href={l.href}
                onClick={() => {
                  if (l.filter) setFilter(l.filter);
                  closePanel();
                }}
              >
                {l.label}
                <Icon name="arrow" size={18} />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.stack}>
        <button type="button" className={styles.linkRow} onClick={() => openPanel('search')}>
          <Icon name="search" /> Buscar
        </button>
        <button type="button" className={styles.linkRow} onClick={() => openPanel('favorites')}>
          <Icon name="heart" /> Favoritos <span>{favorites.length}</span>
        </button>
        <button type="button" className={styles.linkRow} onClick={() => openPanel('account')}>
          <Icon name="user" /> Sua conta
        </button>
        <a className={styles.linkRow} href={WHATSAPP_EXAMPLE.href} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" /> WhatsApp <span>{WHATSAPP_EXAMPLE.display} (exemplo)</span>
        </a>
      </div>
    </Sheet>
  );
}
