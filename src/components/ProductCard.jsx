import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const LABEL_STYLES = {
  "Coup de cœur": "bg-foreground text-background",
  "Trouvaille maline": "bg-[hsl(var(--sage))] text-background",
  "Petit prix": "bg-[hsl(var(--taupe))] text-foreground",
};

export default function ProductCard({ product, size = "default" }) {
  const labelStyle = LABEL_STYLES[product.label] || "bg-card text-foreground/70 border border-border";
  const isLarge = size === "large";

  return (
    <article className="group flex flex-col">
      <Link to={`/produits/${product.id}`} className={`relative block overflow-hidden rounded-sm bg-card ${isLarge ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
        <Image
          src={product.image_url}
          alt={product.name}
          fittingType="fill"
          className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        {product.label && (
          <span className={`absolute left-4 top-4 label-caps px-3 py-1.5 ${labelStyle}`}>
            {product.label}
          </span>
        )}
      </Link>

      <div className={`mt-5 flex flex-1 flex-col ${isLarge ? "max-w-md" : ""}`}>
        <Link to={`/produits/${product.id}`}>
          <h3 className={`font-display font-light leading-snug text-foreground transition-colors duration-300 hover:text-foreground/70 ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className={`mt-3 leading-relaxed text-muted-foreground ${isLarge ? "text-[1rem]" : "text-[0.9rem]"}`}>
            {product.description}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          {product.price ? (
            <span className="text-[0.85rem] font-light text-foreground/55">{product.price}</span>
          ) : <span />}
          
            href={product.amazon_url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="editorial-link inline-flex items-center gap-1.5 text-[0.85rem] tracking-wide text-foreground transition-colors"
          >
            Voir sur Amazon
            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
