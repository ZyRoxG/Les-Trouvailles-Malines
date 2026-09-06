// Définition des catégories — éditable pour ajouter facilement de nouvelles rubriques.
// Remplacez les images via le tableau de bord si vous le souhaitez.

const U = "https://media.db.com/images/public/6a9c4565c1fb582e32cb4e2f/";

export const PIECE_CATEGORIES = [
  { slug: "salon", label: "Salon", image: `${U}bea2506b0_generated_71574a05.jpg` },
  { slug: "cuisine", label: "Cuisine", image: `${U}5b190c72b_generated_c48c0e4d.jpg` },
  { slug: "chambre", label: "Chambre", image: `${U}c5ade79ce_generated_c4ad34f3.jpg` },
  { slug: "salle_de_bain", label: "Salle de bain", image: `${U}df0ede7ca_generated_69900a70.jpg` },
  { slug: "bureau", label: "Bureau", image: `${U}05bf3c1dd_generated_1c37b999.jpg` },
  { slug: "exterieur", label: "Extérieur", image: `${U}bf1acc69f_generated_37352d43.jpg` },
];

export const TROUVAILLE_CATEGORIES = [
  { slug: "petits_prix", label: "Petits prix", image: `${U}f5c2d634b_generated_bd734e38.jpg` },
  { slug: "moins_de_20", label: "Moins de 20 €", image: `${U}aaf98a59e_generated_a0ad42e3.jpg` },
  { slug: "pratiques", label: "Pratiques au quotidien", image: `${U}89836cbf6_generated_3513f5c4.jpg` },
  { slug: "rangement", label: "Rangement & organisation", image: `${U}fe916ad77_generated_903e82d2.jpg` },
  { slug: "deco", label: "Déco", image: `${U}ba243f989_generated_2ff5795c.jpg` },
  { slug: "confort", label: "Confort", image: `${U}ce10be677_generated_33ce3568.jpg` },
];

export const ALL_CATEGORIES = [...PIECE_CATEGORIES, ...TROUVAILLE_CATEGORIES];

export function getCategory(slug) {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export function groupForSlug(slug) {
  return PIECE_CATEGORIES.some((c) => c.slug === slug) ? "piece" : "trouvaille";
}