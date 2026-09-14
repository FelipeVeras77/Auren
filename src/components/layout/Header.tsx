import { useEffect, useState } from 'react';
import { useShop, type CatalogFilter } from '../../store/ShopContext';
import { IconButton } from '../ui/Button';
import styles from './Header.module.css';

// eslint-disable-next-line react-refresh/only-export-components
export const NAV_LINKS: { href: string; label: string; filter?: CatalogFilter }[] = [
  { href: '#colecoes', label: 'Coleções' },
  { href: '#vitrine', label: 'Novidades', filter: 'novidades' },
  { href: '#essenciais', label: 'Essenciais' },
  { href: '#sobre', label: 'Sobre a Auren' },
];

export function Header() {
  const { count, favorites, openPanel, setFilter } = useShop();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <IconButton
          icon="menu"
          label="Abrir menu"
          className={styles.menuBtn}
          aria-haspopup="dialog"
          onClick={() => openPanel('menu')}
        />

        <a href="#inicio" className={styles.logo} aria-label="Auren — página inicial">
          Auren
        </a>

        <nav aria-label="Principal" className={styles.nav}>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={l.filter ? () => setFilter(l.filter!) : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton icon="search" label="Buscar produtos" aria-haspopup="dialog" onClick={() => openPanel('search')} />
          <IconButton
            icon="heart"
            label={`Favoritos (${favorites.length})`}
            badge={favorites.length}
            className={styles.hideXs}
            aria-haspopup="dialog"
            onClick={() => openPanel('favorites')}
          />
          <IconButton
            icon="user"
            label="Minha conta"
            className={styles.hideXs}
            aria-haspopup="dialog"
            onClick={() => openPanel('account')}
          />
          <IconButton
            icon="bag"
            label={`Sacola (${count} ${count === 1 ? 'item' : 'itens'})`}
            badge={count}
            aria-haspopup="dialog"
            onClick={() => openPanel('cart')}
          />
        </div>
      </div>
    </header>
  );
}
