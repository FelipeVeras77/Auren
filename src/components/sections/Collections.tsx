import { COLLECTIONS } from '../../data/products';
import { filterProducts } from '../../store/catalog';
import { useShop } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Collections.module.css';

const LAYOUT: Record<string, { cls: string; width: number; height: number; sizes: string }> = {
  'luz-cotidiana': { cls: styles.tall, width: 1000, height: 1333, sizes: '(max-width: 860px) 100vw, 42vw' },
  'formas-do-ceu': { cls: styles.wide, width: 1400, height: 1050, sizes: '(max-width: 860px) 100vw, 55vw' },
  essenciais: { cls: styles.square, width: 1000, height: 1000, sizes: '(max-width: 860px) 100vw, 32vw' },
};

export function Collections() {
  const { setFilter } = useShop();

  return (
    <section id="colecoes" className={styles.section} aria-labelledby="colecoes-title">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Coleções"
          id="colecoes-title"
          title={
            <>
              Três maneiras de <em>vestir a luz</em>
            </>
          }
        />

        <div className={styles.grid}>
          {COLLECTIONS.map((c, i) => {
            const layout = LAYOUT[c.id];
            const count = filterProducts(`colecao:${c.id}`).length;
            return (
              <article
                key={c.id}
                id={c.id === 'essenciais' ? 'essenciais' : undefined}
                className={`${styles.item} ${layout.cls}`}
                aria-labelledby={`colecao-${c.id}`}
              >
                <div className={styles.media}>
                  <Picture src={c.image.src} alt={c.image.alt} width={layout.width} height={layout.height} sizes={layout.sizes} />
                </div>
                <div className={styles.caption}>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 id={`colecao-${c.id}`}>{c.name}</h3>
                    <p>{c.lede}</p>
                  </div>
                  <a
                    href="#vitrine"
                    className={styles.link}
                    onClick={() => setFilter(`colecao:${c.id}`)}
                  >
                    Ver {count} {count === 1 ? 'peça' : 'peças'}
                    <span className="visually-hidden"> da coleção {c.name}</span>
                    <Icon name="arrow" size={18} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
