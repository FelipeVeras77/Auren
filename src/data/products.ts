export type Category = 'aneis' | 'colares' | 'brincos' | 'pulseiras' | 'pingentes';

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  /** Preço em centavos, evita erros de ponto flutuante no subtotal. */
  price: number;
  material: string;
  badge?: 'Novo' | 'Mais amado';
  collection: CollectionId;
  summary: string;
  description: string;
  details: string[];
  image: ProductImage;
  detailImage: ProductImage;
}

export type CollectionId = 'luz-cotidiana' | 'formas-do-ceu' | 'essenciais';

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'aneis', label: 'Anéis' },
  { id: 'colares', label: 'Colares' },
  { id: 'brincos', label: 'Brincos' },
  { id: 'pulseiras', label: 'Pulseiras' },
  { id: 'pingentes', label: 'Pingentes' },
];

export const MATERIAL = 'Prata 925';

export const CARE_TIPS = [
  'Guarde separada, no saquinho antiatrito que acompanha a peça.',
  'Evite contato com perfume, cloro, água do mar e cremes.',
  'Limpe com flanela macia e seca; nunca use pasta de dente ou abrasivos.',
];

const img = (id: string, alt: string, detailAlt: string) => ({
  image: { src: `/images/products/${id}.webp`, alt },
  detailImage: { src: `/images/products/${id}-detalhe.webp`, alt: detailAlt },
});

