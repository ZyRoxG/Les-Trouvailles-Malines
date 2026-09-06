import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import ProductCard from "@/components/ProductCard";
import { useInspiration, useProducts } from "@/hooks/useContent";

export default function InspirationDetail() {
  const { id } = useParams();
  const { item: inspiration, loading } = useInspiration(id);
  const { items: allProducts } = useProducts({}, 200);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!inspiration) return;
    const ids = inspiration.product_ids || [];
    if (ids.length) {
      setRelated(allProducts.filter((p) => ids.includes(p.id)));
    } else {
      setRelated(allProducts.slice(0, 3));
    }
  }, [inspiration, allProducts]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 md:px-10">
        <div className="animate-pulse">
          <div className="aspect-[3/2] rounded-sm bg-card" />
          <div className="mt-8 h-8 w-2/3 rounded-sm bg-card" />
          <div className="mt-4 h-4 w-full rounded-sm bg-card/70" />
        </div>
      </div>
    );
  }

  if (!inspiration) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center md:px-10">
        <p className="font-display text-3xl font-light text-foreground">Introuvable</p>
        <p className="mt-4 text-muted-foreground">Cette inspiration n'existe plus ou n'a pas encore été publiée.</p>
        <Link to="/inspirations" className="mt-8 inline-block editorial-link text-[0.85rem] tracking-wide text-foreground">
          ← Retour aux inspirations
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* cover */}
      <section className="relative">
        <div className="relative h-[58vh] min-h-[380px] w-full overflow-hidden">
          <Image src={inspiration.cover_image_url} alt={inspiration.title} fittingType="fill" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-3xl px-5 pb-12 md:px-10 md:pb-16">
            <p className="label-caps text-white/70">Inspiration</p>
            <h1 className="mt-4 font-display text-4xl font-light leading-tight text-white md:text-[3.4rem]">
              {inspiration.title}
            </h1>
          </div>
        </div>
      </section>

      {/* body */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-20">
        <Link to="/inspirations" className="inline-flex items-center gap-2 text-[0.82rem] tracking-wide text-foreground/60 transition-colors hover:text-foreground">
          <ArrowLeft size={15} strokeWidth={1.5} />
          Toutes les inspirations
        </Link>

        {inspiration.excerpt && (
          <p className="mt-8 font-display text-2xl font-light leading-snug text-foreground md:text-[1.9rem]">
            {inspiration.excerpt}
          </p>
        )}

        {inspiration.body && (
          <div className="mt-10 space-y-6 text-[1.05rem] leading-[1.8] text-foreground/80">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => <h2 className="mt-12 font-display text-3xl font-light text-foreground" {...props} />,
                h3: ({ node, ...props }) => <h3 className="mt-10 font-display text-2xl font-light text-foreground" {...props} />,
                p: ({ node, ...props }) => <p {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc space-y-2 pl-5 marker:text-foreground/40" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal space-y-2 pl-5 marker:text-foreground/40" {...props} />,
                a: ({ node, ...props }) => <a className="editorial-link text-foreground underline-offset-4" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-foreground/30 pl-5 font-display text-xl font-light italic text-foreground/80" {...props} />
                ),
              }}
            >
              {inspiration.body}
            </ReactMarkdown>
          </div>
        )}
      </section>

      {/* produits liés */}
      {related.length > 0 && (
        <section className="bg-card/40">
          <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-24">
            <p className="label-caps text-foreground/45">Shop the story</p>
            <h2 className="mt-4 font-display text-3xl font-light text-foreground md:text-[2.4rem]">
              Les trouvailles de cet article
            </h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}