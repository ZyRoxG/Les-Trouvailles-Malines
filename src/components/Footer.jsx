import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:pr-8">
            <Logo />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-muted-foreground">
              De belles idées pour une maison plus douce, plus pratique et plus jolie.
            </p>
          </div>

          <div>
            <p className="label-caps text-foreground/50">Explorer</p>
            <ul className="mt-5 space-y-3 text-[0.9rem] text-foreground/75">
              <li><Link to="/piece-par-piece" className="editorial-link">Pièce par pièce</Link></li>
              <li><Link to="/trouvailles" className="editorial-link">Trouvailles malines</Link></li>
              <li><Link to="/inspirations" className="editorial-link">Inspirations</Link></li>
              <li><Link to="/a-propos" className="editorial-link">À propos</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-caps text-foreground/50">Le mot de la fin</p>
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-muted-foreground">
              Nous aimons les jolies choses, mais encore plus les choses qui ont une vraie utilité.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/50 pt-7 text-[0.78rem] text-foreground/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Les Trouvailles Malines. Tous droits réservés.</p>
          <p className="max-w-md md:text-right">
            Les Trouvailles Malines participe au Programme Partenaires d'Amazon. Les liens sont des liens d'affiliation.
          </p>
        </div>
      </div>
    </footer>
  );
}