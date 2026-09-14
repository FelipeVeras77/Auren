import { useEffect, useState } from 'react';

function read<T>(key: string, fallback: T, sanitize: (v: unknown) => T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : sanitize(JSON.parse(raw));
  } catch {
    return fallback;
  }
}

/** Estado espelhado no localStorage. Falhas de acesso (modo privado, cota) são ignoradas. */
export function usePersistentState<T>(key: string, fallback: T, sanitize: (v: unknown) => T) {
  const [state, setState] = useState<T>(() => read(key, fallback, sanitize));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* armazenamento indisponível: o estado continua funcionando em memória */
    }
  }, [key, state]);

  return [state, setState] as const;
}
