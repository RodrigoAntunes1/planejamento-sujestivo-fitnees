import React from 'react';
import { Timer } from 'lucide-react';

interface PromoBarProps {
  secondsLeft: number;
}

export const PromoBar: React.FC<PromoBarProps> = ({ secondsLeft }) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (secondsLeft <= 0) return null;

  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white py-2 px-4 shadow-lg animate-fade-in-down">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 md:gap-6 text-center">
        <div className="flex items-center gap-2 animate-pulse">
          <Timer className="w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Oferta Relâmpago Ativada</span>
        </div>
        <div className="text-sm md:text-base font-mono font-bold bg-black/30 px-3 py-1 rounded">
          {formatTime(secondsLeft)}
        </div>
        <p className="hidden md:block text-xs md:text-sm font-medium">
          O Plano <span className="font-bold underline">Evolution 30 Dias</span> está por apenas R$ 19,90!
        </p>
      </div>
    </div>
  );
};