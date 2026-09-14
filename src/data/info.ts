export type InfoTopic = 'trocas' | 'cuidados' | 'envio' | 'tamanhos' | 'atendimento';

export interface InfoContent {
  title: string;
  intro: string;
  items: { title: string; text: string }[];
}

/** Conteúdo institucional exibido em diálogos a partir do rodapé. */
export const INFO: Record<InfoTopic, InfoContent> = {
  trocas: {
    title: 'Trocas e devoluções',
    intro: 'Você tem até 30 dias corridos após o recebimento para trocar ou devolver qualquer peça.',
    items: [
      { title: 'Como solicitar', text: 'Fale com o atendimento informando o número do pedido. Enviamos a etiqueta de postagem sem custo.' },
      { title: 'Condições', text: 'A peça deve estar sem sinais de uso, com a embalagem original e o certificado de prata 925.' },
      { title: 'Reembolso', text: 'Após a análise, o valor é estornado na mesma forma de pagamento em até 10 dias úteis.' },
    ],
  },
  cuidados: {
    title: 'Cuidados com a prata',
    intro: 'A prata 925 escurece naturalmente em contato com o ar e a umidade — e volta a brilhar com cuidados simples.',
    items: [
      { title: 'No dia a dia', text: 'Coloque as joias por último, depois de perfumes e cremes, e tire-as antes do banho, da piscina e do mar.' },
      { title: 'Limpeza', text: 'Use a flanela Auren ou um pano macio e seco. Evite pasta de dente, bicarbonato e produtos abrasivos.' },
      { title: 'Armazenamento', text: 'Guarde cada peça separada, no saquinho antiatrito, longe de umidade.' },
      { title: 'Polimento', text: 'Uma vez por ano, oferecemos revitalização gratuita das peças compradas na Auren.' },
    ],
  },
  envio: {
    title: 'Envio e prazos',
    intro: 'Todas as peças saem embaladas em estojo Auren, com certificado de autenticidade.',
    items: [
      { title: 'Prazo de postagem', text: 'Até 2 dias úteis após a confirmação do pagamento.' },
      { title: 'Rastreamento', text: 'O código de rastreio é enviado por e-mail assim que o pedido é postado.' },
    ],
  },
  tamanhos: {
    title: 'Guia de tamanhos',
    intro: 'Meça a circunferência interna de um anel que você já usa e compare com a tabela.',
    items: [
      { title: 'Aro 12', text: '52 mm de circunferência interna' },
      { title: 'Aro 16', text: '56 mm de circunferência interna' },
      { title: 'Aro 20', text: '60 mm de circunferência interna' },
      { title: 'Aro 24', text: '64 mm de circunferência interna' },
    ],
  },
  atendimento: {
    title: 'Atendimento',
    intro: 'De segunda a sexta, das 9h às 18h.',
    items: [
      { title: 'E-mail', text: 'contato@auren.example' },
      { title: 'WhatsApp (número de exemplo)', text: '+55 11 90000-0000' },
    ],
  },
};

/** Número fictício, apenas para demonstração. */
export const WHATSAPP_EXAMPLE = {
  display: '+55 11 90000-0000',
  href: 'https://wa.me/5511900000000',
};
