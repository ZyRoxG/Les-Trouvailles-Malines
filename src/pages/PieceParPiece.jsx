import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { PIECE_CATEGORIES } from "@/lib/categories";
import { useProducts } from "@/hooks/useContent";

export default function PieceParPiece() {
  const [params, setParams] = useSearchParams();
  const active = params.get("cat") || "all";
  const { items, loading } = useProducts({ group: "piece" }, 200);

  const filtered = active === "all" ? items : items.filter((p) => p.category === active);
  const activeCat = PIECE_CATEGORIES.find((c) => c.slug === active);

  const setCat = (slug) => {
    if (slug === "all") setParams({});
    else setParams({ cat: slug });
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
        <SectionHeading
          label="Pièce par pièce"
          title="Trouvailles pour chaque pièce"
          intro="Sélectionnez une pièce pour découvrir des objets pensés pour cet endroit précis de la maison."
        />

        {/* filtre visuel */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          <FilterChip label="Tout" active={active === "all"} onClick={() => setCat("all")} />
          {PIECE_CATEGORIES.map((c) => (
            <FilterChip key={c.slug} label={c.label} active={active === c.slug} onClick={() => setCat(c.slug)} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <EmptyState label={activeCat?.label} />
        ) : (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-5 py-2 text-[0.82rem] tracking-wide transition-all duration-300 ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-transparent text-foreground/70 hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-sm bg-card" />
          <div className="mt-5 h-5 w-2/3 rounded-sm bg-card" />
          <div className="mt-3 h-4 w-full rounded-sm bg-card/70" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="py-24 text-center">
      <p className="font-display text-2xl font-light text-foreground">
        {label ? `Bientôt des trouvailles pour « ${label} »` : "Aucune trouvaille pour l'instant"}
      </p>
      <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-muted-foreground">
        Nous préparons de nouvelles sélections pour cette pièce. Revenez bientôt les découvrir.
      </p>
    </div>
  );
}