export const PRODUCTS: Product[] = [
  {
    id: 'anel-eclipse',
    name: 'Anel Eclipse',
    category: 'aneis',
    price: 18900,
    material: MATERIAL,
    badge: 'Mais amado',
    collection: 'formas-do-ceu',
    summary: 'Aro largo polido, com uma pedra azul-noite que encobre a luz.',
    description:
      'Inspirado no instante em que a lua cobre o sol, o Eclipse combina um aro largo de superfície espelhada com uma pedra azul-noite cravada entre granulados de prata. Presença marcante, conforto para o dia inteiro.',
    details: ['Aro de 9 mm', 'Pedra azul-noite em cravação de garras', 'Tamanhos 12 a 26'],
    ...img(
      'anel-eclipse',
      'Anel largo de prata polida com pedra azul-noite cercada de granulados, sob luz fria',
      'Detalhe ampliado da pedra azul-noite e dos granulados do Anel Eclipse',
    ),
  },
  {
    id: 'colar-lume',
    name: 'Colar Lume',
    category: 'colares',
    price: 26900,
    material: MATERIAL,
    badge: 'Novo',
    collection: 'luz-cotidiana',
    summary: 'Corrente fina com um ponto de luz que repousa sobre a clavícula.',
    description:
      'Uma corrente delicada e um trevo de quatro pétalas em ônix, contornado por micro zircônias e com um ponto de brilho ao centro. Discreto de dia, acende com a luz da noite.',
    details: ['Corrente de 45 cm com extensor de 5 cm', 'Ônix e zircônias', 'Fecho lagosta'],
    ...img(
      'colar-lume',
      'Colar de prata com pingente de trevo escuro contornado por pequenas pedras, sobre fundo preto',
      'Close do pingente do Colar Lume, com as zircônias refletindo a luz',
    ),
  },
  {
    id: 'brinco-orbital',
    name: 'Brinco Orbital',
    category: 'brincos',
    price: 15900,
    material: MATERIAL,
    badge: 'Novo',
    collection: 'formas-do-ceu',
    summary: 'Argolas que se fecham sobre si mesmas, como uma órbita completa.',
    description:
      'Inspirado no ouroboros, cada argola é uma serpente de escamas cinzeladas que morde a própria cauda — um ciclo sem começo nem fim. O fecho articulado fica escondido no desenho.',
    details: ['Diâmetro de 18 mm', 'Escamas cinzeladas', 'Fecho articulado'],
    ...img(
      'brinco-orbital',
      'Argolas de prata em forma de serpente com escamas cinzeladas, sobre fundo branco-gelo',
      'Detalhe da cabeça e das escamas cinzeladas do Brinco Orbital',
    ),
  },
  {
    id: 'pulseira-nebula',
    name: 'Pulseira Nébula',
    category: 'pulseiras',
    price: 21900,
    material: MATERIAL,
    collection: 'luz-cotidiana',
    summary: 'Elos soltos e dois corações que balançam a cada gesto.',
    description:
      'Corrente de elos em prata maciça com duas medalhas em forma de coração — uma polida, pronta para gravação, e outra em esmalte escuro. Leve, sonora e feita para ser usada todo dia.',
    details: ['Comprimento de 19 cm', 'Medalha gravável', 'Fecho lagosta'],
    ...img(
      'pulseira-nebula',
      'Pulseira de corrente de prata com pingentes de coração em um pulso erguido, com a cidade desfocada ao fundo',
      'Detalhe da medalha de coração gravada da Pulseira Nébula',
    ),
  },
  {
    id: 'anel-vertice',
    name: 'Anel Vértice',
    category: 'aneis',
    price: 17900,
    material: MATERIAL,
    collection: 'essenciais',
    summary: 'Linhas retas que se encontram num ponto preciso de brilho.',
    description:
      'Um aro de perfil plano com arestas vivas, pensado para ser usado sozinho ou empilhado. A geometria limpa conversa com qualquer outra peça.',
    details: ['Aro de 3 mm', 'Perfil plano com arestas vivas', 'Tamanhos 10 a 28'],
    ...img(
      'anel-vertice',
      'Dois anéis de prata de perfil plano pousados sobre uma folha escura',
      'Detalhe das arestas polidas do Anel Vértice',
    ),
  },
  {
    id: 'argola-aura',
    name: 'Argola Aura',
    category: 'brincos',
    price: 14900,
    material: MATERIAL,
    badge: 'Mais amado',
    collection: 'essenciais',
    summary: 'A argola lisa que envolve o rosto com um halo de luz.',
    description:
      'Tubo de prata polida em curva perfeita. Leve o bastante para o dia inteiro, presente o bastante para a noite.',
    details: ['Diâmetro de 30 mm', 'Tubo de 2 mm', 'Fecho de pino articulado'],
    ...img(
      'argola-aura',
      'Argola de prata polida em uso, vista de perfil contra fundo escuro',
      'Detalhe da curva polida da Argola Aura',
    ),
  },
  {
    id: 'colar-horizonte',
    name: 'Colar Horizonte',
    category: 'colares',
    price: 28900,
    material: MATERIAL,
    collection: 'essenciais',
    summary: 'Corrente grumet de presença firme, com a linha contínua de um horizonte.',
    description:
      'Elos grumet batidos e polidos um a um, formando uma linha de luz contínua. Uma peça de base que atravessa estações.',
    details: ['Corrente de 50 cm', 'Elos grumet de 5 mm', 'Fecho lagosta reforçado'],
    ...img(
      'colar-horizonte',
      'Corrente grumet de prata disposta em curva sobre fundo preto',
      'Detalhe dos elos grumet polidos do Colar Horizonte',
    ),
  },
  {
    id: 'pingente-solis',
    name: 'Pingente Sólis',
    category: 'pingentes',
    price: 12900,
    material: MATERIAL,
    collection: 'formas-do-ceu',
    summary: 'Duas órbitas entrelaçadas num pingente escultórico.',
    description:
      'Duas voltas de prata texturizada que se cruzam como trajetórias solares. Compatível com correntes de até 3 mm; corrente vendida separadamente.',
    details: ['Altura de 28 mm', 'Textura trabalhada à mão', 'Argola interna de 4 mm'],
    ...img(
      'pingente-solis',
      'Pingente escultórico de prata com duas voltas entrelaçadas, sobre fundo preto',
      'Detalhe da textura do Pingente Sólis',
    ),
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export interface Collection {
  id: CollectionId;
  name: string;
  lede: string;
  image: ProductImage;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'luz-cotidiana',
    name: 'Luz cotidiana',
    lede: 'Peças leves para o gesto de todo dia — do café ao último compromisso.',
    image: {
      src: '/images/editorial/colecao-luz-cotidiana.webp',
      alt: 'Mãos com anéis finos de prata em luz clara e difusa',
    },
  },
  {
    id: 'formas-do-ceu',
    name: 'Formas do céu',
    lede: 'Órbitas, eclipses e trajetórias traduzidas em curvas de prata.',
    image: {
      src: '/images/editorial/colecao-formas-do-ceu.webp',
      alt: 'Anéis de prata trabalhados empilhados em luz fria e azulada',
    },
  },
  {
    id: 'essenciais',
    name: 'Essenciais Auren',
    lede: 'A base de qualquer composição: linhas puras, brilho honesto.',
    image: {
      src: '/images/editorial/colecao-essenciais.webp',
      alt: 'Corrente de prata grumet sobre camiseta preta',
    },
  },
];

export const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
