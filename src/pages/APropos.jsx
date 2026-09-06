import React from "react";
import { Image } from "@/components/ui/image";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import content from "../../content/apropos.json";

export default function APropos() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-5 pt-24 md:px-10 md:pt-36">
        <p className="label-caps text-foreground/45">À propos</p>
        <h1 className="mt-5 font-display text-4xl font-light leading-tight text-foreground md:text-[3.4rem]">
          Les Trouvailles Malines
        </h1>
        {content.intro && (
          <p className="mt-8 font-display text-2xl font-light leading-snug text-foreground/80 md:text-[1.8rem]">
            {content.intro}
          </p>
        )}
      </section>

      {content.image && (
        <section className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-20">
          <div className="relative overflow-hidden rounded-sm">
            <div className="aspect-[16/9]">
              <Image src={content.image} alt="L'esprit des Trouvailles Malines" fittingType="fill" className="h-full w-full" />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-5 pb-12 md:px-10">
        <div className="space-y-6 text-[1.05rem] leading-[1.85] text-foreground/80">
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p {...props} />,
              a: ({ node, ...props }) => <a className="editorial-link text-foreground underline-offset-4" {...props} />,
            }}
          >
            {content.body}
          </ReactMarkdown>
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
