# Auren — acessórios em prata 925

Loja conceitual de joias em prata com hero 3D, vitrine filtrável, sacola lateral, favoritos, busca e
detalhe de produto. Interface em português (pt-BR).

## Como executar

Requer Node.js 20+.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
npm run lint       # ESLint
npm test           # Vitest (unidade + integração com Testing Library)
npm run images     # regenera as imagens de public/images a partir do Unsplash
```

## Stack e dependências

| Pacote | Por quê |
| --- | --- |
| React 19 + Vite + TypeScript | Base do projeto: componentes reutilizáveis, build rápido, tipagem. |
| `three` | Renderiza o anel de prata da hero (reflexos PBR, iluminação de estúdio gerada em código). Carregado sob demanda, num chunk separado, só depois da primeira pintura. |
| `sharp` (dev) | Usado apenas pelo `npm run images` para recortar, tratar e converter as fotos em WebP. Não entra no bundle. |
| Vitest, Testing Library, jsdom (dev) | Testes do reducer da sacola, do catálogo e do fluxo de compra. |

`@react-three/fiber` foi avaliado, mas a versão atual exige React < 19.3; em vez de rebaixar o React ou forçar
peer dependencies, a cena usa Three.js diretamente dentro de um componente React (`SilverRing3D.tsx`), o que
também reduz o bundle.

Não há biblioteca de UI ou CSS: estilos em CSS Modules com tokens em `src/styles/global.css`.

## Estrutura

```
src/
  data/            products.ts (catálogo, coleções, preço em centavos), info.ts (trocas, cuidados…)
  store/           ShopContext (sacola, favoritos, painéis, filtro, avisos), cart.ts, catalog.ts
  hooks/           persistência em localStorage, prefers-reduced-motion, revelação ao rolar
  components/
    ui/            Button, IconButton, Icon, Sheet (<dialog> nativo), Picture, SectionHeading, Hallmark, QuantityStepper
    layout/        Header, Footer
    hero/          Hero + SilverRing3D (Three.js, lazy)
    product/       ProductCard, Showcase (vitrine + filtros), ProductDialog
    panels/        CartDrawer, FavoritesDrawer, SearchDialog, AccountPanel, MobileMenu, InfoDialog, ToastRegion
    sections/      Editorial, Materia, Collections, Campaign, Newsletter
scripts/images.mjs pipeline de imagens (download, recorte, tratamento de cor, WebP em 2 tamanhos)
public/images/     imagens otimizadas (products/, editorial/, hero-anel.webp)
```

## Decisões de acessibilidade e desempenho

- Gavetas e modais usam `<dialog>` com `showModal()`: foco preso, `Esc`, fundo inerte e retorno de foco nativos.
- Foco visível em azul-luz (`#8DB8E8`), alvos de toque de 44 px, link "Pular para o conteúdo", regiões `aria-live`
  para sacola, busca e newsletter.
- `prefers-reduced-motion`: a cena 3D não é montada; aparece o pôster estático do mesmo anel e as transições são
  desativadas. O mesmo pôster é o fallback sem WebGL e aparece enquanto o 3D carrega.
- O loop de renderização pausa quando a hero sai da tela ou a aba fica oculta; pixel ratio limitado a 1,75.
- Imagens WebP com `srcset` (duas larguras), `loading="lazy"` fora da primeira dobra e dimensões explícitas.
- Fontes auto-hospedadas (Instrument Serif e Hanken Grotesk, subset latino) com `preload` e `font-display: swap`.

## Imagens

As fotografias vêm do [Unsplash](https://unsplash.com) (licença Unsplash: uso comercial gratuito, sem atribuição
obrigatória — os créditos abaixo são cortesia). **São fotos ilustrativas de banco de imagens, não fotos reais de
produtos Auren.** Todas receberam o mesmo tratamento (dessaturação e leve tom azul-prata) em `scripts/images.mjs`
para formar um conjunto coerente. Os segundos quadros dos cards (`*-detalhe.webp`) são recortes ampliados da mesma
foto.

| Arquivo | Foto no Unsplash | Autor |
| --- | --- | --- |
| products/anel-eclipse, editorial/colecao-formas-do-ceu | [5JgjeQzzftU](https://unsplash.com/photos/5JgjeQzzftU) | ver página |
| products/colar-lume | [2t7MhIxLMWU](https://unsplash.com/photos/2t7MhIxLMWU) | Amr Taha |
| products/brinco-orbital | [i8lhklBB-CY](https://unsplash.com/photos/i8lhklBB-CY) | COPPERTIST WU |
| products/pulseira-nebula | [87iLRaZlyjg](https://unsplash.com/photos/87iLRaZlyjg) | K8 |
| products/anel-vertice | [Zyp3t67rrP4](https://unsplash.com/photos/Zyp3t67rrP4) | Amanda Mocci |
| products/argola-aura | [2mK0wrw3E28](https://unsplash.com/photos/2mK0wrw3E28) | Kasia Mizera |
| products/colar-horizonte | [zABqgk2tIoE](https://unsplash.com/photos/zABqgk2tIoE) | COPPERTIST WU |
| products/pingente-solis | [olXalucC1dA](https://unsplash.com/photos/olXalucC1dA) | ver página |
| editorial/destaque | [1fgLmEkIHt0](https://unsplash.com/photos/1fgLmEkIHt0) | Mohammadreza alidoost |
| editorial/campanha | [sCdEeaijBb0](https://unsplash.com/photos/sCdEeaijBb0) | COPPERTIST WU |
| editorial/colecao-luz-cotidiana | [eGe3kF2rOfI](https://unsplash.com/photos/eGe3kF2rOfI) | lilartsy |
| editorial/colecao-essenciais | [QhRAG-FuZ-4](https://unsplash.com/photos/QhRAG-FuZ-4) | COPPERTIST WU |
| editorial/materia | [xD_XnntwCw0](https://unsplash.com/photos/xD_XnntwCw0) | ver página |

`public/images/hero-anel.webp` é um quadro renderizado da própria cena 3D, usado como pôster/fallback.

## Limitações conhecidas

- Não há backend: pagamento, conta de cliente e envio da newsletter são simulados (com mensagens honestas na
  interface). Sacola e favoritos persistem apenas no `localStorage` do navegador.
- Algumas fotos de banco podem mostrar metais que não são prata; o tratamento de cor unifica o conjunto, mas numa
  loja real elas devem ser substituídas por fotografia dos produtos.
- O número de WhatsApp (`+55 11 90000-0000`) e os links de redes sociais são exemplos.
