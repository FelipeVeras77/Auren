import { describe, expect, it } from 'vitest';
import { cartCount, cartReducer, cartSubtotal, MAX_QTY, sanitizeCart } from './cart';

describe('cartReducer', () => {
  it('adiciona um item novo e soma quantidades de um existente', () => {
    let cart = cartReducer([], { type: 'add', id: 'anel-eclipse' });
    cart = cartReducer(cart, { type: 'add', id: 'anel-eclipse', qty: 2 });
    expect(cart).toEqual([{ id: 'anel-eclipse', qty: 3 }]);
  });

  it('limita a quantidade máxima por item', () => {
    const cart = cartReducer([], { type: 'add', id: 'colar-lume', qty: 99 });
    expect(cart[0].qty).toBe(MAX_QTY);
  });

  it('remove o item quando a quantidade chega a zero', () => {
    const cart = cartReducer([{ id: 'colar-lume', qty: 1 }], { type: 'setQty', id: 'colar-lume', qty: 0 });
    expect(cart).toEqual([]);
  });

  it('remove e limpa', () => {
    const start = [
      { id: 'colar-lume', qty: 1 },
      { id: 'anel-vertice', qty: 2 },
    ];
    expect(cartReducer(start, { type: 'remove', id: 'colar-lume' })).toEqual([{ id: 'anel-vertice', qty: 2 }]);
    expect(cartReducer(start, { type: 'clear' })).toEqual([]);
  });
});

describe('totais', () => {
  it('calcula subtotal em centavos e contagem de itens', () => {
    const cart = [
      { id: 'anel-eclipse', qty: 2 }, // 2 × 189,00
      { id: 'pingente-solis', qty: 1 }, // 129,00
    ];
    expect(cartSubtotal(cart)).toBe(2 * 18900 + 12900);
    expect(cartCount(cart)).toBe(3);
  });
});

describe('sanitizeCart', () => {
  it('descarta dados inválidos e produtos inexistentes do localStorage', () => {
    expect(sanitizeCart('lixo')).toEqual([]);
    expect(
      sanitizeCart([{ id: 'anel-eclipse', qty: 50 }, { id: 'nao-existe', qty: 1 }, { id: 3 }, null]),
    ).toEqual([{ id: 'anel-eclipse', qty: MAX_QTY }]);
  });
});
