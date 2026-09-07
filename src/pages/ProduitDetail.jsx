import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useContent";

const LABEL_STYLES = {
  "Coup de cœur": "bg-foreground text-background",
  "Trouvaille maline": "bg-[hsl(var(--sage))] text-background",
  "Petit prix": "bg-[hsl(var(--taupe))] text-foreground",
};

export default function ProduitDetail() {
  const { id } = useParams();
  const { items: allProducts } = useProducts({}, 500);
  const product = allProducts.find((p) => p.id === id) || null;

  const gallery = product
    ? [product.image_url, ...(Array.isArray(product.gallery) ? product.gallery : [])].filter(Boolean)
    : [];
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center md:px-10">
        <p className="font-display text-3xl font-light text-foreground">Introuvable</p>
        <p className="mt-4 text-muted-foreground">Ce produit n'existe plus ou n'a pas encore été publié.</p>
        <Link to="/trouvailles" className="mt-8 inline-block editorial-link text-[0.85rem] tracking-wide text-foreground">
          ← Retour aux trouvailles
        </Link>
      </div>
    );
  }

  const labelStyle = LABEL_STYLES[product.label] || "bg-card text-foreground/70 border border-border";
  const similar = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.group === product.group))
    .slice(0, 3);
  const points = Array.isArray(product.points_forts) ? product.points_forts.filter(Boolean) : [];

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-16 md:px-10 md:pt-24">
        <Link to="/trouvailles" className="inline-flex items-center gap-2 text-[0.82rem] tracking-wide text-foreground/60 transition-colors hover:text-foreground">
          <ArrowLeft size={15} strokeWidth={1.5} />
          Retour aux trouvailles
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-sm bg-card">
              <div className="aspect-[4/5]">
                <Image src={gallery[activeImage] || product.image_url} alt={product.name} fittingType="fill" className="h-full w-full" />
              </div>
              {product.label && (
                <span className={`absolute left-4 top-4 label-caps px-3 py-1.5 ${labelStyle}`}>
                  {product.label}
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden rounded-sm border transition-colors ${i === activeImage ? "border-foreground" : "border-border/60 hover:border-foreground/40"}`}
                    aria-label={`Voir la photo ${i + 1}`}
                  >
                    <Image src={img} alt="" fittingType="fill" className="h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-display text-3xl font-light leading-snug text-foreground md:text-[2.6rem]">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {points.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[0.95rem] text-foreground/80">
                    <Check size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[hsl(var(--sage))]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {product.price && (
              <p className="mt-6 text-[1.1rem] font-light text-foreground/70">{product.price}</p>
            )}

            <a
              href={product.amazon_url}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-sm bg-foreground px-7 py-3.5 text-[0.85rem] tracking-wide text-background transition-all duration-500 hover:opacity-90"
            >
              Voir sur Amazon
              <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <p className="mt-4 text-[0.78rem] text-foreground/45">
              Lien d'affiliation Amazon — cela ne change rien au prix que vous payez.
            </p>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <p className="label-caps text-foreground/45">À découvrir aussi</p>
          <h2 className="mt-4 font-display text-3xl font-light text-foreground md:text-[2.4rem]">
            Dans le même esprit
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
