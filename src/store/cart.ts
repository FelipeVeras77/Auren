import { getProduct } from '../data/products';

export interface CartLine {
  id: string;
  qty: number;
}

export const MAX_QTY = 10;

const clamp = (qty: number) => Math.max(1, Math.min(MAX_QTY, Math.round(qty)));

export type CartAction =
  | { type: 'add'; id: string; qty?: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const qty = action.qty ?? 1;
      const existing = lines.find((l) => l.id === action.id);
      if (existing) {
        return lines.map((l) => (l.id === action.id ? { ...l, qty: clamp(l.qty + qty) } : l));
      }
      return [...lines, { id: action.id, qty: clamp(qty) }];
    }
    case 'setQty':
      if (action.qty < 1) return lines.filter((l) => l.id !== action.id);
      return lines.map((l) => (l.id === action.id ? { ...l, qty: clamp(action.qty) } : l));
    case 'remove':
      return lines.filter((l) => l.id !== action.id);
    case 'clear':
      return [];
  }
}

/** Subtotal em centavos; ignora itens que não existem mais no catálogo. */
export const cartSubtotal = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + (getProduct(l.id)?.price ?? 0) * l.qty, 0);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);

/** Valida dados vindos do localStorage, que podem estar corrompidos ou desatualizados. */
export function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (l): l is CartLine =>
        typeof l === 'object' && l !== null && typeof l.id === 'string' && typeof l.qty === 'number',
    )
    .filter((l) => getProduct(l.id))
    .map((l) => ({ id: l.id, qty: clamp(l.qty) }));
}
