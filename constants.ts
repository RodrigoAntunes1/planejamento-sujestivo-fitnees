import { PlanType, PlanDetails } from './types';

export const PIX_KEY = "172e7a1c-63fa-4b48-b833-94ff223c29f3";
export const OWNER_WHATSAPP = "5511949186997";

export const PLANS: PlanDetails[] = [
  {
    id: PlanType.BASIC,
    title: "Start 30 Dias",
    price: 19.90,
    features: [
      "Planejamento Personalizado (30 dias)",
      "Dieta Focada no Objetivo",
      "Treino Periodizado",
      "Acesso ao E-book Exclusivo",
      "Sem suporte direto (Autonomia)"
    ],
    cta: "COMEÇAR AGORA",
    highlight: false
  },
  {
    id: PlanType.INTERMEDIATE,
    title: "Evolution 30 Dias",
    price: 29.90,
    features: [
      "Planejamento Completo",
      "Ajustes a cada 15 dias",
      "Suporte Equipe (07h às 20h)",
      "Tira-dúvidas via WhatsApp",
      "Dieta Flexível"
    ],
    cta: "QUERO EVOLUIR",
    highlight: true
  },
  {
    id: PlanType.VIP,
    title: "Consultoria VIP",
    price: 59.90,
    features: [
      "Totalmente Personalizado",
      "Contato Direto 24h (WhatsApp)",
      "Ajustes a cada 10 dias",
      "Análise de Técnica de Treino",
      "Acompanhamento Premium"
    ],
    cta: "SER UM ÁGUIA VIP",
    highlight: false
  }
];

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentário (Pouco ou nenhum exercício)' },
  { value: 'moderate', label: 'Moderado (3-4 dias por semana)' },
  { value: 'active', label: 'Ativo (5-6 dias por semana)' },
  { value: 'athlete', label: 'Atleta (Treino intenso todos os dias)' }
];