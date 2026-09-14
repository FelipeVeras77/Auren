import { formatPrice, type Product } from '../../data/products';
import { useShop } from '../../store/ShopContext';
import { Icon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import styles from './ProductCard.module.css';

const SIZES = '(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, openProduct } = useShop();
  const fav = isFavorite(product.id);
  const titleId = `produto-${product.id}`;

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        {/* Foto clicável só por conveniência do mouse; o controle acessível é o nome (h3). */}
        <div className={styles.mediaBtn} onClick={() => openProduct(product.id)}>
          <Picture
            className={styles.img}
            src={product.image.src}
            alt={product.image.alt}
            width={900}
            height={1125}
            sizes={SIZES}
          />
          {/* Segunda imagem (detalhe ampliado) revelada no hover/foco. */}
          <Picture
            className={`${styles.img} ${styles.detail}`}
            src={product.detailImage.src}
            alt=""
            width={900}
            height={1125}
            sizes={SIZES}
          />
        </div>

        {product.badge && <span className={styles.badge}>{product.badge}</span>}

        <button
          type="button"
          className={`${styles.fav} ${fav ? styles.favOn : ''}`}
          aria-pressed={fav}
          aria-label={fav ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}
          onClick={() => toggleFavorite(product.id)}
        >
          <Icon name="heart" filled={fav} size={18} />
        </button>
      </div>

      <div className={styles.info}>
        <h3 id={titleId} className={styles.name}>
          <button type="button" onClick={() => openProduct(product.id)} aria-haspopup="dialog">
            {product.name}
            <span className="visually-hidden">, ver detalhes</span>
          </button>
        </h3>
        <p className={styles.meta}>
          <span>{product.material}</span>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </p>
        <button
          type="button"
          className={styles.add}
          onClick={() => addToCart(product.id)}
          aria-label={`Adicionar ${product.name} à sacola`}
        >
          <Icon name="plus" size={16} />
          <span>Adicionar à sacola</span>
        </button>
      </div>
    </article>
  );
}
