import { useReveal } from '../../hooks/useReveal';
import { Hallmark } from '../ui/Hallmark';
import { Picture } from '../ui/Picture';
import { SectionHeading } from '../ui/SectionHeading';
import styles from './Materia.module.css';

const SPECS = [
  {
    term: 'Composição',
    text: '92,5% de prata pura e 7,5% de cobre. O cobre dá firmeza à liga sem apagar o brilho frio da prata.',
  },
  {
    term: 'Durabilidade',
    text: 'Mais resistente que a prata pura, mantém a forma e aceita novos polimentos por toda a vida da peça.',
  },
  {
    term: 'Cuidado',
    text: 'O escurecimento é natural e reversível: flanela macia, peça seca e guardada separada.',
  },
  {
    term: 'Design',
    text: 'Linhas que atravessam tendências — pensadas para combinar entre si e passar de geração em geração.',
  },
];

export function Materia() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section} aria-labelledby="materia-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SectionHeading
            tone="dark"
            index="03"
            eyebrow="A matéria"
            id="materia-title"
            title={
              <>
                A matéria <em>da Auren</em>
              </>
            }
            lede="Todas as peças são feitas em prata 925 — o padrão internacional da prata de lei, identificado pelo punção gravado em cada joia."
          />

          <figure className={styles.alloy}>
            <figcaption>
              <Hallmark tone="dark" /> Composição da liga
            </figcaption>
            <div className={styles.bar} role="img" aria-label="92,5% prata, 7,5% cobre">
              <span className={styles.silverPart} />
              <span className={styles.copperPart} />
            </div>
            <div className={styles.legend} aria-hidden="true">
              <span>Prata · 92,5%</span>
              <span>Cobre · 7,5%</span>
            </div>
          </figure>
        </div>

        <div ref={ref} className={styles.detail}>
          <figure className={styles.photo}>
            <Picture
              src="/images/editorial/materia.webp"
              alt="Dois anéis de prata de perfil liso, um apoiado no outro, sobre fundo branco-gelo"
              width={1400}
              height={1050}
              sizes="(max-width: 960px) 100vw, 50vw"
            />
          </figure>
          <dl className={styles.specs}>
            {SPECS.map((s, i) => (
              <div key={s.term}>
                <dt>
                  <span className={styles.specIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {s.term}
                </dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
