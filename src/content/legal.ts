/**
 * Documentos legais do site. Texto base elaborado a partir do que o site realmente faz;
 * recomenda-se revisão jurídica antes da versão definitiva (ver docs/pedidos-cliente.md).
 */
import { SITE } from "./site";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { title: string; body: LegalBlock[] };
export type LegalDoc = { slug: "termos" | "privacidade" | "cookies"; title: string; lead: string; updated: string; sections: LegalSection[] };

const UPDATED = "30 de setembro de 2026";
const ENDERECO = "CLS 104, Bloco D, Loja 01, Asa Sul, Brasília, DF, CEP 70343-540";
const CONTATO = `Para dúvidas ou pedidos, fale com a Casa pelo WhatsApp ${SITE.whatsapp.display} ou pelo e-mail ${SITE.careersEmail}.`;

export const PRIVACIDADE: LegalDoc = {
  slug: "privacidade",
  title: "Política de Privacidade",
  lead: "Como a Casa Almeria cuida dos dados de quem passa por aqui.",
  updated: UPDATED,
  sections: [
    {
      title: "Quem somos",
      body: [
        `Este site é da Casa Almeria, inscrita no CNPJ ${SITE.cnpj}, com endereço na ${ENDERECO}. Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a Casa Almeria é a controladora dos dados pessoais tratados neste site.`,
      ],
    },
    {
      title: "Quais dados tratamos",
      body: [
        {
          list: [
            "Dados que você nos envia: ao escrever pelo WhatsApp, mandar um e-mail ou um currículo, tratamos o que você escolher compartilhar, como nome, telefone, e-mail e o conteúdo da mensagem.",
            "Localização: apenas quando você toca em “Qual Casa fica mais perto de você?” ou em “Traçar rota”, e somente com a sua permissão no navegador. A posição serve, naquele momento, para calcular a distância e o caminho, e não é guardada por nós.",
            "Dados de navegação: informações técnicas como endereço IP, tipo de navegador e páginas visitadas, registradas pela hospedagem por segurança e, se você aceitar, por ferramentas de estatística.",
            "Preferências: a sua escolha sobre cookies e um registro temporário do clima, guardados no seu próprio navegador.",
          ],
        },
      ],
    },
    {
      title: "Para que usamos",
      body: [
        {
          list: [
            "Responder mensagens, reservas e encomendas.",
            "Mostrar a Casa mais perto de você e o caminho até ela.",
            "Entender como o site é usado para melhorá-lo, somente com o seu consentimento.",
            "Manter o site seguro e funcionando.",
            "Avaliar candidaturas enviadas pelo Trabalhe conosco.",
            "Cumprir obrigações legais.",
          ],
        },
      ],
    },
    {
      title: "Bases legais",
      body: [
        "Tratamos dados com base no seu consentimento (localização e cookies de estatística), na execução de procedimentos que você mesmo solicita (reservas, encomendas e candidaturas), no nosso legítimo interesse em manter o site seguro e funcionando e no cumprimento de obrigações legais e regulatórias.",
      ],
    },
    {
      title: "Com quem compartilhamos",
      body: [
        "A Casa Almeria não vende dados. Para o site funcionar, contamos com parceiros que tratam dados em nosso nome ou que você escolhe usar:",
        {
          list: [
            "Vercel: hospedagem do site.",
            "Google Maps Platform: mapa, distâncias e rotas. Ao usar o mapa, o Google recebe dados técnicos e, se você pedir uma rota, a sua localização.",
            "Open-Meteo: previsão do tempo, consultada pelo nosso servidor, sem nenhum dado seu.",
            "Plataformas e aplicativos que você abre pelo site, como iFood, Get In, a nossa central de vendas, WhatsApp, Instagram, Facebook, LinkedIn, Google Maps, Waze e Apple Maps. Ao sair do site, vale a política de privacidade de cada um.",
          ],
        },
      ],
    },
    {
      title: "Transferência internacional",
      body: ["Alguns desses parceiros mantêm servidores fora do Brasil. Nesses casos, a transferência observa as garantias previstas na LGPD."],
    },
    {
      title: "Por quanto tempo guardamos",
      body: [
        "Mensagens e dados de atendimento ficam guardados pelo tempo necessário para concluir o seu pedido e cumprir obrigações legais. Currículos, por até 12 meses. A sua escolha sobre cookies vale por 12 meses. A localização usada no mapa não é armazenada.",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        "A qualquer momento, você pode pedir a confirmação de que tratamos seus dados, acessá-los, corrigi-los, anonimizá-los, bloqueá-los ou eliminá-los, solicitar a portabilidade, saber com quem os compartilhamos e revogar o seu consentimento. Basta falar com a gente pelos canais abaixo.",
      ],
    },
    {
      title: "Segurança",
      body: ["Adotamos medidas técnicas e organizacionais para proteger os dados, como conexão criptografada (HTTPS) e acesso restrito às informações."],
    },
    {
      title: "Crianças e adolescentes",
      body: ["Este site não é direcionado a menores de 18 anos, e não coletamos intencionalmente dados deles."],
    },
    {
      title: "Mudanças nesta política",
      body: ["Esta política pode ser atualizada. A data da versão vigente fica sempre no topo da página."],
    },
    { title: "Fale com a Casa", body: [CONTATO] },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookies",
  title: "Política de Cookies",
  lead: "O que são, quais usamos e como você decide.",
  updated: UPDATED,
  sections: [
    {
      title: "O que são cookies",
      body: [
        "Cookies são pequenos arquivos que o site guarda no seu navegador para lembrar escolhas e entender como ele é usado. Tecnologias parecidas, como o armazenamento local do navegador, seguem as mesmas regras desta política.",
      ],
    },
    {
      title: "Essenciais, sempre ativos",
      body: [
        "Sem eles o site não lembra a sua escolha nem funciona como deveria:",
        {
          list: [
            "casa_consent (cookie): guarda a sua decisão sobre cookies por 12 meses.",
            "casa:consent (armazenamento local): a mesma decisão, para o site não perguntar de novo.",
            "casa:clima (armazenamento da sessão): guarda o clima de Brasília por 15 minutos para o convite do cafezinho e some ao fechar a aba.",
          ],
        },
      ],
    },
    {
      title: "Estatística, só com o seu aceite",
      body: [
        "Quando ativarmos ferramentas de estatística, como o Google Analytics, elas só funcionarão se você aceitar. Servem para entender, de forma agregada, quais páginas são mais visitadas e como o site é usado. Exemplos: _ga e _ga_*, com duração de até 2 anos.",
      ],
    },
    {
      title: "Conteúdo de terceiros",
      body: [
        "O mapa das Casas é do Google Maps. Ao carregá-lo, o Google pode usar cookies e dados técnicos conforme a própria política. Links para Instagram, Facebook, LinkedIn, iFood, WhatsApp e outros aplicativos seguem as regras de cada um.",
      ],
    },
    {
      title: "Como mudar a sua escolha",
      body: [
        "Você pode rever a sua decisão quando quiser pelo botão “Preferências de cookies”, no rodapé, ou apagar os cookies nas configurações do seu navegador. Recusar os cookies de estatística não impede o uso do site.",
      ],
    },
    { title: "Fale com a Casa", body: [CONTATO] },
  ],
};

export const TERMOS: LegalDoc = {
  slug: "termos",
  title: "Termos e Condições",
  lead: "As regras de uso do site da Casa Almeria.",
  updated: UPDATED,
  sections: [
    { title: "Aceite", body: ["Ao navegar por este site, você concorda com estes termos. Se não concordar, recomendamos não utilizá-lo."] },
    {
      title: "Sobre o site",
      body: [
        "O site apresenta a Casa Almeria, as suas unidades na 104 Sul e no Noroeste, os menus, as encomendas e os canais de atendimento. Horários, preços, menus e disponibilidade de produtos podem mudar sem aviso prévio. Na dúvida, confirme com a Casa pelo WhatsApp.",
      ],
    },
    {
      title: "Pedidos, encomendas e reservas",
      body: [
        "Os menus completos, o delivery e as encomendas são atendidos por plataformas parceiras, como Get In, iFood e a nossa central de vendas. Preços, pagamentos, prazos e entregas seguem as condições apresentadas em cada uma delas no momento do pedido.",
      ],
    },
    {
      title: "Propriedade intelectual",
      body: [
        "A marca Casa Almeria, o logotipo, o selo, as ilustrações, as fotografias e os textos deste site pertencem à Casa Almeria ou são usados com autorização. Não é permitido copiar, reproduzir ou usar esse conteúdo para fins comerciais sem autorização por escrito. As marcas de terceiros citadas, como iFood, Google Maps, Waze, Apple Maps, Instagram, Facebook e LinkedIn, pertencem aos seus titulares.",
      ],
    },
    {
      title: "Links para outros sites",
      body: ["O site leva a páginas e aplicativos de terceiros. A Casa Almeria não controla esses ambientes e não responde pelo seu conteúdo, disponibilidade ou políticas."],
    },
    {
      title: "Uso adequado",
      body: ["Você se compromete a usar o site de forma lícita, sem tentar interferir no seu funcionamento, acessar áreas restritas ou coletar dados de outras pessoas."],
    },
    {
      title: "Responsabilidade",
      body: [
        "Trabalhamos para manter o site no ar e com informações corretas, mas não garantimos que ele estará livre de interrupções ou erros. Mapas, rotas, distâncias e clima vêm de serviços de terceiros e são estimativas.",
      ],
    },
    {
      title: "Trabalhe conosco",
      body: ["O envio de currículo não gera vínculo nem garante participação em processo seletivo. Os dados enviados são tratados conforme a Política de Privacidade."],
    },
    { title: "Privacidade e cookies", body: ["O tratamento de dados pessoais segue a nossa Política de Privacidade e a nossa Política de Cookies."] },
    { title: "Alterações", body: ["Estes termos podem ser atualizados a qualquer momento. Vale sempre a versão publicada nesta página."] },
    {
      title: "Lei aplicável e foro",
      body: ["Estes termos seguem as leis brasileiras. Fica eleito o foro de Brasília, Distrito Federal, salvo quando a lei assegurar ao consumidor o foro do seu domicílio."],
    },
    { title: "Fale com a Casa", body: [`Casa Almeria, CNPJ ${SITE.cnpj}, ${ENDERECO}. ${CONTATO}`] },
  ],
};

export const LEGAL_DOCS = [TERMOS, PRIVACIDADE, COOKIES];
