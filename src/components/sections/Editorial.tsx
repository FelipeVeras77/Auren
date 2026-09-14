import { useReveal } from '../../hooks/useReveal';
import { Picture } from '../ui/Picture';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Editorial.module.css';

const FACTS = [
  { value: '925', label: 'milésimos de prata pura em cada peça, com certificado' },
  { value: '3', label: 'etapas de polimento feitas à mão, uma a uma' },
  { value: '1 ano', label: 'de garantia e revitalização gratuita do brilho' },
];

export function Editorial() {
  const textRef = useReveal<HTMLDivElement>();

  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.figure}>
          <Picture
            src="/images/editorial/destaque.webp"
            alt="Retrato em preto e branco de uma mulher de olhar sereno usando um colar de prata fino"
            width={1200}
            height={1500}
            sizes="(max-width: 860px) 100vw, 45vw"
          />
          <figcaption>
            <span>Campanha Luz cotidiana</span>
            <span>2026</span>
          </figcaption>
        </figure>

        <div ref={textRef} className={styles.text}>
          <SectionHeading
            index="01"
            eyebrow="Sobre a Auren"
            id="sobre-title"
            title={
              <>
                Cada curva é pensada para refletir <em>o seu jeito de estar no mundo.</em>
              </>
            }
          />
          <div className={styles.body}>
            <p>
              A Auren nasce do desenho: cada peça começa como um traço à mão, é refinada em modelagem digital e só
              então ganha forma em prata 925 — a liga que une o brilho da prata pura à resistência necessária para o
              uso diário.
            </p>
            <p>
              Produzimos em pequenos lotes, com ourives parceiros que acompanham cada etapa, do molde ao polimento
              final. É um ritmo mais lento, escolhido de propósito: joias feitas para permanecer.
            </p>
          </div>
          <ul className={styles.facts}>
            {FACTS.map((f) => (
              <li key={f.value}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
