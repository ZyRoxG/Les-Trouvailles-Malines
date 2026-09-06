import React from "react";
import { Image } from "@/components/ui/image";
import { Link } from "react-router-dom";

const ABOUT_IMG = "https://media.db.com/images/public/6a9c4565c1fb582e32cb4e2f/442d08812_generated_17fafe17.jpg";

export default function APropos() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 pt-24 md:px-10 md:pt-36">
        <p className="label-caps text-foreground/45">À propos</p>
        <h1 className="mt-5 font-display text-4xl font-light leading-tight text-foreground md:text-[3.4rem]">
          Les Trouvailles Malines
        </h1>
        <p className="mt-8 font-display text-2xl font-light leading-snug text-foreground/80 md:text-[1.8rem]">
          Nous aimons les jolies choses, mais encore plus les choses qui ont une vraie utilité.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-20">
        <div className="relative overflow-hidden rounded-sm">
          <div className="aspect-[16/9]">
            <Image src={ABOUT_IMG} alt="L'esprit des Trouvailles Malines" fittingType="fill" className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12 md:px-10">
        <div className="space-y-6 text-[1.05rem] leading-[1.85] text-foreground/80">
          <p>
            Les Trouvailles Malines rassemble des idées, objets et accessoires qui peuvent rendre la maison plus belle, plus confortable et plus pratique, sans forcément dépenser beaucoup.
          </p>
          <p>
            Nous croyons qu'un intérieur agréable ne se construit pas d'un seul coup, mais par petites touches : un panier qui range, une lampe qui adoucit, un coussin qui invite à s'asseoir. Chaque trouvaille est choisie pour sa douceur, sa simplicité et son utilité au quotidien.
          </p>
          <p>
            Vous trouverez ici des sélections classées par pièce et par envie — petits prix, rangement, déco, confort — ainsi que des inspirations pour imaginer une pièce autrement. La plupart des objets sont disponibles sur Amazon : un clic, et vous êtes redirigé vers la fiche du produit.
          </p>
          <p>
            Le site est pensé comme un magazine déco, à parcourir lentement, pour avoir envie de rendre sa maison un peu plus douce, un peu plus jolie, un peu plus soi.
          </p>
        </div>

        <div className="mt-16 border-t border-border/60 pt-10">
          <p className="font-display text-2xl font-light text-foreground">Envie d'explorer ?</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Link to="/piece-par-piece" className="editorial-link text-[0.85rem] tracking-wide text-foreground">Pièce par pièce →</Link>
            <Link to="/trouvailles" className="editorial-link text-[0.85rem] tracking-wide text-foreground">Trouvailles malines →</Link>
            <Link to="/inspirations" className="editorial-link text-[0.85rem] tracking-wide text-foreground">Inspirations →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}