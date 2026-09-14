import { CATEGORIES, COLLECTIONS, PRODUCTS, type Product } from '../data/products';
import type { CatalogFilter } from './ShopContext';

/** Minúsculas e sem acentos: "Anéis" e "aneis" encontram o mesmo resultado. */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

export const categoryLabel = (id: Product['category']) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
export const collectionOf = (p: Product) => COLLECTIONS.find((c) => c.id === p.collection);

export function filterProducts(filter: CatalogFilter, list: Product[] = PRODUCTS) {
  if (filter === 'todos') return list;
  if (filter === 'novidades') return list.filter((p) => p.badge === 'Novo');
  if (filter.startsWith('colecao:')) {
    const id = filter.slice('colecao:'.length);
    return list.filter((p) => p.collection === id);
  }
  return list.filter((p) => p.category === filter);
}

export function searchProducts(query: string, list: Product[] = PRODUCTS) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return list.filter((p) => {
    const haystack = normalize(
      [p.name, categoryLabel(p.category), collectionOf(p)?.name ?? '', p.summary, p.material].join(' '),
    );
    return terms.every((t) => haystack.includes(t));
  });
}
