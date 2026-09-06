// Hooks de lecture du contenu — chargent automatiquement tous les fichiers
// JSON présents dans content/produits/ et content/inspirations/. Ces
// fichiers sont créés/modifiés soit à la main, soit via le panneau
// d'administration mobile (/admin), qui les enregistre directement dans le
// dépôt Git : chaque modification déclenche une reconstruction automatique
// du site par Netlify.

const productModules = import.meta.glob("/content/produits/*.json", { eager: true });
const inspirationModules = import.meta.glob("/content/inspirations/*.json", { eager: true });

function toArray(modules, folder) {
  return Object.entries(modules).map(([path, mod]) => {
    const id = path.replace(`/content/${folder}/`, "").replace(/\.json$/, "");
    return { id, ...(mod.default ?? mod) };
  });
}

const allProducts = toArray(productModules, "produits");
const allInspirations = toArray(inspirationModules, "inspirations");

function matches(item, filter) {
  return Object.entries(filter).every(([key, value]) => item[key] === value);
}

export function useProducts(filter = {}, limit = 200) {
  const items = allProducts.filter((p) => matches(p, filter)).slice(0, limit);
  return { items, loading: false };
}

export function useInspirations(filter = { published: true }, limit = 100) {
  const items = allInspirations.filter((i) => matches(i, filter)).slice(0, limit);
  return { items, loading: false };
}

export function useInspiration(id) {
  const item = allInspirations.find((i) => i.id === id) || null;
  return { item, loading: false };
}
