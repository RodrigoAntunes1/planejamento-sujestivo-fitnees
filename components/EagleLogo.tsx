import React from 'react';

export const EagleLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" />
    {/* Stylized eagle/wing abstraction */}
    <path d="M7 7l5 5 5-5" strokeOpacity="0.5" /> 
  </svg>
);