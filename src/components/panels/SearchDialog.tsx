import { useDeferredValue, useRef, useState } from 'react';
import { CATEGORIES, formatPrice } from '../../data/products';
import { categoryLabel, searchProducts } from '../../store/catalog';
import { useShop } from '../../store/ShopContext';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

export function SearchDialog() {
  const { panel, closePanel, openProduct, setFilter } = useShop();
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const results = searchProducts(deferred);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setQuery('');
    closePanel();
  };

  return (
    <Sheet open={panel === 'search'} onClose={close} side="center" size="md" title="Buscar" initialFocus={inputRef}>
      <form role="search" className={styles.searchField} onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) openProduct(results[0].id);
      }}>
        <label htmlFor="busca">Nome da peça, categoria ou coleção</label>
        <input
          ref={inputRef}
          id="busca"
          type="search"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex.: anel, colar, Formas do céu"
          autoComplete="off"
          enterKeyHint="search"
          aria-describedby="busca-status"
        />
      </form>

      <p id="busca-status" className={styles.muted} role="status" aria-live="polite" style={{ margin: '1rem 0 0.5rem' }}>
        {deferred.trim()
          ? results.length
            ? `${results.length} ${results.length === 1 ? 'peça encontrada' : 'peças encontradas'}`
            : `Nenhuma peça encontrada para “${deferred.trim()}”.`
          : 'Sugestões por categoria:'}
      </p>

      {deferred.trim() ? (
        <ul className={styles.list}>
          {results.map((p) => (
            <li key={p.id}>
              <button type="button" className={styles.resultBtn} onClick={() => openProduct(p.id)}>
                <img src={p.image.src.replace('.webp', '-sm.webp')} alt="" width={56} height={70} />
                <span>
                  <span className={styles.lineName} style={{ display: 'block' }}>
                    {p.name}
                  </span>
                  <span className={styles.muted}>
                    {categoryLabel(p.category)} · {p.material}
                  </span>
                </span>
                <span className={styles.amount}>{formatPrice(p.price)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.chips}>
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href="#vitrine"
              className={styles.chip}
              onClick={() => {
                setFilter(c.id);
                close();
              }}
            >
              {c.label}
            </a>
          ))}
        </div>
      )}
    </Sheet>
  );
}
