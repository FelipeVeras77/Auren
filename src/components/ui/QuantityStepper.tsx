import { MAX_QTY } from '../../store/cart';
import { Icon } from './Icon';
import styles from './QuantityStepper.module.css';

interface Props {
  value: number;
  onChange: (qty: number) => void;
  /** Nome do produto, usado nos rótulos acessíveis. */
  label: string;
  min?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({ value, onChange, label, min = 1, size = 'md' }: Props) {
  return (
    <div className={`${styles.stepper} ${styles[size]}`} role="group" aria-label={`Quantidade de ${label}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Diminuir quantidade de ${label}`}
      >
        <Icon name="minus" size={16} />
      </button>
      <output aria-live="polite" aria-label={`${value} ${value === 1 ? 'unidade' : 'unidades'}`}>
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={`Aumentar quantidade de ${label}`}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
