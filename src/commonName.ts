import { primeForm } from "./normal";

/**
 * Table mapping prime-form keys to well-established common names.
 *
 * Every entry is keyed by the output of primeForm() applied to a representative
 * pitch-class set, so the keys are correct by construction: if the prime form
 * algorithm changes, the table updates automatically.
 *
 * Where a set class contains multiple acoustically distinct chord types that
 * are related by inversion (such as dominant seventh and half-diminished
 * seventh, which share Forte 4-27), the label names both rather than asserting
 * a single quality that would be misleading. The same applies to major and
 * minor triads (3-11) and major and minor pentatonic (5-35), which are
 * inversionally related and therefore share a set class.
 *
 * Only names that are genuinely standard in tonal-music pedagogy and
 * post-tonal music theory are included; the table is intentionally small.
 */

type NameEntry = readonly [readonly number[], string];

const NAME_ENTRIES: readonly NameEntry[] = [
  // Trichords
  [[0, 3, 7], "major/minor triad (3-11)"],
  [[0, 3, 6], "diminished triad (3-10)"],
  [[0, 4, 8], "augmented triad (3-12)"],
  // Tetrachords
  [[0, 2, 5, 8], "dominant seventh / half-diminished seventh (4-27)"],
  [[0, 3, 5, 8], "minor seventh chord (4-26)"],
  [[0, 1, 5, 8], "major seventh chord (4-20)"],
  [[0, 3, 6, 9], "diminished seventh chord (4-28)"],
  // Pentachords
  [[0, 2, 4, 7, 9], "major/minor pentatonic (5-35)"],
  // Hexachords
  [[0, 2, 4, 6, 8, 10], "whole-tone scale (6-35)"],
  // Heptachords
  [[0, 1, 3, 5, 6, 8, 10], "diatonic / major scale (7-35)"],
  // Octachords
  [[0, 1, 3, 4, 6, 7, 9, 10], "octatonic / diminished scale (8-28)"],
];

let nameByKey: Map<string, string> | null = null;

function names(): Map<string, string> {
  if (nameByKey) return nameByKey;
  const out = new Map<string, string>();
  for (const [rep, label] of NAME_ENTRIES) {
    const key = primeForm(rep).join(",");
    out.set(key, label);
  }
  nameByKey = out;
  return out;
}

/**
 * Returns a widely recognized common name for the set class of a pitch-class
 * set, or null when no standard name is assigned.
 *
 * The lookup is by prime form, so any transposition or inversion of a named
 * set class returns the same name. When a set class legitimately contains
 * multiple acoustically distinct chord types (for example dominant seventh
 * and half-diminished seventh, which share Forte 4-27), both names are
 * returned rather than a misleading single label.
 *
 * @example
 * commonName([0, 4, 7])          // "major/minor triad (3-11)"
 * commonName([2, 6, 9])          // "major/minor triad (3-11)"
 * commonName([0, 2, 4, 6, 8, 10]) // "whole-tone scale (6-35)"
 * commonName([0, 1, 2, 3, 4])   // null
 */
export function commonName(pcs: readonly number[]): string | null {
  return names().get(primeForm(pcs).join(",")) ?? null;
}
