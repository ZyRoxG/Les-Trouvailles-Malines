import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import InspirationCard from "@/components/InspirationCard";
import { useInspirations } from "@/hooks/useContent";

export default function Inspirations() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();
  const { items, loading } = useInspirations({ published: true }, 100);

  const filtered = useMemo(() => {
    if (!q) return items;
    return items.filter(
      (i) =>
        (i.title || "").toLowerCase().includes(q) ||
        (i.excerpt || "").toLowerCase().includes(q) ||
        (i.body || "").toLowerCase().includes(q)
    );
  }, [items, q]);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-10 md:pt-28">
        <SectionHeading
          label="Inspirations"
          title={q ? `Résultats pour « ${params.get("q")} »` : "Des idées à lire, des objets à adopter"}
          intro="Des sélections éditoriales pour imaginer une pièce autrement — et les objets pour le faire."
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {loading ? (
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/2] rounded-sm bg-card" />
                <div className="mt-5 h-6 w-3/4 rounded-sm bg-card" />
                <div className="mt-3 h-4 w-full rounded-sm bg-card/70" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-light text-foreground">
              {q ? "Aucun résultat" : "Bientôt des inspirations"}
            </p>
            <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-muted-foreground">
              {q ? "Essayez un autre mot-clé, ou parcourez toutes les inspirations." : "Nous préparons de nouveaux articles. Revenez vite les lire."}
            </p>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-20">
            {filtered.map((insp) => (
              <InspirationCard key={insp.id} inspiration={insp} to={`/inspirations/${insp.id}`} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}