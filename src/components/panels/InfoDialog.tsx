import { INFO } from '../../data/info';
import { useShop } from '../../store/ShopContext';
import { Sheet } from '../ui/Sheet';
import styles from './panels.module.css';

export function InfoDialog() {
  const { info, closeInfo } = useShop();
  const content = info ? INFO[info] : null;

  return (
    <Sheet open={!!content} onClose={closeInfo} side="center" size="md" title={content?.title ?? ''}>
      {content && (
        <>
          <p className={styles.infoIntro}>{content.intro}</p>
          <dl className={styles.infoList}>
            {content.items.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </Sheet>
  );
}
