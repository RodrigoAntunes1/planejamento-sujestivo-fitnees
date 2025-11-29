import React from 'react';
import { PlanDetails } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  plan: PlanDetails;
  onSelect: (plan: PlanDetails) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const isPromo = !!plan.oldPrice;

  return (
    <div className={`relative flex flex-col p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2
      ${plan.highlight 
        ? 'border-gold-500 bg-dark-800 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.2)] z-10' 
        : 'border-zinc-800 bg-dark-900'
      }
      ${isPromo ? 'ring-2 ring-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : ''}
    `}>
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black font-bold text-xs px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
          {plan.promoLabel || "Mais Vendido"}
        </div>
      )}

      {isPromo && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse">
          OFERTA RELÂMPAGO
        </div>
      )}
      
      <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2 mt-2">{plan.title}</h3>
      
      <div className="flex flex-col mb-6">
        {plan.oldPrice && (
           <span className="text-sm text-gray-500 line-through decoration-red-500 decoration-2">
             De R$ {plan.oldPrice.toFixed(2).replace('.', ',')}
           </span>
        )}
        <div className="flex items-baseline">
          <span className="text-sm text-gray-400 mr-1">R$</span>
          <span className={`text-4xl font-bold ${plan.highlight ? 'text-gold-400' : 'text-white'}`}>
            {plan.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-gray-300">
            <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 ${plan.highlight ? 'text-gold-500' : 'text-zinc-600'}`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 rounded-md ${
          plan.highlight 
            ? 'bg-gradient-to-r from-gold-500 to-gold-700 text-black hover:brightness-110 shadow-lg' 
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
};