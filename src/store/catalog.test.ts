import { describe, expect, it } from 'vitest';
import { PRODUCTS } from '../data/products';
import { filterProducts, normalize, searchProducts } from './catalog';

describe('filterProducts', () => {
  it('filtra por categoria, novidades e coleção', () => {
    expect(filterProducts('todos')).toHaveLength(PRODUCTS.length);
    expect(filterProducts('aneis').map((p) => p.name)).toEqual(['Anel Eclipse', 'Anel Vértice']);
    expect(filterProducts('brincos').map((p) => p.name)).toEqual(['Brinco Orbital', 'Argola Aura']);
    expect(filterProducts('novidades').every((p) => p.badge === 'Novo')).toBe(true);
    expect(filterProducts('colecao:essenciais').every((p) => p.collection === 'essenciais')).toBe(true);
  });

  it('cada categoria tem ao menos uma peça', () => {
    for (const c of ['aneis', 'colares', 'brincos', 'pulseiras', 'pingentes'] as const) {
      expect(filterProducts(c).length).toBeGreaterThan(0);
    }
  });
});

describe('searchProducts', () => {
  it('ignora acentos e maiúsculas', () => {
    expect(normalize('  Nébula ')).toBe('nebula');
    expect(searchProducts('nebula').map((p) => p.id)).toEqual(['pulseira-nebula']);
    expect(searchProducts('VÉRTICE').map((p) => p.id)).toEqual(['anel-vertice']);
  });

  it('busca por categoria e coleção, exigindo todos os termos', () => {
    expect(searchProducts('colar').map((p) => p.id)).toEqual(['colar-lume', 'colar-horizonte']);
    expect(searchProducts('formas do ceu').length).toBeGreaterThan(1);
    expect(searchProducts('colar orbital')).toEqual([]);
    expect(searchProducts('   ')).toEqual([]);
  });
});
