import { useState } from 'react';
import { CARE_TIPS, formatPrice, getProduct, type Product } from '../../data/products';
import { categoryLabel, collectionOf } from '../../store/catalog';
import { useShop } from '../../store/ShopContext';
import { Button } from '../ui/Button';
import { Hallmark } from '../ui/Hallmark';
import { Icon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { QuantityStepper } from '../ui/QuantityStepper';
import { Sheet } from '../ui/Sheet';
import styles from './ProductDialog.module.css';

export function ProductDialog() {
  const { productId, closeProduct } = useShop();
  const product = productId ? getProduct(productId) : undefined;

  return (
    <Sheet open={!!product} onClose={closeProduct} side="center" size="lg" title={product?.name ?? ''}>
      {product && <ProductDetail key={product.id} product={product} />}
    </Sheet>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite, closeProduct } = useShop();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const images = [product.image, product.detailImage];
  const fav = isFavorite(product.id);
  const collection = collectionOf(product);

  return (
    <div className={styles.layout}>
      <div className={styles.gallery}>
        <div className={styles.stage}>
          <Picture
            key={images[active].src}
            className={styles.main}
            src={images[active].src}
            alt={images[active].alt}
            width={900}
            height={1125}
            sizes="(max-width: 640px) 100vw, 32rem"
            priority
          />
        </div>
        <div className={styles.thumbs} role="group" aria-label="Imagens do produto">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={styles.thumb}
              aria-pressed={active === i}
              aria-label={i === 0 ? 'Ver foto principal' : 'Ver detalhe ampliado'}
              onClick={() => setActive(i)}
            >
              <img src={image.src.replace('.webp', '-sm.webp')} alt="" width={90} height={112} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.crumbs}>
          {categoryLabel(product.category)}
          {collection && <> · {collection.name}</>}
        </p>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <p className={styles.material}>
          <Hallmark /> {product.material} · certificado de autenticidade
        </p>

        <p className={styles.desc}>{product.description}</p>

        <ul className={styles.details}>
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className={styles.buy}>
          <QuantityStepper value={qty} onChange={(q) => setQty(Math.max(1, q))} label={product.name} />
          <Button
            withArrow
            className={styles.addBtn}
            onClick={() => {
              addToCart(product.id, qty);
              closeProduct();
            }}
          >
            Adicionar à sacola
          </Button>
        </div>

        <button
          type="button"
          className={styles.fav}
          aria-pressed={fav}
          onClick={() => toggleFavorite(product.id, { silent: true })}
        >
          <Icon name="heart" filled={fav} size={18} />
          {fav ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}
        </button>

        <details className={styles.care}>
          <summary>Cuidados com a prata</summary>
          <ul>
            {CARE_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
