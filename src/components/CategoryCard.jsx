import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

export default function CategoryCard({ category, to, index = 0 }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-sm bg-card"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <Image
          src={category.image}
          alt={category.label}
          fittingType="fill"
          className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="label-caps text-white/70">{`0${index + 1}`.slice(-2)}</p>
        <h3 className="mt-2 font-display text-2xl font-light text-white md:text-[1.7rem]">
          {category.label}
        </h3>
        <span className="mt-2 inline-block text-[0.8rem] tracking-wide text-white/80 transition-transform duration-500 group-hover:translate-x-1">
          Découvrir →
        </span>
      </div>
    </Link>
  );
}