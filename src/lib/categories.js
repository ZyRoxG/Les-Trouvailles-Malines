// Définition des catégories — les images sont désormais modifiables depuis
// le panneau d'administration (/admin/ > Réglages du site > Photos des
// catégories), stockées dans content/categories.json.

import categoriesContent from "../../content/categories.json";

const LABELS = {
  salon: "Salon",
  cuisine: "Cuisine",
  chambre: "Chambre",
  salle_de_bain: "Salle de bain",
  bureau: "Bureau",
  exterieur: "Extérieur",
  petits_prix: "Petits prix",
  moins_de_20: "Moins de 20 €",
  pratiques: "Pratiques au quotidien",
  rangement: "Rangement & organisation",
  deco: "Déco",
  confort: "Confort",
};

const PIECE_SLUGS = ["salon", "cuisine", "chambre", "salle_de_bain", "bureau", "exterieur"];
const TROUVAILLE_SLUGS = ["petits_prix", "moins_de_20", "pratiques", "rangement", "deco", "confort"];

function imageFor(slug) {
  const entry = (categoriesContent.images || []).find((i) => i.slug === slug);
  return entry ? entry.image : "";
}

function buildCategories(slugs) {
  return slugs.map((slug) => ({ slug, label: LABELS[slug], image: imageFor(slug) }));
}

export const PIECE_CATEGORIES = buildCategories(PIECE_SLUGS);
export const TROUVAILLE_CATEGORIES = buildCategories(TROUVAILLE_SLUGS);
export const ALL_CATEGORIES = [...PIECE_CATEGORIES, ...TROUVAILLE_CATEGORIES];

export function getCategory(slug) {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export function groupForSlug(slug) {
  return PIECE_CATEGORIES.some((c) => c.slug === slug) ? "piece" : "trouvaille";
}
