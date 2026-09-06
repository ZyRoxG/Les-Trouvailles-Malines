import React from "react";

export default function SectionHeading({ label, title, intro, align = "left", className = "" }) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {label && (
        <p className="label-caps text-foreground/45">{label}</p>
      )}
      <h2 className="mt-4 font-display text-3xl font-light leading-tight text-foreground md:text-[2.6rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-foreground md:text-[1.05rem]">
          {intro}
        </p>
      )}
    </div>
  );
}