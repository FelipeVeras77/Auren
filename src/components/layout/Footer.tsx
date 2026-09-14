import { WHATSAPP_EXAMPLE, type InfoTopic } from '../../data/info';
import { useShop } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import styles from './Footer.module.css';

const HELP: { topic: InfoTopic; label: string }[] = [
  { topic: 'atendimento', label: 'Fale conosco' },
  { topic: 'trocas', label: 'Trocas e devoluções' },
  { topic: 'envio', label: 'Envio e prazos' },
  { topic: 'tamanhos', label: 'Guia de tamanhos' },
  { topic: 'cuidados', label: 'Cuidados com a prata' },
];

export function Footer() {
  const { openInfo } = useShop();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.tagline}>Prata 925 desenhada para permanecer.</p>
          <a className={styles.whats} href={WHATSAPP_EXAMPLE.href} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" />
            <span>
              WhatsApp {WHATSAPP_EXAMPLE.display}
              <small>Número fictício, apenas exemplo</small>
            </span>
          </a>
        </div>

        <nav aria-labelledby="footer-inst" className={styles.col}>
          <h2 id="footer-inst">Institucional</h2>
          <ul>
            <li><a href="#sobre">Sobre a Auren</a></li>
            <li><a href="#colecoes">Coleções</a></li>
            <li><a href="#vitrine">Vitrine</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-help" className={styles.col}>
          <h2 id="footer-help">Atendimento</h2>
          <ul>
            {HELP.map((h) => (
              <li key={h.topic}>
                <button type="button" onClick={() => openInfo(h.topic)} aria-haspopup="dialog">
                  {h.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-social" className={styles.col}>
          <h2 id="footer-social">Redes sociais</h2>
          <ul>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={18} /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                <Icon name="pinterest" size={18} /> Pinterest
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        Auren
      </p>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Auren. Todos os direitos reservados.</p>
        <p>
          Fotografias:{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>{' '}
          (créditos no README)
        </p>
      </div>
    </footer>
  );
}
