import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import { useShop } from '../../store/ShopContext';
import { Button } from '../ui/Button';
import { Hallmark } from '../ui/Hallmark';
import { Icon } from '../ui/Icon';
import styles from './Hero.module.css';

// O Three.js (~130 kB gzip) só é baixado depois da primeira pintura e fora do caminho crítico.
const SilverRing3D = lazy(() => import('./SilverRing3D'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Monta a cena 3D só quando o navegador estiver ocioso, sem competir com o conteúdo inicial. */
function useIdleMount(enabled: boolean) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const go = () => setReady(true);
    // Safari antigo não tem requestIdleCallback.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(go, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(go, 400);
    return () => window.clearTimeout(id);
  }, [enabled]);
  return ready;
}

export function Hero() {
  const { setFilter } = useShop();
  const reducedMotion = useReducedMotion();
  const [webgl] = useState(supportsWebGL);
  const mount3D = useIdleMount(!reducedMotion && webgl);
  const [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);

  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        {/* Pôster estático do mesmo anel: aparece de imediato e é a versão para movimento reduzido. */}
        <img
          className={`${styles.poster} ${live ? styles.posterHidden : ''}`}
          src="/images/hero-anel.webp"
          alt=""
          width={1412}
          height={1575}
          fetchPriority="high"
          decoding="async"
        />
        {mount3D && (
          <Suspense fallback={null}>
            <div className={`${styles.live} ${live ? styles.liveOn : ''}`}>
              <SilverRing3D onReady={onReady} />
            </div>
          </Suspense>
        )}
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <Hallmark tone="dark" /> Prata 925 · Coleção 2026
          </p>
          <h1 id="hero-title" className={styles.title}>
            Prata que acompanha <em>a sua luz.</em>
          </h1>
          <p className={styles.lede}>Peças em prata 925 desenhadas para permanecer — no tempo e na memória.</p>
          <div className={styles.ctas}>
            <Button href="#vitrine" tone="dark" withArrow onClick={() => setFilter('todos')}>
              Explorar coleção
            </Button>
            <Button href="#vitrine" variant="ghost" tone="dark" onClick={() => setFilter('novidades')}>
              Ver novidades
            </Button>
          </div>
        </div>

        <dl className={styles.spec} aria-label="Ficha técnica da prata Auren">
          <div>
            <dt>Liga</dt>
            <dd>Ag 925</dd>
          </div>
          <div>
            <dt>Prata pura</dt>
            <dd>92,5%</dd>
          </div>
          <div>
            <dt>Acabamento</dt>
            <dd>Polido à mão</dd>
          </div>
        </dl>

        <a href="#sobre" className={styles.scrollHint}>
          <span>Role para descobrir</span>
          <Icon name="arrowDown" size={16} />
        </a>
      </div>
    </section>
  );
}
