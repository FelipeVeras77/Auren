import { useState } from 'react';
import { formatPrice, getProduct } from '../../data/products';
import { useShop } from '../../store/ShopContext';
import { Button } from '../ui/Button';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

export function FavoritesDrawer() {
  const { panel, closePanel, favorites, toggleFavorite, dispatch, openProduct } = useShop();
  const [status, setStatus] = useState('');

  const close = () => {
    setStatus('');
    closePanel();
  };

  return (
    <Sheet open={panel === 'favorites'} onClose={close} title="Favoritos">
      <p className={status ? styles.status : 'visually-hidden'} role="status" aria-live="polite">
        {status}
      </p>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <h3>Nenhuma peça salva ainda.</h3>
          <p>Toque no coração de uma peça para guardá-la aqui.</p>
          <Button href="#vitrine" variant="ghost" withArrow onClick={close}>
            Ver a vitrine
          </Button>
        </div>
      ) : (
        <ul className={styles.list} aria-label="Peças favoritas">
          {favorites.map((id) => {
            const p = getProduct(id);
            if (!p) return null;
            return (
              <li key={id} className={styles.line}>
                <img className={styles.thumb} src={p.image.src.replace('.webp', '-sm.webp')} alt="" width={80} height={100} />
                <div className={styles.lineBody}>
                  <div className={styles.lineTop}>
                    <p className={styles.lineName}>
                      <button type="button" className={styles.textBtn} style={{ font: 'inherit', padding: 0, textDecoration: 'none', color: 'inherit', minHeight: 0 }} onClick={() => openProduct(id)}>
                        {p.name}
                      </button>
                    </p>
                    <p className={styles.amount}>{formatPrice(p.price)}</p>
                  </div>
                  <p className={styles.muted}>{p.material}</p>
                  <div className={styles.lineActions}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        dispatch({ type: 'add', id });
                        setStatus(`${p.name} adicionado à sacola.`);
                      }}
                    >
                      Adicionar à sacola
                    </Button>
                    <button
                      type="button"
                      className={styles.textBtn}
                      aria-label={`Remover ${p.name} dos favoritos`}
                      onClick={() => {
                        toggleFavorite(id, { silent: true });
                        setStatus(`${p.name} removido dos favoritos.`);
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>
  );
}
