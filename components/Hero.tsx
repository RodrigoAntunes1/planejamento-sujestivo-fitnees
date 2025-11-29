import React from 'react';
import { EagleLogo } from './EagleLogo';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark-900 overflow-hidden px-4 text-center">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-600 via-dark-900 to-black z-0"></div>
      
      <div className="z-10 animate-fade-in-up flex flex-col items-center">
        <EagleLogo className="w-24 h-24 text-gold-500 mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        
        <h2 className="font-display font-bold text-2xl md:text-3xl text-gold-500 tracking-widest uppercase mb-2">
          #TeamAntunes
        </h2>
        
        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          RESGATE SUA<br/>
          <span className="gold-text-gradient">AUTOESTIMA</span>
        </h1>

        <p className="font-sans text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Chega de promessas vazias. Consultoria de elite para quem busca <strong className="text-white">Hipertrofia Real</strong> ou <strong className="text-white">Emagrecimento Definitivo</strong>. O corpo que você sonha exige a atitude que você não teve até hoje.
        </p>

        <a 
          href="#planos"
          className="group relative px-8 py-4 bg-transparent border-2 border-gold-500 text-gold-500 font-bold uppercase tracking-wider overflow-hidden hover:text-black transition-colors duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
          <span className="relative z-10">Escolher meu Plano</span>
        </a>
      </div>

      {/* Aesthetic decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};