# Casa Almeria — Brief do novo site

> Fonte de verdade do projeto. Transcrição do brief original (40 seções), mantida em disco para que decisões não dependam de histórico de conversa. Decisões tomadas depois do brief estão em [decisoes.md](decisoes.md).

## Conceito central

**Uma Casa que se move com você.**

O novo site da Casa Almeria não será tratado como site de restaurante, catálogo de produtos ou landing page institucional. Ele será uma extensão digital da experiência física da Casa.

A Casa Almeria começa pela manhã, serve café, assa pão, recebe encontros, prepara almoço, vira lugar de trabalho, de conversa, de presente, de happy hour e continua existindo dentro da casa das pessoas através das encomendas. O site deve transmitir essa transformação. A experiência precisa parecer viva.

Não haverá simplesmente imagem / texto / botão / imagem / texto / botão. A página será concebida como uma composição contínua:

- Fotografias atravessam seções.
- Textos mudam de posição.
- Elementos gráficos aparecem em planos diferentes.
- Objetos possuem peso e inércia.
- Ilustrações participam do ambiente.
- O scroll controla passagem de tempo, profundidade e narrativa.

Tudo parte da própria essência da Casa Almeria. O manifesto original descreve uma Casa capaz de acompanhar vários momentos do dia, do pão da manhã ao brunch, almoço, encontros, vinho e happy hour.

Assinatura conceitual: **para alimentar corpo e alma**

---

## 01. Posicionamento digital

Posicionar a Casa Almeria além de "padaria + café + restaurante".

**Casa Almeria é uma casa de gastronomia e encontros de Brasília.**

Experiências: Café, Padaria, Almoço, Confeitaria, Empório, Happy hour, Encomendas, Presentes, Delivery.

O usuário não precisa compreender a estrutura operacional. Ele precisa apenas compreender: **O que eu posso viver na Casa agora?** Essa é a base da arquitetura.

## 02. Princípio de UX

Navegação construída por intenção, não pela organização interna do negócio.

Em vez de Menu / Tábuas / Cestas / Tortas / iFood, a experiência trabalha com: **Quero ir à Casa · Quero comer · Quero levar · Quero presentear · Quero pedir · Quero encontrar uma Casa.**

Get In, Grupo Almeria, iFood, WhatsApp e Google Maps são infraestrutura. Para o cliente existe apenas **Casa Almeria**.

## 03. Navegação

Header extremamente limpo. Logo à esquerda. Centro: Casa · Menus · Encomendas · Unidades. Direita: **Pedir**.

O botão Pedir abre uma camada editorial flutuante (não dropdown convencional) com: Delivery, Encomendas, Cestas, Tábuas, Tortas. O fundo da página reduz ligeiramente de escala e escurece. A camada entra suavemente. No mobile, menu fullscreen.

## 04. Home — Abertura

Tela inteira. Filme curto cinematográfico, não institucional, feito de fragmentos: café sendo passado, croissant sendo partido, massa sendo aberta, manteiga, vapor, uma taça, uma mão, uma mesa, uma conversa, uma embalagem, a fachada, o jardim, um prato chegando à mesa.

Sobre o vídeo: CASA ALMERIA, depois **para alimentar corpo e alma**.

Intro timeline: primeiro mídia, depois marca, depois assinatura, depois navegação. Nada entra simultaneamente.

Após a introdução, o hero responde ao scroll: a imagem cresce ou se reposiciona sutilmente, o texto se separa em planos, a marca migra visualmente para o header. O usuário sente que entrou na Casa.

## 05. Uma Casa para qualquer hora

Uma das principais experiências. Título: **Uma Casa para qualquer hora.**

| Hora | Frase | Conteúdo |
|---|---|---|
| 08:00 | Bom dia. | Café, pão, manteiga, ovos. |
| 10:30 | Ainda dá tempo. | Padaria, doces, café. |
| 12:30 | A mesa está posta. | Almoço. |
| 16:00 | Só mais um café. | Doces, bebidas e encontros. |
| 19:00 | A Casa continua. | Drinks, vinho, comida, conversa. |

Sem transição rígida entre telas. A fotografia de um momento aparece antes da anterior terminar. Uma imagem passa por trás de outra. Alguns textos permanecem temporariamente. A cor da interface varia discretamente ao longo do dia. O scroll controla a narrativa.

