import React from "react";

export default function Logo({ className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 ${className}`}
      aria-label="Les Trouvailles Malines — accueil"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/30 text-foreground/70 transition-colors duration-500 group-hover:border-foreground/60">
        {/* petite étoile/trouvaille discrète */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 L13.8 9.2 L21 11 L13.8 12.8 L12 20 L10.2 12.8 L3 11 L10.2 9.2 Z" />
        </svg>
      </span>
      <span className="font-display text-[1.35rem] leading-none tracking-tight text-foreground">
        Les Trouvailles Malines
      </span>
    </button>
  );
}