import React, { useState } from 'react';
import { PlanDetails, PlanType, ClientData } from '../types';
import { PIX_KEY, ACTIVITY_LEVELS } from '../constants';
import { Copy, Check, ArrowLeft, Send } from 'lucide-react';
import { saveClientData } from '../services/storageService';

interface CheckoutFormProps {
  plan: PlanDetails;
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ plan, onBack, onSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    goal: 'hypertrophy',
    restrictions: ''
  });

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to "Database"
    saveClientData({
      name: formData.name,
      whatsapp: formData.whatsapp,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      activityLevel: formData.activityLevel as any,
      goal: formData.goal as any,
      restrictions: formData.restrictions,
      selectedPlan: plan.id
    });

    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-dark-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-gold-600 to-gold-700 p-6 flex justify-between items-center">
          <button onClick={onBack} className="text-black hover:bg-black/10 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-display font-bold text-black uppercase">Finalizar Inscrição</h2>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Step 1: Payment */}
          <div className="bg-dark-800 p-6 rounded-xl border border-dashed border-zinc-700">
            <h3 className="text-gold-500 font-bold uppercase mb-4 text-sm tracking-wider">Passo 1: Pagamento via Pix</h3>
            <p className="text-gray-400 text-sm mb-4">
              Realize o pagamento de <strong className="text-white">R$ {plan.price.toFixed(2).replace('.', ',')}</strong> para a chave abaixo.
            </p>
            
            <div className="flex items-center gap-2 bg-black p-3 rounded-lg border border-zinc-700">
              <code className="text-gray-300 text-sm truncate flex-1 font-mono">{PIX_KEY}</code>
              <button 
                onClick={handleCopyPix}
                className={`p-2 rounded-md transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-zinc-800 text-gold-500 hover:bg-zinc-700'}`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">*Após o pagamento, preencha a ficha abaixo para receber seu plano.</p>
          </div>

          {/* Step 2: Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <h3 className="text-gold-500 font-bold uppercase mb-4 text-sm tracking-wider">Passo 2: Anamnese & Dados</h3>
               <p className="text-gray-400 text-sm mb-6">Precisamos conhecer você para montar sua estratégia.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nome Completo</label>
                 <input 
                   required
                   name="name"
                   type="text" 
                   value={formData.name}
                   onChange={handleChange}
                   className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                   placeholder="Seu nome"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">WhatsApp (com DDD)</label>
                 <input 
                   required
                   name="whatsapp"
                   type="tel" 
                   value={formData.whatsapp}
                   onChange={handleChange}
                   className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                   placeholder="11999999999"
                 />
               </div>
             </div>

             <div className="grid grid-cols-3 gap-4">
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Idade</label>
                 <input required name="age" type="number" value={formData.age} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="Anos" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Altura (cm)</label>
                 <input required name="height" type="number" value={formData.height} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="175" />
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Peso (kg)</label>
                 <input required name="weight" type="number" value={formData.weight} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none" placeholder="70" />
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nível de Atividade</label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none">
                    {ACTIVITY_LEVELS.map(lvl => (
                      <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Objetivo Principal</label>
                  <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none">
                    <option value="hypertrophy">Hipertrofia (Ganhar Massa)</option>
                    <option value="weight_loss">Emagrecimento (Secar)</option>
                    <option value="maintenance">Manutenção/Saúde</option>
                  </select>
                </div>
             </div>

             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Restrições Alimentares / Lesões</label>
                <textarea 
                  name="restrictions"
                  value={formData.restrictions}
                  onChange={handleChange}
                  className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none h-24 resize-none"
                  placeholder="Tem alergia a algo? Alguma dor no joelho ou ombro? Digite aqui..."
                ></textarea>
             </div>

             <button 
               type="submit"
               className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-700 text-black font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
             >
               <Send size={20} />
               Confirmar e Enviar
             </button>
          </form>

        </div>
      </div>
    </div>
  );
};