## 06. Motor de motion

**scroll → progresso → transformação**, e não "elemento entrou → animação toca".

Seções importantes com timelines ligadas à progressão do scroll. ScrollTrigger é o motor central. `scrub` apenas onde houver relação física clara com scroll. `pin` somente onde realmente beneficia. Nada de prender o usuário desnecessariamente. Sofisticação sem retirar a sensação de controle.

## 07. O que você veio buscar?

Depois da narrativa emocional, conversão. Título: **O que você veio buscar?**

- **Sentar à mesa** — imagem de experiência; ao entrar com cursor a imagem reage discretamente; aparecem Menu Asa Sul / Menu Noroeste.
- **Levar a Casa** — Padaria, Confeitaria, Empório.
- **Presentear** — Cestas, Tábuas, Tortas, Encomendas.
- **Receber em casa** — Delivery, iFood.

Cada bloco possui comportamento próprio. Não serão quatro cards idênticos. Composição editorial.

## 08. Menu

Título: **O que vai ser hoje?**

Coleção navegável: Café da manhã, Padaria, Almoço, Doces, Café, Drinks, Vinhos. Navegação por drag, trackpad ou swipe. Cada mudança apresenta uma fotografia forte; a anterior desaparece por máscara enquanto a nova entra. Nada de carrossel tradicional com setas enormes.

Ao final: **Ver menu completo** → Asa Sul / Noroeste (destino Get In).

## 09. Da nossa Casa para a sua

Protagonismo muito maior. Título: **Da nossa Casa para a sua.**

Fundo muda para azul profundo. Entram objetos isolados — cesta, tábua, torta, pão, sacola, caixa — como se colocados sobre uma grande mesa editorial. Com scroll, mudam discretamente de posição, escala, rotação, profundidade.

Categorias: Tábuas, Cestas, Tortas, Encomendas.

- CTA principal: **Ver todas as encomendas** → vendas.grupoalmeria.com.br
- CTA secundário: **Falar com a Casa** → WhatsApp 61 99582 8131

O WhatsApp é ferramenta de atendimento, não de propaganda.

## 10. As Casas

Título: **Duas Casas. A mesma Casa.**

Tela dividida Asa Sul | Noroeste. Cursor perto de um lado → aquele lado ganha espaço.

- **Casa Asa Sul** — fotografia; CLS 104 Bloco D Loja 01, Asa Sul, Brasília DF; Menu; Como chegar.
- **Casa Noroeste** — fotografia; Menu; Como chegar.

No celular, sem disputa horizontal: cada unidade em bloco vertical.

## 11. A Casa acontece aqui

Usa a riqueza visual hoje concentrada no Instagram. Título: **A Casa acontece aqui.**

Mosaico editorial (não embed do Instagram; direção de arte): retratos, comida, espaço, clientes, equipe, detalhes, vídeos, produtos. Layouts alternando vertical, horizontal, imagem enorme, imagem pequena, vídeo, texto, frase, detalhe.

Objetos em velocidades diferentes: background, imagem, texto, elemento decorativo, foreground. Profundidade sem 3D.

## 12. Ilustrações como interface

A bicicleta, o cachorro, o pão, a bailarina, os vasos, as texturas, os selos, os grafismos passam a fazer parte do sistema de interface.

Exemplos: bicicleta atravessa lentamente uma área; pães aparecem dentro da cesta durante o movimento; linhas manuscritas acompanham transições; ilustração reage discretamente ao cursor; selos giram lentamente; grafismos atravessam limites entre seções.

Caráter sofisticado. **Nada deverá lembrar motion infantil.**

## 13. Sistema de profundidade

Planos: **Background** (cores, texturas, imagens grandes) · **Midground** (fotografias, grafismos) · **Content** (texto, interface) · **Foreground** (ilustrações, selos, elementos gráficos).

Cada plano com velocidade diferente — não o mesmo `translateY` em todos. Diferença pequena o suficiente para não virar parallax genérico.

## 14. Typography motion system

Nem todo texto é animado. Três primitivas:

