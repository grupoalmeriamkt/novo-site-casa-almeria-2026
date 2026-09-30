# Casa Almeria — site

Next.js 16 (App Router) · React 19 · TypeScript · GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG, Draggable, Inertia).
Sem Three.js, WebGL, Framer Motion ou Lenis ([brief §28](docs/brief.md)).

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build && npm run start
```

## Documentos

- [docs/brief.md](docs/brief.md) — brief completo (fonte de verdade)
- [docs/decisoes.md](docs/decisoes.md) — decisões tomadas depois do brief
- [docs/pedidos-cliente.md](docs/pedidos-cliente.md) — o que falta receber da Casa e da Cápsula
- [docs/assets.md](docs/assets.md) — como os vetores foram extraídos do manual e como regenerar

## Onde está cada coisa

```
src/
  app/                 rotas: / /menus /encomendas /unidades /sobre /contato, sitemap, robots
  content/
    site.ts            unidades, links (Get In, vendas, iFood, WhatsApp, Maps), navegação, camada Pedir
    home.ts            textos: horas do dia, categorias do menu, manifesto, frases da xícara
    media.ts           acervo por papel narrativo — cada slot descreve a foto que falta
  brand/vectors.ts     logo, selo e ilustrações animáveis (GERADO — não editar)
  motion/              camada de motion (nenhum componente importa gsap direto)
    config.ts          tokens: easings, durações, planos de profundidade, intensidades, breakpoints
    gsap.ts            registro único dos plugins
    choreography.ts    roda cada seção dentro de gsap.matchMedia (desktop/tablet/mobile/reduced)
    reveal.ts          decoradores por data-atributo (data-split, data-reveal, data-image-reveal…)
    text.ts image.ts parallax.ts pointer.ts magnetic.ts draggable.ts ambient.ts scroll.ts brand.ts
    choreographies/    uma coreografia por seção (hero, anyHour, territories, fromOurHouse, houses, manifesto, footer)
  components/
    motion/            Choreography (liga seção → coreografia), MotionRoot (scroll, tema do header)
    brand/             Logo, Selo, Art (SVG inline)
    media/Media.tsx    foto/vídeo real ou placeholder com direção de arte
    layout/            Header (+ camada Pedir), Footer
    sections/          seções da Home e das páginas
  styles/tokens.css    tokens de design (cor, tipo, espaço, grid, raio, ratios, z-index, motion)
```

## Princípios de implementação

- **Motion sobre o HTML.** As seções são renderizadas no servidor e funcionam sem JS. Elas expõem ganchos `data-*`, e a coreografia da seção aplica o movimento por cima.
- **Três produtos.** O desktop tem parallax, ponteiro, magnetismo e palco fixo. O tablet usa menos camadas. O mobile tem scroll nativo, swipe e line reveals. Com `prefers-reduced-motion` não há parallax, loops nem coreografias longas.
- **Performance.** Só transform, opacity e clip-path. Ponteiro via `quickTo`, com retângulo medido na entrada e nunca no scroll. Loops ambientais rodam num ticker único e pausam fora da tela. `ScrollTrigger.refresh()` roda depois das fontes e imagens.
- **Expansível.** Uma unidade nova é um item em `UNITS` e uma categoria de encomenda nova é um item em `ORDER_CATEGORIES`. Home, páginas, schema e footer se ajustam sozinhos.

## Tarefas comuns

- **Publicar uma foto:** coloque o arquivo em `public/media/` e preencha `src` do slot em `src/content/media.ts`.
- **Esconder as notas "Foto em produção":** `SHOW_MEDIA_NOTES = false` em `src/content/media.ts`.
- **Analytics:** os eventos do brief (§34) vão para `window.dataLayer` e `gtag`, se existirem. Basta instalar o GTM/GA4.
