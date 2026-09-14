/**
 * Pipeline de imagens da Auren.
 *
 * Baixa as fotos originais do Unsplash (licença Unsplash: uso comercial livre),
 * recorta, aplica o tratamento de cor da marca (prata fria, pouca saturação) e
 * exporta WebP em dois tamanhos para public/images.
 *
 * Uso: npm run images   (os originais ficam em cache em scripts/.cache)
 */
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cacheDir = join(root, 'scripts', '.cache');
const outDir = join(root, 'public', 'images');

/**
 * crop: região [left, top, width, height] em frações (0–1) da foto original;
 * sem crop, o sharp escolhe a região de maior interesse ("attention").
 * detail: região ampliada usada como segunda imagem no hover do card.
 */
export const IMAGES = [
  // Produtos — 4:5
  // Mesmo original da coleção "Formas do céu": o produto é um recorte do anel largo.
  { out: 'products/anel-eclipse', unsplash: '5JgjeQzzftU', photo: 'photo-1656010280156-fa8c1793c235', author: 'Unsplash', size: [900, 1125], crop: [0.33, 0.05, 0.4, 0.75], detail: [0.52, 0.3, 0.16, 0.32] },
  { out: 'products/colar-lume', unsplash: '2t7MhIxLMWU', photo: 'photo-1612011213611-ff46ab689475', author: 'Amr Taha', size: [900, 1125], crop: [0, 0.14, 0.74, 0.585], detail: [0.24, 0.4, 0.36, 0.28] },
  { out: 'products/brinco-orbital', unsplash: 'i8lhklBB-CY', photo: 'photo-1677913842001-3941986ca979', author: 'COPPERTIST WU', size: [900, 1125], detail: [0.25, 0.25, 0.3, 0.45] },
  { out: 'products/pulseira-nebula', unsplash: '87iLRaZlyjg', photo: 'photo-1559329145-ecbff8d919b2', author: 'K8', size: [900, 1125], detail: [0.45, 0.62, 0.45, 0.3] },
  { out: 'products/anel-vertice', unsplash: 'Zyp3t67rrP4', photo: 'photo-1550368566-f9cc32d7392d', author: 'Amanda Mocci', size: [900, 1125], detail: [0.4, 0.4, 0.25, 0.37] },
  { out: 'products/argola-aura', unsplash: '2mK0wrw3E28', photo: 'photo-1671741190703-baf428d61131', author: 'Kasia Mizera', size: [900, 1125], detail: [0, 0.5, 0.45, 0.3] },
  { out: 'products/colar-horizonte', unsplash: 'zABqgk2tIoE', photo: 'photo-1679973299029-eaa2f8ae11b2', author: 'COPPERTIST WU', size: [900, 1125], crop: [0.14, 0, 0.72, 0.62], fit: 'contain', detail: [0.4, 0.25, 0.2, 0.37] },
  { out: 'products/pingente-solis', unsplash: 'olXalucC1dA', photo: 'photo-1677201795545-753261807b2c', author: 'COPPERTIST WU', size: [900, 1125], detail: [0.3, 0.45, 0.4, 0.3] },
  // Editoriais
  { out: 'editorial/destaque', unsplash: '1fgLmEkIHt0', photo: 'photo-1692456450025-6593434a2aa2', author: 'Mohammadreza alidoost', size: [1200, 1500] },
  { out: 'editorial/campanha', unsplash: 'sCdEeaijBb0', photo: 'photo-1680068098871-f196518eb6c4', author: 'COPPERTIST WU', size: [2400, 1100] },
  { out: 'editorial/colecao-luz-cotidiana', unsplash: 'eGe3kF2rOfI', photo: 'photo-1610694954999-2237cbeff04e', author: 'lilartsy', size: [1000, 1333] },
  { out: 'editorial/colecao-formas-do-ceu', unsplash: '5JgjeQzzftU', photo: 'photo-1656010280156-fa8c1793c235', author: 'Unsplash+ / autor na página', size: [1400, 1050] },
  { out: 'editorial/colecao-essenciais', unsplash: 'QhRAG-FuZ-4', photo: 'photo-1679973296637-1411c1d25c7e', author: 'COPPERTIST WU', size: [1000, 1000] },
  { out: 'editorial/materia', unsplash: 'xD_XnntwCw0', photo: 'photo-1565206077212-4eb48d41f54b', author: 'autor na página', size: [1400, 1050] },
];

/** Tratamento da marca: dessatura e puxa levemente para o azul-prata. */
const grade = (img) =>
  img
    .modulate({ saturation: 0.18, brightness: 1.0 })
    .recomb([
      [0.96, 0, 0],
      [0, 0.99, 0],
      [0, 0, 1.07],
    ])
    .linear(1.04, -4);

async function source(entry) {
  mkdirSync(cacheDir, { recursive: true });
  const file = join(cacheDir, `${entry.unsplash}.jpg`);
  if (!existsSync(file)) {
    const res = await fetch(`https://images.unsplash.com/${entry.photo}?w=2400&q=90&fm=jpg`);
    if (!res.ok) throw new Error(`Falha ao baixar ${entry.unsplash}: ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

async function region(file, frac) {
  const { width, height } = await sharp(file).metadata();
  const [l, t, w, h] = frac;
  return {
    left: Math.round(l * width),
    top: Math.round(t * height),
    width: Math.round(w * width),
    height: Math.round(h * height),
  };
}

async function write(pipeline, out, [w, h], fit = 'cover') {
  const base = join(outDir, out);
  mkdirSync(dirname(base), { recursive: true });
  const resize = fit === 'contain' ? { fit, background: '#000000' } : { fit, position: 'attention' };
  const buf = await grade(pipeline.clone().flatten({ background: '#000000' }).resize(w, h, resize)).toBuffer();
  await sharp(buf).webp({ quality: 74 }).toFile(`${base}.webp`);
  await sharp(buf).resize(Math.round(w / 2)).webp({ quality: 72 }).toFile(`${base}-sm.webp`);
}

for (const entry of IMAGES) {
  const file = await source(entry);
  const main = sharp(file);
  if (entry.crop) main.extract(await region(file, entry.crop));
  await write(main, entry.out, entry.size, entry.fit);
  if (entry.detail) {
    const detail = sharp(file).extract(await region(file, entry.detail));
    await write(detail, entry.out.replace(/$/, '-detalhe'), entry.size);
  }
  console.log('✓', entry.out);
}