- **Line reveal** — textos editoriais e manifesto; linha entra por máscara.
- **Word reveal** — chamadas; palavras em sequência.
- **Character reveal** — reservado aos grandes momentos (hero, títulos especiais, transições).

Alguns títulos especiais podem usar fake depth: caractere principal + camada secundária deslocada alguns pixels com timing diferente. Nunca no site inteiro.

## 15. Image motion system

- **Image Reveal** — máscara abre, imagem começa levemente maior, escala estabiliza.
- **Image Drift** — atravessa o viewport com diferença discreta de velocidade.
- **Image Follow** — responde ligeiramente ao pointer.
- **Image Transition** — próxima fotografia aparece por baixo da anterior.
- **Editorial Crop** — mudança controlada de crop durante scroll.

Prioritariamente transform, opacity, clip-path. Evitar propriedades que causem layout.

## 16. Microinterações

Links com underline animado. Setas respondem ao hover. Imagens mudam levemente de enquadramento. Botões principais com magnetismo sutil. Labels trocam verticalmente. Cursor pode ter estado especial sobre mídia ou draggable. Sem cursor customizado extravagante. Sem magnetismo no touch.

## 17. A Casa tem peso

Objetos nunca parecem teleportar. Possuem peso, inércia, aceleração, desaceleração, profundidade, reação. Elementos grandes se movem mais lentamente; menores reagem mais rápido. A velocidade faz parte da hierarquia.

## 18. Manifesto

Perto do final da Home, menos estímulo. Tela limpa. **Uma Casa para qualquer tempo.**

Trechos condensados do manifesto em linhas — uma frase, uma imagem, outra frase, outro momento. E então: **A Casa que alimenta corpo e alma.** Transmite marca, não venda.

## 19. Trabalhe conosco

Discreto. **Tem lugar para você nesta Casa.** Breve descrição. **Conheça nossas oportunidades** ou **Envie seu currículo**. Sem competir com a experiência gastronômica.

## 20. Footer

Não é cinza; é uma conclusão. Azul profundo. Logo enorme. CASA ALMERIA. **para alimentar corpo e alma**.

Navegação: Casa, Menus, Encomendas, Unidades, Instagram, Contato · Asa Sul, Noroeste · Informações legais. Ao entrar no footer, a logo pode ser revelada progressivamente pelo scroll.

## 21. Paleta

Azul profundo como cor estrutural. Branco quente como background principal. Amarelo Almeria para assinatura e detalhes. Verde para momentos específicos. Rosa, azul claro e vermelho principalmente em ilustrações, campanhas e microdetalhes. A página não deve parecer colorida o tempo inteiro — controlar onde as cores fortes aparecem.

## 22. Tipografia

Source Sans como família estrutural, Alegreya para usos especiais, com hierarquia contemporânea. Títulos muito grandes, poucas palavras, grande respiro. Textos compactos, alta legibilidade, largura controlada. Labels pequenos, precisos, editoriais. Uma evolução fiel do manual, não uma cópia.

## 23. Motion intensity

- **SUBTLE** — links, botões, microinterações, textos secundários. Movimentos mínimos.
- **EDITORIAL** — fotografias, seções, títulos, transições. Parallax, máscaras, scroll-linked.
- **HERO** — abertura, Uma Casa para qualquer hora, Da nossa Casa para a sua, Manifesto. Maior amplitude, mais camadas, mais direção.

## 24. Desktop e mobile são produtos diferentes

- **Desktop** — parallax completo, pointer, magnetic, draggable sofisticado, character animations pontuais, composições sobrepostas.
- **Tablet** — menos camadas, parallax reduzido, word animations, draggable simplificado.
- **Mobile** — scroll nativo, sem cursor, sem magnetismo, menos elementos ambientais, line reveals, swipes simples, composições verticais. Deliberadamente projetado, não versão comprimida.

## 25. Reduced motion

Respeitar `prefers-reduced-motion`: sem smooth scroll artificial, sem parallax, sem elementos ambientais contínuos, sem transforms grandes, sem coreografias longas. Conteúdo completamente acessível.

## 26. Arquitetura de motion

Motion não fica espalhado pelos componentes.

