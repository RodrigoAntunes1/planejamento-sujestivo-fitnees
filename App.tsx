import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { PricingCard } from './components/PricingCard';
import { CheckoutForm } from './components/CheckoutForm';
import { AdminPanel } from './components/AdminPanel';
import { PromoBar } from './components/PromoBar';
import { PLANS, OWNER_WHATSAPP } from './constants';
import { PlanDetails, PlanType } from './types';
import { ShieldCheck, TrendingUp, Users, Target, Zap, Award, Check, Clock } from 'lucide-react';

enum Page {
  HOME = 'HOME',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS',
  ADMIN = 'ADMIN'
}

const PROMO_DURATION = 40 * 60; // 40 minutes in seconds

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  
  // Promo State
  const [timeLeft, setTimeLeft] = useState(PROMO_DURATION);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isPromoActive = timeLeft > 0;

  // Dynamic Plans based on Promo
  const currentPlans: PlanDetails[] = PLANS.map(plan => {
    if (plan.id === PlanType.INTERMEDIATE && isPromoActive) {
      return {
        ...plan,
        price: 19.90,
        oldPrice: 29.90,
        highlight: true,
        promoLabel: "OFERTA RELÂMPAGO",
        title: "Evolution (PROMO)"
      };
    }
    // If promo ends, ensure plan returns to normal
    if (plan.id === PlanType.INTERMEDIATE && !isPromoActive) {
      return {
        ...plan,
        price: 29.90,
        highlight: true,
        title: "Evolution 30 Dias"
      };
    }
    // Remove highlight from others to focus on the promo if needed, 
    // but user requested "Plan 2" promo specifically.
    return plan;
  });

  // Plan Selection Logic
  const handleSelectPlan = (plan: PlanDetails) => {
    if (plan.id === PlanType.VIP) {
      const message = `Olá TeamAntunes! Quero contratar a Consultoria VIP de R$59,90.`;
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      setSelectedPlan(plan);
      setCurrentPage(Page.CHECKOUT);
    }
  };

  const handleAdminAccess = () => {
    const pass = prompt("Senha de Administrador:");
    if (pass === "admin123") {
      setCurrentPage(Page.ADMIN);
    } else {
      alert("Acesso negado.");
    }
  };

  if (currentPage === Page.ADMIN) {
    return <AdminPanel onLogout={() => setCurrentPage(Page.HOME)} />;
  }

  if (currentPage === Page.CHECKOUT && selectedPlan) {
    return (
      <CheckoutForm 
        plan={selectedPlan} 
        onBack={() => setCurrentPage(Page.HOME)}
        onSuccess={() => setCurrentPage(Page.SUCCESS)}
      />
    );
  }

  if (currentPage === Page.SUCCESS) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
        <ShieldCheck className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">Bem-vindo ao Time!</h1>
        <h2 className="text-xl text-gray-400 mb-8">Sua inscrição foi confirmada.</h2>

        <div className="bg-dark-900 border border-zinc-800 p-8 rounded-xl max-w-xl w-full mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-gold-700"></div>
          
          <div className="flex flex-col items-center mb-6">
             <Clock className="w-12 h-12 text-gold-500 mb-4" />
             <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">Atenção ao Prazo</h3>
          </div>

          <p className="text-gold-500 text-lg md:text-xl font-bold leading-relaxed border-y border-zinc-800 py-6 mb-6">
            O SEU PLANEJAMENTO PERSONALIZADO SERÁ ENVIADO EM <span className="text-white bg-red-600 px-2 rounded">ATÉ 24 HORAS</span> VIA WHATSAPP.
          </p>
          
          <p className="text-gray-400 text-sm">
            Nossa equipe já está analisando suas respostas da anamnese para montar a estratégia perfeita para o seu corpo. Fique atento ao número de WhatsApp que você cadastrou.
          </p>
        </div>

        <button 
          onClick={() => setCurrentPage(Page.HOME)}
          className="px-8 py-3 border border-gold-500 text-gold-500 font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all rounded"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-gold-500 selection:text-black">
      {isPromoActive && <PromoBar secondsLeft={timeLeft} />}
      
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-dark-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-zinc-800 group-hover:bg-gold-500/10 transition-colors rounded-full flex items-center justify-center mb-6 text-gold-500">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Evolução Constante</h3>
            <p className="text-gray-400">Método comprovado que impede a estagnação. Ajustes estratégicos para garantir que seu corpo responda sempre.</p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="w-16 h-16 bg-zinc-800 group-hover:bg-gold-500/10 transition-colors rounded-full flex items-center justify-center mb-6 text-gold-500">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Segurança Total</h3>
            <p className="text-gray-400">Protocolos desenhados para sua realidade, respeitando lesões e restrições alimentares.</p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="w-16 h-16 bg-zinc-800 group-hover:bg-gold-500/10 transition-colors rounded-full flex items-center justify-center mb-6 text-gold-500">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase mb-2">Comunidade Elite</h3>
            <p className="text-gray-400">Não é apenas um treino, é um estilo de vida. Entre para o time que mais cresce no Brasil.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section 1 (Initial) */}
      <section id="planos" className="py-24 px-4 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-900 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold-500 font-bold uppercase tracking-widest mb-2 text-sm">Não perca tempo</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">ESCOLHA SUA ARMADURA</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentPlans.map(plan => (
              <PricingCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>
        </div>
      </section>

      {/* O QUE SERÁ ENTREGUE */}
      <section className="py-20 bg-dark-900 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-black text-white text-center mb-12">
            O QUE VOU TE <span className="gold-text-gradient">ENTREGAR</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-gold-500/10 flex items-center justify-center text-gold-500">
                   <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase">Planejamento Estratégico</h4>
                  <p className="text-gray-400">Nada de "copia e cola". Sua dieta calculada milimetricamente para o seu biotipo e rotina. Sem passar fome, sem comer o que odeia.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-gold-500/10 flex items-center justify-center text-gold-500">
                   <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase">Treino de Resultados Reais</h4>
                  <p className="text-gray-400">Chega de ficha de academia genérica. Metodologia de intensidade para quebrar platôs e forçar seu corpo a mudar.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded bg-gold-500/10 flex items-center justify-center text-gold-500">
                   <Award size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase">Mentalidade de Águia</h4>
                  <p className="text-gray-400">Chega de promessa e moleza. Aqui nós cobramos atitude. Você recebe o mapa, mas tem que querer caminhar.</p>
                </div>
              </div>
            </div>

            {/* Visual element / Image placeholder representation */}
            <div className="relative h-full min-h-[300px] border border-zinc-800 bg-black p-8 rounded-xl flex items-center justify-center flex-col text-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] opacity-20 bg-cover bg-center rounded-xl"></div>
               <h3 className="relative z-10 text-2xl font-display font-bold text-white mb-4">"O SEU RESULTADO É A MINHA VITRINE"</h3>
               <p className="relative z-10 text-gold-500 font-bold tracking-widest uppercase text-sm">#TeamAntunes</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRA VOCÊ QUE... */}
      <section className="py-20 bg-black px-4 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 z-0 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-black text-white text-center mb-16">
            ESTE PROJETO É <span className="gold-text-gradient">PRA VOCÊ QUE...</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               "Busca Hipertrofia Sólida e duradoura",
               "Cansou de dietas restritivas que não funcionam",
               "Busca Emagrecimento sem flacidez",
               "Quer recuperar a autoestima ao se olhar no espelho",
               "Está estagnado nos treinos há meses",
               "Precisa de um direcionamento profissional e sério"
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 bg-dark-800 p-4 rounded-lg border border-zinc-800 hover:border-gold-500/50 transition-colors">
                 <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                   <Check size={14} className="text-black font-bold" />
                 </div>
                 <span className="text-gray-200 font-medium">{item}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action - Re-listing Plans (Simplified) */}
      <section className="py-24 px-4 bg-gradient-to-b from-dark-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">
              NÃO DEIXE PRA DEPOIS<br/>
              <span className="text-gold-500">O CORPO QUE VOCÊ MERECE</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A oportunidade está na sua frente. O cronômetro está rodando. Qual vai ser a sua escolha? Continuar na mesma ou voar com a gente?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPlans.map(plan => (
              <div 
                key={`bottom-${plan.id}`} 
                className={`p-6 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer
                  ${plan.highlight 
                    ? 'bg-dark-800 border-gold-500 shadow-[0_0_20px_rgba(251,191,36,0.2)]' 
                    : 'bg-dark-900 border-zinc-800 hover:border-zinc-600'
                  }
                `}
                onClick={() => handleSelectPlan(plan)}
              >
                <h3 className="font-display font-bold text-lg text-white uppercase mb-2">{plan.title}</h3>
                
                <div className="mb-6">
                  {plan.oldPrice && (
                    <span className="text-xs text-gray-500 line-through block mb-1">
                      De R$ {plan.oldPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className={`text-2xl font-bold ${plan.highlight ? 'text-gold-400' : 'text-white'}`}>
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                  className={`w-full py-3 font-bold uppercase tracking-wider text-sm rounded transition-all ${
                    plan.highlight 
                      ? 'bg-gold-500 text-black hover:bg-gold-400' 
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Admin Link */}
      <footer className="py-8 bg-black border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-sm mb-4">© 2024 TeamAntunes. Resgate Sua Autoestima.</p>
        <button 
          onClick={handleAdminAccess}
          className="text-zinc-800 text-xs hover:text-zinc-600 transition-colors uppercase font-bold tracking-widest"
        >
          Área do Treinador
        </button>
      </footer>
    </div>
  );
};

export default App;