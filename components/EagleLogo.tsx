import React from 'react';

export const EagleLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Stylized Eagle Silhouette */}
    {/* Central Body & Head */}
    <path d="M12 2L15 6L12 9L9 6L12 2Z" fill="currentColor" stroke="none" />
    <path d="M12 22V13" />
    
    {/* Wings */}
    <path d="M22 8L12 13L2 8L12 3L22 8Z" strokeOpacity="0.5" />
    <path d="M2 8L2 11L12 18L22 11L22 8" />
    
    {/* Tail Detail */}
    <path d="M7 19L12 22L17 19" />
  </svg>
);