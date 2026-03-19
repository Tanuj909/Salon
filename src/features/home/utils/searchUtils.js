/**
 * Helper to enrich service names with common synonyms for better fuzzy matching.
 */
export const enrichSynonyms = (name) => {
  if (!name) return [];
  const lower = name.toLowerCase();
  const synonyms = [];
  
  // ✂️ Hair Services
  if (/hair|cut|style|wash|dry|treatment|color|highlight|keratin|botox|scalp|dandruff/i.test(lower)) {
    synonyms.push("hair", "haircut", "styling", "wash", "blow dry", "hair spa", "hair color", "smoothening", "highlights", "straightening", "treatment");
  }
  
  // 🧔 Beard & Grooming
  if (/beard|shave|groom|trim|mustache/i.test(lower)) {
    synonyms.push("beard", "shaving", "trim", "shave", "clean shave", "beard styling", "grooming", "mustache");
  }
  
  // 🧴 Skin & Facial
  if (/facial|face|cleanup|detan|bleach|aging|acne|polish|hydrate|gold|o3\+|fruit/i.test(lower)) {
    synonyms.push("facial", "cleanup", "detan", "bleach", "skin polishing", "gold facial", "o3+ facial", "fruit facial", "glow", "face care");
  }
  
  // 🪒 Hair Removal (Waxing/Threading)
  if (/wax|thread|removal|arm|leg|body|brow|lip|laser/i.test(lower)) {
    synonyms.push("waxing", "threading", "hair removal", "eyebrows", "upper lip", "full body wax", "full arms", "full legs", "laser hair removal");
  }
  
  // 💅 Nail Services
  if (/nail|manicure|pedicure|extensions|gel|polish/i.test(lower)) {
    synonyms.push("nails", "manicure", "pedicure", "nail extensions", "nail art", "gel nails", "nail polish", "nail repair");
  }
  
  // 🧘 Spa & Relaxation
  if (/massage|spa|relax|oil|aroma|therapy|foot|back/i.test(lower)) {
    synonyms.push("spa", "massage", "head massage", "body massage", "oil massage", "relaxation", "foot spa", "therapy");
  }
  
  // 💄 Makeup Services
  if (/makeup|make up|party|engagement|reception|hd|airbrush|natural|glam/i.test(lower)) {
    synonyms.push("makeup", "party makeup", "hd makeup", "airbrush", "natural makeup", "engagement", "reception", "glam");
  }
  
  // 👰 Bridal Services
  if (/bridal|wedding|pre-bridal|groom|package/i.test(lower)) {
    synonyms.push("bridal", "wedding", "package", "pre-bridal", "groom", "bridal makeup", "bridal hair");
  }

  // Deduplication and cleanup
  return Array.from(new Set(synonyms));
};

/**
 * Fuse.js configuration for fuzzy search.
 */
export const fuseOptions = {
  keys: [
    { name: "name", weight: 0.7 },
    { name: "synonyms", weight: 0.3 }
  ],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  findAllMatches: true,
  minMatchCharLength: 2
};
