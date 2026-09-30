# Assets de marca: de onde vieram e como regenerar

A pasta `Branding Completo/` trazia logos em PNG pequeno (~670 px), ilustrações achatadas sobre fundo branco e GIFs de 500 px. O `CasaAlmeria_miniMIV.pdf`, exportado do Illustrator, guarda tudo isso **em vetor**. Os SVGs do site foram extraídos dele.

## Peças extraídas

| Arquivo | Página do manual | Uso no site |
|---|---|---|
| `src/brand/vectors.ts` → `LOGO` | p.2 | Logo em todo o site. Letras C-A-S-A separadas (entram uma a uma), assinatura "almeria" e pingo do i separados |
| `LOGO.pen` | p.2 (derivado) | Traço central do "almeria" na ordem da caneta, usado como máscara para a assinatura se escrever |
| `SELO` | p.5 | Selo com anel giratório; o "almeria" fica na horizontal, como no GIF original |
| `BIKE` | p.19 | Bicicleta isolada da cena, com camadas: rodas (giram), pães (sobem na cesta), cesta, raminho, quadro |
| `MERGULHO` | p.22 | Mergulhadora na xícara, com o vapor em camada própria |
| `MAOS_PAO` | p.23 | Mãos da Criação com o pão, sem os raios de fundo; pão em camada própria |
| `public/illustrations/bailarina.svg` | p.26 | Bailarina sem o céu e as faixas |
| `public/illustrations/cachorro.svg` | p.20 | Cachorro (Chabli) sem o losango de fundo |
| `public/illustrations/vaso-cena.svg` | p.26 | Cena completa do vaso |
| `public/illustrations/bike-cena.svg` | p.19 | Cena completa da bicicleta |
| `public/illustrations/textura-crosta.svg` | p.12 | Textura da crosta do pão (sem o selo) |
| `public/illustrations/textura-tipografica.svg` | p.10 | Textura tipográfica "CASA SA" |
| `public/illustrations/merlot.png` | `ILUSTRAÇÕES/…merlot.png` | Único que só existe em raster: margem branca cortada |

As cores extraídas são ajustadas para os hex oficiais da paleta (manual p.14) quando estão a menos de 34 unidades RGB deles.

## GIFs → motion

Os GIFs não entram no site. O movimento de cada um foi refeito em SVG + GSAP (mais leve, pausa fora da tela, respeita reduced motion):

| GIF | Movimento original | No site |
|---|---|---|
| 08 / 09 | "CASA" aparece e o "almeria" é escrito | Abertura do hero e footer (`motion/brand.ts`) |
| 10 / 11 | Selo girando | `Selo spin` em Presentear e no manifesto (acelera levemente com o scroll) |
| 07 | Rodas da bicicleta girando | Bicicleta atravessa a seção; a rotação das rodas é igual à distância percorrida |
| 02 | Pão flutuando entre as mãos | "Da nossa Casa para a sua" |
| 01 | Mergulho na xícara, vapor | Vapor subindo no manifesto |
| 03, 04, 05, 06 | Raios, bailarina, cachorros | Não animados (evitar motion infantil) |

## Regenerar

Requer o MuPDF (WASM). Ele não fica nas dependências do projeto, por ser AGPL e só servir a este script:

```bash
npm i --no-save mupdf
node scripts/vectors/extract.mjs build        # todas as peças → scripts/vectors/out/
node scripts/vectors/centerline.mjs           # traço central do "almeria"
node scripts/vectors/gen.mjs                  # publica em public/illustrations e src/brand/vectors.ts
```

- Para inspecionar uma página do manual: `node scripts/vectors/extract.mjs dump 19 -v` lista cada path com cor, caixa e clip.
- As regras de recorte de cada peça ficam em `scripts/vectors/specs.mjs`.
- Se a Cápsula enviar os `.ai` originais com camadas, basta exportá-los em SVG e substituir os arquivos. Os componentes procuram as partes animáveis por `data-part="…"`.
