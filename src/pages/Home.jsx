import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { ArrowDown } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import InspirationCard from "@/components/InspirationCard";
import { PIECE_CATEGORIES, TROUVAILLE_CATEGORIES } from "@/lib/categories";
import { useProducts, useInspirations } from "@/hooks/useContent";
import settings from "../../content/settings.json";

const HERO_IMG = settings.hero_image;
const ABOUT_IMG = settings.about_image;

export default function Home() {
  const { items: products } = useProducts({}, 200);
  const { items: inspirations } = useInspirations({ published: true }, 100);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const showcase = (featured.length >= 4 ? featured : products.slice(0, 4));
  const hero = showcase[0];
  const pair = showcase.slice(1, 3);
  const last = showcase[3];

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
          <Image
            src={HERO_IMG}
            alt="Intérieur chaleureux et naturel"
            fittingType="fill"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
            <p className="label-caps text-white/70">Maison · Déco · Inspirations</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] text-white md:text-[5.2rem]">
              Les Trouvailles Malines
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 md:text-lg">
              De belles idées pour une maison plus douce, plus pratique et plus jolie.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/trouvailles"
                className="group inline-flex items-center gap-3 rounded-sm bg-background px-7 py-3.5 text-[0.85rem] tracking-wide text-foreground transition-all duration-500 hover:bg-white"
              >
                Découvrir les trouvailles
                <ArrowDown size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-y-0.5" />
              </Link>
              <Link to="/inspirations" className="editorial-link text-[0.85rem] tracking-wide text-white/85">
                Lire les inspirations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PIÈCE PAR PIÈCE */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <SectionHeading
          label="Pièce par pièce"
          title="Une trouvaille pour chaque recoin de la maison"
          intro="Du salon à la salle de bain, explorez des sélections pensées pour chaque pièce — des objets utiles, doux et faciles à adopter."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {PIECE_CATEGORIES.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} to={`/piece-par-piece?cat=${c.slug}`} />
          ))}
        </div>
      </section>

      {/* TROUVAILLES MALINES */}
      <section className="bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Trouvailles malines"
            title="Le juste prix, le bon geste"
            intro="Petits prix, rangement malin, confort discret. Des objets du quotidien qui changent une pièce sans changer un budget."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {TROUVAILLE_CATEGORIES.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} to={`/trouvailles?cat=${c.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* SÉLECTION COUP DE CŒUR — rythme 1-2-1 */}
      {showcase.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <SectionHeading
            label="Sélection de la rédaction"
            title="Nos coups de cœur du moment"
            intro="Une poignée d'objets choisis pour leur beauté, leur utilité et leur prix doux."
          />
          <div className="mt-14 flex flex-col gap-16 md:gap-24">
            {hero && (
              <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-7">
                  <ProductCard product={hero} size="large" />
                </div>
                <div className="md:col-span-5 md:pl-6">
                  <p className="label-caps text-foreground/45">Le choix des Trouvailles Malines</p>
                  <p className="mt-4 font-display text-2xl font-light leading-snug text-foreground">
                    « {hero.description || hero.name} »
                  </p>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    Chaque pièce de cette sélection a sa place dans une maison qui se veut à la fois belle et facile à vivre.
                  </p>
                </div>
              </div>
            )}

            {pair.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                {pair.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {last && (
              <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className="order-2 md:order-1 md:col-span-5 md:pr-6">
                  <p className="label-caps text-foreground/45">Encore une trouvaille</p>
                  <p className="mt-4 font-display text-2xl font-light leading-snug text-foreground">
                    Les petits objets font les grandes habitudes.
                  </p>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    Un détail bien choisi transforme une étagère, un coin de table, un matin un peu trop vite.
                  </p>
                </div>
                <div className="order-1 md:order-2 md:col-span-7">
                  <ProductCard product={last} size="large" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* INSPIRATIONS */}
      {inspirations.length > 0 && (
        <section className="bg-card/40">
          <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                label="Inspirations"
                title="Des idées à lire, des objets à adopter"
                intro="Des sélections éditoriales pour imaginer une pièce autrement."
              />
              <Link to="/inspirations" className="editorial-link text-[0.85rem] tracking-wide text-foreground/70">
                Toutes les inspirations →
              </Link>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {inspirations.slice(0, 3).map((insp) => (
                <InspirationCard key={insp.id} inspiration={insp} to={`/inspirations/${insp.id}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* À PROPOS TEASER */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative overflow-hidden rounded-sm">
            <div className="aspect-[4/3]">
              <Image src={ABOUT_IMG} alt="L'esprit des Trouvailles Malines" fittingType="fill" className="h-full w-full" />
            </div>
          </div>
          <div>
            <p className="label-caps text-foreground/45">À propos</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-foreground md:text-[2.6rem]">
              Les jolies choses, et surtout les choses utiles.
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
              Nous aimons les jolies choses, mais encore plus les choses qui ont une vraie utilité. Les Trouvailles Malines rassemble des idées, objets et accessoires qui peuvent rendre la maison plus belle, plus confortable et plus pratique, sans forcément dépenser beaucoup.
            </p>
            <Link to="/a-propos" className="mt-8 inline-block editorial-link text-[0.85rem] tracking-wide text-foreground">
              Lire notre histoire →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
