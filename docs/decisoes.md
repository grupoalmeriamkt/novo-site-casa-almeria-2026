# Decisões do projeto

Registro de decisões tomadas depois do [brief](brief.md). Cada linha diz quem decidiu e se é provisória.

| # | Tema | Decisão | Origem | Status |
|---|---|---|---|---|
| 1 | Tag "SAFO" (TAGS E MOLDURAS) | Desconsiderada. Não entra no site. | Cliente | Final |
| 2 | Fatos do manifesto (sino da baguete, queijo da canastra premiado, café de chácara da região, cannoli, brunch de domingo, crianças no jardim) | Não usar por enquanto. Os trechos do manifesto no site evitam esses fatos. | Cliente | Provisória |
| 3 | Slogan "pra" vs "para" | "para alimentar corpo e alma" — segue o brief e os lockups oficiais em PNG. | Dev (default) | Aguardando confirmação |
| 4 | Branco quente | `#FBF7F0` como background principal. O manual só define branco puro. | Dev | Aguardando validação visual |
| 5 | Preto | `#11141B` (amostrado da página de cores do manual, que não declara hex). | Dev | Aguardando validação |
| 6 | Fotografia e vídeo | Onde ainda não há foto (comida em close, drinks, vinhos, produtos de encomenda), o site usa placeholders com direção de arte que descrevem a foto necessária (`src/content/media.ts`). | Dev | Até completar o acervo |
| 7 | GIFs da marca | Não vão para o site. Os loops foram recriados em SVG + GSAP (mais leves, pausáveis, respeitam reduced motion). | Dev | Final |
| 8 | Fonte de vetor | Logo, selo, texturas e ilustrações extraídos do `CasaAlmeria_miniMIV.pdf` (vetorial). Substituir pelos `.ai` originais se a Cápsula enviar. | Dev | Até receber originais |
| 9 | Assinatura "almeria" animada | Desenho por máscara: um traço de linha central revela o contorno preenchido original. DrawSVGPlugin do GSAP. | Dev | Final |
| 10 | Dados sem fonte (Noroeste, horários, URLs Get In/iFood) | Centralizados em `src/content/site.ts` com marcação `TODO` visível; nada é inventado. | Dev | Até o cliente enviar |
| 11 | Hero | "Entre na Casa": fachada da 104 Sul (_MG_7852) com um arco e portas azuis (padrão tipográfico + selo dividido entre as folhas). A intro entreabre as portas; o scroll as abre e atravessa o arco para dentro do salão (_MG_7891). | Cliente (foto) + Dev (conceito) | Final |
| 12 | Fotos das unidades | 104 Sul: _MG_8173 · Noroeste: _MG_4974 | Cliente | Final |
| 13 | Distribuição das fotos | 30 de 60 fotos em uso; mapa completo e banco em [fotos.md](fotos.md) | Dev | Revisável |
| 14 | Google Maps | Mapa interativo nas unidades com a chave `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` do projeto 1-ano-SommaDay (em `.env.local`, fora do git). Restringir a chave por referenciador no Google Cloud antes de publicar. | Cliente | Final |
| 15 | iFood | Ícone do iFood (logotipo oficial, estilo do app) ao lado de toda menção ao iFood | Cliente | Final |
| 16 | Dados do site atual | Links do Get In (Asa Sul), iFood, vendas, Maps, CEP, horário e e-mail de vagas vieram de casaalmeria.com.br (30/09/2026). Instagram: @casa_almeria | Dev | Confirmar com o cliente |

| 17 | Copy | Revisão completa, sem travessões, em tom mais autoral. Títulos definidos no brief e o manifesto da Casa foram preservados. | Cliente | Final |
| 18 | Rota | "Traçar rota" nas unidades: rota de carro pela mesma chave do Maps, desenhada como um traço de caneta, com saída para Google Maps, Waze e Apple Maps (ícones oficiais). Sem localização, os apps traçam o caminho. | Cliente | Final |
| 19 | Status e clima | Status calculado pelo horário publicado, no fuso de Brasília (aberta, fechando, fechada e quando abre). Clima via Open-Meteo pelo servidor do site, com cache de 15 min. O convite ao cafezinho muda com o tempo e a hora. | Cliente | Final |
| 20 | Header no celular | Um só botão "Pedir" (com a bolinha de status). O hambúrguer virou a xícara animada da mergulhadora, que abre o cartão do cafezinho: status, clima, "Como chegar" e WhatsApp. | Cliente | Final |
| 21 | Redes sociais | Ícones de Instagram, Facebook e LinkedIn no rodapé e em Contato (Simple Icons, CC0). | Cliente | Final |
| 22 | Documentos legais | Termos e Condições, Política de Privacidade e Política de Cookies em /termos, /privacidade e /cookies, escritos a partir do que o site realmente faz (LGPD). Texto base: recomenda-se revisão jurídica. | Cliente + Dev | Revisar com jurídico |
| 23 | Consentimento de cookies | Aviso "Aceita um cookie com o café?" com "Aceitar todos" ou "Só os essenciais". A escolha fica salva no localStorage e num cookie de 12 meses (casa_consent). Google Consent Mode v2 começa negado e só libera estatística com o aceite. "Preferências de cookies" no rodapé reabre o aviso. | Cliente | Final |
| 24 | Rodapé | Casa Almeria Asa Sul, CLS 104, Bloco D, Loja 01, Asa Sul, Brasília, DF, 70343-540, CNPJ 45.375.663/0001-29 (separadores "·" no lugar de hífens, pela regra de copy). | Cliente | Final |
