import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

export default function InspirationCard({ inspiration, to }) {
  return (
    <Link to={to} className="group flex flex-col">
      <div className="relative overflow-hidden rounded-sm bg-card">
        <div className="aspect-[3/2] overflow-hidden">
          <Image
            src={inspiration.cover_image_url}
            alt={inspiration.title}
            fittingType="fill"
            className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="mt-5 max-w-xl">
        <p className="label-caps text-foreground/45">Inspirations</p>
        <h3 className="mt-3 font-display text-2xl font-light leading-snug text-foreground transition-colors duration-300 group-hover:text-foreground/80 md:text-[1.7rem]">
          {inspiration.title}
        </h3>
        {inspiration.excerpt && (
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            {inspiration.excerpt}
          </p>
        )}
        <span className="mt-4 inline-block text-[0.82rem] tracking-wide text-foreground/70 transition-transform duration-500 group-hover:translate-x-1">
          Lire l'article →
        </span>
      </div>
    </Link>
  );
}