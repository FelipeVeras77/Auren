import { useState, type FormEvent } from 'react';
import { validateEmail } from '../../utils/validation';
import { Button } from '../ui/Button';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const message = validateEmail(email);
    setError(message);
    if (message) {
      setDone('');
      (e.currentTarget as HTMLFormElement).querySelector('input')?.focus();
      return;
    }
    setDone(`Pronto! Os próximos lançamentos da Auren chegarão em ${email.trim()}.`);
    setEmail('');
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>Carta Auren</p>
          <h2 id="newsletter-title" className={styles.title}>
            Receba lançamentos, histórias e <em>acesso antecipado.</em>
          </h2>
        </div>

        <form className={styles.form} onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className={styles.label}>
            Seu e-mail
          </label>
          <div className={styles.field}>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              aria-invalid={!!error}
              aria-describedby="newsletter-help newsletter-feedback"
              className={styles.input}
            />
            <Button type="submit" withArrow>
              Assinar
            </Button>
          </div>
          <p id="newsletter-help" className={styles.help}>
            Uma carta por mês, no máximo. Você cancela quando quiser.
          </p>
          <p
            id="newsletter-feedback"
            className={error ? styles.error : done ? styles.success : undefined}
            role={error ? 'alert' : 'status'}
            aria-live="polite"
          >
            {error || done}
          </p>
        </form>
      </div>
    </section>
  );
}
