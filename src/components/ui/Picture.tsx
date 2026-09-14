import type { ImgHTMLAttributes } from 'react';

/** Imagem responsiva: toda imagem do pipeline tem uma versão "-sm" com metade da largura. */
const srcSetFor =(src: string, width: number) =>
  `${src.replace(/\.webp$/, '-sm.webp')} ${Math.round(width / 2)}w, ${src} ${width}w`;

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
}

export function Picture({ src, alt, width, height, sizes, priority, ...rest }: Props) {
  return (
    <img
      src={src}
      srcSet={srcSetFor(src, width)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      {...rest}
    />
  );
}
