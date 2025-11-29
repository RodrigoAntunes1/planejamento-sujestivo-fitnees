export enum PlanType {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  VIP = 'VIP'
}

export interface ClientData {
  id: string;
  name: string;
  whatsapp: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  goal: 'hypertrophy' | 'weight_loss' | 'maintenance';
  restrictions: string;
  selectedPlan: PlanType;
  submissionDate: string;
  paymentStatus: 'pending_verification';
}

export interface PlanDetails {
  id: PlanType;
  title: string;
  price: number;
  oldPrice?: number; // Added for strike-through price
  promoLabel?: string; // Added for promo badges
  features: string[];
  cta: string;
  highlight?: boolean;
}