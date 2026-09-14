import { CATEGORIES, COLLECTIONS, PRODUCTS } from '../../data/products';
import { filterProducts } from '../../store/catalog';
import { useShop, type CatalogFilter } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCard } from './ProductCard';
import styles from './Showcase.module.css';

const FILTERS: { id: CatalogFilter; label: string }[] = [
  { id: 'todos', label: 'Todas' },
  { id: 'novidades', label: 'Novidades' },
  ...CATEGORIES,
];

export function Showcase() {
  const { filter, setFilter } = useShop();
  const products = filterProducts(filter);
  const collection = filter.startsWith('colecao:')
    ? COLLECTIONS.find((c) => `colecao:${c.id}` === filter)
    : undefined;

  return (
    <section id="vitrine" className={styles.section} aria-labelledby="vitrine-title">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Vitrine"
          id="vitrine-title"
          title={
            <>
              Peças para <em>colecionar luz</em>
            </>
          }
          aside={
            <p className={styles.count} aria-live="polite">
              {products.length} {products.length === 1 ? 'peça' : 'peças'}
              {collection ? ` em ${collection.name}` : ''}
            </p>
          }
        />

        <div className={styles.filters} role="group" aria-label="Filtrar peças">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.chip}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className={styles.chipCount}>{filterProducts(f.id, PRODUCTS).length}</span>
            </button>
          ))}
          {collection && (
            <button
              type="button"
              className={`${styles.chip} ${styles.chipCollection}`}
              aria-pressed="true"
              onClick={() => setFilter('todos')}
            >
              Coleção {collection.name}
              <Icon name="close" size={14} />
              <span className="visually-hidden">(remover filtro)</span>
            </button>
          )}
        </div>

        <ul className={styles.grid}>
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
