import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { getProduct, type Category, type CollectionId } from '../data/products';
import type { InfoTopic } from '../data/info';
import { usePersistentState } from '../hooks/usePersistentState';
import { cartCount, cartReducer, cartSubtotal, sanitizeCart, type CartAction, type CartLine } from './cart';

export type Panel = 'cart' | 'search' | 'favorites' | 'account' | 'menu' | null;

/** Filtro da vitrine: todas, novidades, uma categoria ou uma coleção. */
export type CatalogFilter = 'todos' | 'novidades' | Category | `colecao:${CollectionId}`;

export interface Toast {
  id: number;
  message: string;
  action?: { label: string; onClick: () => void };
}

interface ShopState {
  cart: CartLine[];
  count: number;
  subtotal: number;
  dispatch: (action: CartAction) => void;
  addToCart: (id: string, qty?: number) => void;

  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, options?: { silent?: boolean }) => void;

  panel: Panel;
  openPanel: (panel: Exclude<Panel, null>) => void;
  closePanel: () => void;

  productId: string | null;
  openProduct: (id: string) => void;
  closeProduct: () => void;

  info: InfoTopic | null;
  openInfo: (topic: InfoTopic) => void;
  closeInfo: () => void;

  filter: CatalogFilter;
  setFilter: (filter: CatalogFilter) => void;

  toast: Toast | null;
  notify: (message: string, action?: Toast['action']) => void;
  dismissToast: () => void;
}

const ShopContext = createContext<ShopState | null>(null);

const sanitizeFavorites = (v: unknown) =>
  Array.isArray(v) ? v.filter((id): id is string => typeof id === 'string' && !!getProduct(id)) : [];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = usePersistentState<CartLine[]>('auren:cart', [], sanitizeCart);
  const [favorites, setFavorites] = usePersistentState<string[]>('auren:favorites', [], sanitizeFavorites);
  const [panel, setPanel] = useState<Panel>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoTopic | null>(null);
  const [filter, setFilter] = useState<CatalogFilter>('todos');
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const dispatch = useCallback((action: CartAction) => setCart((lines) => cartReducer(lines, action)), [setCart]);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const notify = useCallback((message: string, action?: Toast['action']) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, action });
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  }, []);

  const openPanel = useCallback((p: Exclude<Panel, null>) => {
    setProductId(null);
    setPanel(p);
  }, []);
  const closePanel = useCallback(() => setPanel(null), []);

  const openProduct = useCallback((id: string) => {
    setPanel(null);
    setProductId(id);
  }, []);
  const closeProduct = useCallback(() => setProductId(null), []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const product = getProduct(id);
      if (!product) return;
      dispatch({ type: 'add', id, qty });
      notify(`${product.name} adicionado à sacola.`, { label: 'Ver sacola', onClick: () => openPanel('cart') });
    },
    [dispatch, notify, openPanel],
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback(
    (id: string, options?: { silent?: boolean }) => {
      const product = getProduct(id);
      if (!product) return;
      const willAdd = !favorites.includes(id);
      setFavorites((list) => (willAdd ? [...list, id] : list.filter((f) => f !== id)));
      if (!options?.silent) {
        notify(willAdd ? `${product.name} salvo nos favoritos.` : `${product.name} removido dos favoritos.`);
      }
    },
    [favorites, setFavorites, notify],
  );

  const value = useMemo<ShopState>(
    () => ({
      cart,
      count: cartCount(cart),
      subtotal: cartSubtotal(cart),
      dispatch,
      addToCart,
      favorites,
      isFavorite,
      toggleFavorite,
      panel,
      openPanel,
      closePanel,
      productId,
      openProduct,
      closeProduct,
      info,
      openInfo: setInfo,
      closeInfo: () => setInfo(null),
      filter,
      setFilter,
      toast,
      notify,
      dismissToast,
    }),
    [cart, dispatch, addToCart, favorites, isFavorite, toggleFavorite, panel, openPanel, closePanel, productId, openProduct, closeProduct, info, filter, toast, notify, dismissToast],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop precisa estar dentro de <ShopProvider>');
  return ctx;
}
