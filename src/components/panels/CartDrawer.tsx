import { useState } from 'react';
import { formatPrice, getProduct } from '../../data/products';
import { useShop } from '../../store/ShopContext';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

export function CartDrawer() {
  const { panel, closePanel, cart, count, subtotal, dispatch } = useShop();
  const [status, setStatus] = useState('');
  const [checkout, setCheckout] = useState(false);

  const close = () => {
    setStatus('');
    setCheckout(false);
    closePanel();
  };

  return (
    <Sheet
      open={panel === 'cart'}
      onClose={close}
      title={
        <>
          Sacola{' '}
          <small className={styles.muted}>
            ({count} {count === 1 ? 'item' : 'itens'})
          </small>
        </>
      }
      footer={
        cart.length > 0 && (
          <>
            <div className={styles.row}>
              <span>Subtotal</span>
              <span className={styles.subtotal} data-testid="subtotal">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className={styles.note}>Frete e prazo calculados na finalização. Trocas em até 30 dias.</p>
            <Button full withArrow onClick={() => setCheckout(true)}>
              Finalizar compra
            </Button>
            {checkout && (
              <p className={styles.status} role="status">
                Esta é uma loja de demonstração: o pagamento ainda não está disponível. Sua sacola continua salva
                neste navegador.
              </p>
            )}
          </>
        )
      }
    >
      <p className="visually-hidden" role="status" aria-live="polite">
        {status}
      </p>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <h3>Sua sacola está vazia.</h3>
          <p>Escolha uma peça na vitrine — ela fica guardada aqui mesmo se você fechar o navegador.</p>
          <Button href="#vitrine" variant="ghost" withArrow onClick={close}>
            Ver a vitrine
          </Button>
        </div>
      ) : (
        <ul className={styles.list} aria-label="Itens na sacola">
          {cart.map((line) => {
            const p = getProduct(line.id);
            if (!p) return null;
            return (
              <li key={line.id} className={styles.line}>
                <img className={styles.thumb} src={p.image.src.replace('.webp', '-sm.webp')} alt="" width={80} height={100} />
                <div className={styles.lineBody}>
                  <div className={styles.lineTop}>
                    <p className={styles.lineName}>{p.name}</p>
                    <p className={styles.amount}>{formatPrice(p.price * line.qty)}</p>
                  </div>
                  <p className={styles.muted}>
                    {p.material} · {formatPrice(p.price)} cada
                  </p>
                  <div className={styles.lineActions}>
                    <QuantityStepper
                      size="sm"
                      value={line.qty}
                      label={p.name}
                      onChange={(qty) => dispatch({ type: 'setQty', id: p.id, qty })}
                    />
                    <button
                      type="button"
                      className={styles.textBtn}
                      aria-label={`Remover ${p.name} da sacola`}
                      onClick={() => {
                        dispatch({ type: 'remove', id: p.id });
                        setStatus(`${p.name} removido da sacola.`);
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Sheet>
  );
}
