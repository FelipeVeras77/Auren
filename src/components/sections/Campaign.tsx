import { Button } from '../ui/Button';
import { Picture } from '../ui/Picture';
import styles from './Campaign.module.css';

export function Campaign() {
  return (
    <section className={styles.section} aria-labelledby="campanha-title">
      <Picture
        className={styles.bg}
        src="/images/editorial/campanha.webp"
        alt="Colo e pescoço em preto e branco com uma corrente de prata delicada, a mão tocando levemente o fecho"
        width={2400}
        height={1100}
        sizes="100vw"
      />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>Campanha 2026</p>
        <h2 id="campanha-title" className={styles.title}>
          Feita para durar <em>além da ocasião.</em>
        </h2>
        <p className={styles.lede}>
          Joias que chegam num dia especial e ficam para todos os outros — no trabalho, no fim de semana, na
          lembrança.
        </p>
        <Button href="#sobre" tone="dark" withArrow>
          Conhecer a Auren
        </Button>
      </div>
    </section>
  );
}
