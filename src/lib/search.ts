import type { SearchEntry } from "@/lib/catalog";

/**
 * Hindi/English cross-walk so either language finds the same item. Keys are
 * lowercase query tokens; values are equivalent tokens to also match against.
 */
const SYNONYMS: Record<string, string[]> = {
  diya: ["lamp", "deepak", "deep"],
  lamp: ["diya", "deepak"],
  deepak: ["diya", "lamp"],
  deep: ["diya", "deepak"],
  mala: ["garland", "haar"],
  garland: ["mala", "haar"],
  haar: ["mala", "garland"],
  phool: ["flower", "flowers"],
  flower: ["phool"],
  flowers: ["phool"],
  puja: ["pooja", "worship"],
  pooja: ["puja", "worship"],
  worship: ["puja", "pooja"],
  havan: ["hawan", "homa"],
  hawan: ["havan", "homa"],
  homa: ["havan", "hawan"],
  marigold: ["genda"],
  genda: ["marigold"],
  rose: ["gulab"],
  gulab: ["rose"],
  thali: ["plate"],
  samagri: ["kit", "essentials"],
  kit: ["samagri"],
};

const splitWords = (text: string) => text.toLowerCase().split(/[\s,\-–&/()]+/).filter(Boolean);

/** Every token the query should match: the typed tokens plus their synonyms. */
export function queryTokens(query: string): string[][] {
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => [token, ...(SYNONYMS[token] ?? [])]);
}

function tokenScore(entry: SearchEntry, candidates: string[]): number {
  const titleWords = splitWords(`${entry.title} ${(entry.keywords ?? []).join(" ")}`);
  const descriptionWords = splitWords(entry.description);
  const titleText = `${entry.title} ${(entry.keywords ?? []).join(" ")}`.toLowerCase();
  const descriptionText = entry.description.toLowerCase();

  let best = 0;
  for (const token of candidates) {
    let score = 0;
    if (titleWords.some((w) => w === token)) score = 110;
    else if (titleWords.some((w) => w.startsWith(token))) score = 80;
    else if (titleText.includes(token)) score = 60;
    else if (descriptionWords.some((w) => w.startsWith(token))) score = 40;
    else if (descriptionText.includes(token)) score = 25;
    if (score > best) best = score;
  }
  return best;
}

export type RankedEntry = { entry: SearchEntry; score: number };

/**
 * Ranked search: name matches outrank description matches, token-prefix word
 * matches outrank substring hits, and every query token must hit something
 * (through itself or a synonym) for an entry to qualify. Higher score wins;
 * ties keep index order.
 */
export function rankSearch(entries: SearchEntry[], query: string, limit = 12): RankedEntry[] {
  const tokenGroups = queryTokens(query);
  if (tokenGroups.length === 0) return [];

  const scored: RankedEntry[] = [];
  entries.forEach((entry, index) => {
    let score = 0;
    for (const candidates of tokenGroups) {
      const tokenBest = tokenScore(entry, candidates);
      if (tokenBest === 0) {
        score = 0;
        break;
      }
      score += tokenBest;
    }
    if (score > 0) scored.push({ entry, score: score - index * 0.001 });
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