```
src/motion/      config, gsap, scroll, reveal, text, image, parallax, magnetic, pointer, draggable, ambient, reducedMotion
src/components/motion/   Motion, Reveal, SplitTitle, ImageReveal, Parallax, Magnetic, InfiniteCarousel, AmbientObject
```

## 27. Tokens de motion

Easings: smooth, reveal, enter, elastic, linear. Durations: fast, normal, slow, cinematic.

## 28. Stack

Next.js, React, TypeScript, GSAP, ScrollTrigger, SplitText, Draggable, Observer (ou `ScrollTrigger.observe()`). Lenis somente se os testes mostrarem benefício real.

Não adicionar Three.js, WebGL, Framer Motion. Não adicionar complexidade por status.

## 29. Performance

60 FPS em desktops modernos. Core Web Vitals preservados. Priorizar transform, opacity, clip-path controlado. Não recalcular layout a cada scroll; não executar `getBoundingClientRect` continuamente. Pointer via `quickTo`. Loops ambientais em ticker compartilhado. Pausar motion fora do viewport. Fontes carregadas antes dos splits críticos. Imagens estabilizadas antes dos cálculos de ScrollTrigger. `ScrollTrigger.refresh()` após assets relevantes.

## 30. Acessibilidade

Motion nunca é requisito para entender conteúdo. SplitText preserva leitura semântica. Elementos duplicados para efeito com `aria-hidden="true"`. Focus visível. Teclado funciona. Menus acessíveis.

## 31. Transições

Se houver transição entre páginas, usar elementos da marca — ex.: selo circular cresce, ocupa o viewport, nova página carrega, círculo recolhe. Rápida; nada de 2 s em toda navegação.

## 32. Rotas

`/` Home · `/menus` Asa Sul ou Noroeste · `/encomendas` hub das ocasiões → vendas · `/unidades` · `/sobre` história, manifesto, marca · `/contato`.

Produtos e checkout continuam nos sistemas atuais.

## 33. Integrações

Menu Asa Sul → Get In · Menu Noroeste → Get In · Encomendas → Grupo Almeria · Central de vendas → WhatsApp · Delivery → iFood · Localização → Google Maps (por unidade).

O usuário nunca deve sentir que caiu em um ecossistema fragmentado antes do momento necessário.

## 34. Analytics

Eventos: `hero_menu_click`, `hero_order_click`, `menu_asa_sul`, `menu_noroeste`, `order_click`, `whatsapp_click`, `ifood_click`, `maps_asa_sul`, `maps_noroeste`, `encomenda_category_click`, `scroll_depth`.

## 35. SEO

SSR onde adequado. HTML semântico. H1 único. Headings hierárquicos. Schema Restaurant/LocalBusiness por unidade. Metadata própria. Open Graph. Alt text editorial. Sitemap. Canonical. Endereços e horários legíveis por crawler. O motion está sobre o HTML, não o substitui.

## 36. Imagens e vídeos

Acervo em categorias: Hero, Food close up, People, Environment, Units, Products, Packaging, Team, Events, Illustrations. Nenhuma imagem entra só porque é bonita; cada mídia tem papel na narrativa.

## 37. Design system

Tokens: color, type, spacing, grid, radius, border, media ratio, container, z-index, motion, breakpoints. Expansível: nova unidade não exige redesenhar a Home; nova categoria de encomenda não exige alterar 15 componentes.

## 38. Princípio Yestalgia

Absorver a lógica, não a estética: o site parece uma composição, não um conjunto de componentes. Ilustrações fazem parte do espaço, tipografia faz parte do movimento, produtos têm presença física, o usuário participa, seções conversam, a navegação não interrompe a narrativa. Universo próprio: Brasília, arquitetura, gastronomia, luz, jardim, pão, café, pessoas, azul, amarelo, ilustração, afeto.

## 39. Princípio final

**marca → conteúdo → narrativa → composição → motion → interação.** Nunca motion → conteúdo.

Pergunta em cada animação: **Por que isso se move?** Sem boa resposta, fica parado.

## 40. O resultado

Não "Que site bonito", mas: **"Quero ir lá." → "Quero comer isso." → "Vou mandar isso para alguém." → "Essa marca é diferente."**

Marca gastronômica de alto nível nacional sem luxo frio. Sofisticação = detalhe, ritmo, confiança, desejo, calor e execução impecável.
