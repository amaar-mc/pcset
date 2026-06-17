import { catalog } from "./catalog";
import { primeForm } from "./normal";

/**
 * Representative pitch-class sets for Forte's set classes of cardinality 3, 4, 5, and 6.
 * Each representative is run through primeForm() to key it, so a listed form may be
 * either Forte's or Rahn's prime form; both pick out the same set class. Cardinalities
 * 7, 8, and 9 are derived by complement, since a set class and its complement share the
 * Forte ordinal and Z designation. Cardinalities outside 3 through 9 have no Forte number.
 *
 * The hexachord representatives and their z designations come from the music21 Forte table
 * and are cross-checked against this library's independently computed catalog: the
 * structural tests confirm that the z marking matches the catalog's interval-vector Z
 * detection for every hexachord, that all 50 classes are covered, and that each label is
 * unique.
 */
const REPRESENTATIVES: ReadonlyArray<readonly [string, readonly number[]]> = [
  ["3-1", [0, 1, 2]],
  ["3-2", [0, 1, 3]],
  ["3-3", [0, 1, 4]],
  ["3-4", [0, 1, 5]],
  ["3-5", [0, 1, 6]],
  ["3-6", [0, 2, 4]],
  ["3-7", [0, 2, 5]],
  ["3-8", [0, 2, 6]],
  ["3-9", [0, 2, 7]],
  ["3-10", [0, 3, 6]],
  ["3-11", [0, 3, 7]],
  ["3-12", [0, 4, 8]],
  ["4-1", [0, 1, 2, 3]],
  ["4-2", [0, 1, 2, 4]],
  ["4-3", [0, 1, 3, 4]],
  ["4-4", [0, 1, 2, 5]],
  ["4-5", [0, 1, 2, 6]],
  ["4-6", [0, 1, 2, 7]],
  ["4-7", [0, 1, 4, 5]],
  ["4-8", [0, 1, 5, 6]],
  ["4-9", [0, 1, 6, 7]],
  ["4-10", [0, 2, 3, 5]],
  ["4-11", [0, 1, 3, 5]],
  ["4-12", [0, 2, 3, 6]],
  ["4-13", [0, 1, 3, 6]],
  ["4-14", [0, 2, 3, 7]],
  ["4-z15", [0, 1, 4, 6]],
  ["4-16", [0, 1, 5, 7]],
  ["4-17", [0, 3, 4, 7]],
  ["4-18", [0, 1, 4, 7]],
  ["4-19", [0, 1, 4, 8]],
  ["4-20", [0, 1, 5, 8]],
  ["4-21", [0, 2, 4, 6]],
  ["4-22", [0, 2, 4, 7]],
  ["4-23", [0, 2, 5, 7]],
  ["4-24", [0, 2, 4, 8]],
  ["4-25", [0, 2, 6, 8]],
  ["4-26", [0, 3, 5, 8]],
  ["4-27", [0, 2, 5, 8]],
  ["4-28", [0, 3, 6, 9]],
  ["4-z29", [0, 1, 3, 7]],
  ["5-1", [0, 1, 2, 3, 4]],
  ["5-2", [0, 1, 2, 3, 5]],
  ["5-3", [0, 1, 2, 4, 5]],
  ["5-4", [0, 1, 2, 3, 6]],
  ["5-5", [0, 1, 2, 3, 7]],
  ["5-6", [0, 1, 2, 5, 6]],
  ["5-7", [0, 1, 2, 6, 7]],
  ["5-8", [0, 2, 3, 4, 6]],
  ["5-9", [0, 1, 2, 4, 6]],
  ["5-10", [0, 1, 3, 4, 6]],
  ["5-11", [0, 2, 3, 4, 7]],
  ["5-z12", [0, 1, 3, 5, 6]],
  ["5-13", [0, 1, 2, 4, 8]],
  ["5-14", [0, 1, 2, 5, 7]],
  ["5-15", [0, 1, 2, 6, 8]],
  ["5-16", [0, 1, 3, 4, 7]],
  ["5-z17", [0, 1, 3, 4, 8]],
  ["5-z18", [0, 1, 4, 5, 7]],
  ["5-19", [0, 1, 3, 6, 7]],
  ["5-20", [0, 1, 5, 6, 8]],
  ["5-21", [0, 1, 4, 5, 8]],
  ["5-22", [0, 1, 4, 7, 8]],
  ["5-23", [0, 2, 3, 5, 7]],
  ["5-24", [0, 1, 3, 5, 7]],
  ["5-25", [0, 2, 3, 5, 8]],
  ["5-26", [0, 2, 4, 5, 8]],
  ["5-27", [0, 1, 3, 5, 8]],
  ["5-28", [0, 2, 3, 6, 8]],
  ["5-29", [0, 1, 3, 6, 8]],
  ["5-30", [0, 1, 4, 6, 8]],
  ["5-31", [0, 1, 3, 6, 9]],
  ["5-32", [0, 1, 4, 6, 9]],
  ["5-33", [0, 2, 4, 6, 8]],
  ["5-34", [0, 2, 4, 6, 9]],
  ["5-35", [0, 2, 4, 7, 9]],
  ["5-z36", [0, 1, 2, 4, 7]],
  ["5-z37", [0, 3, 4, 5, 8]],
  ["5-z38", [0, 1, 2, 5, 8]],
  ["6-1", [0, 1, 2, 3, 4, 5]],
  ["6-2", [0, 1, 2, 3, 4, 6]],
  ["6-z3", [0, 1, 2, 3, 5, 6]],
  ["6-z4", [0, 1, 2, 4, 5, 6]],
  ["6-5", [0, 1, 2, 3, 6, 7]],
  ["6-z6", [0, 1, 2, 5, 6, 7]],
  ["6-7", [0, 1, 2, 6, 7, 8]],
  ["6-8", [0, 2, 3, 4, 5, 7]],
  ["6-9", [0, 1, 2, 3, 5, 7]],
  ["6-z10", [0, 1, 3, 4, 5, 7]],
  ["6-z11", [0, 1, 2, 4, 5, 7]],
  ["6-z12", [0, 1, 2, 4, 6, 7]],
  ["6-z13", [0, 1, 3, 4, 6, 7]],
  ["6-14", [0, 1, 3, 4, 5, 8]],
  ["6-15", [0, 1, 2, 4, 5, 8]],
  ["6-16", [0, 1, 4, 5, 6, 8]],
  ["6-z17", [0, 1, 2, 4, 7, 8]],
  ["6-18", [0, 1, 2, 5, 7, 8]],
  ["6-z19", [0, 1, 3, 4, 7, 8]],
  ["6-20", [0, 1, 4, 5, 8, 9]],
  ["6-21", [0, 2, 3, 4, 6, 8]],
  ["6-22", [0, 1, 2, 4, 6, 8]],
  ["6-z23", [0, 2, 3, 5, 6, 8]],
  ["6-z24", [0, 1, 3, 4, 6, 8]],
  ["6-z25", [0, 1, 3, 5, 6, 8]],
  ["6-z26", [0, 1, 3, 5, 7, 8]],
  ["6-27", [0, 1, 3, 4, 6, 9]],
  ["6-z28", [0, 1, 3, 5, 6, 9]],
  ["6-z29", [0, 1, 3, 6, 8, 9]],
  ["6-30", [0, 1, 3, 6, 7, 9]],
  ["6-31", [0, 1, 3, 5, 8, 9]],
  ["6-32", [0, 2, 4, 5, 7, 9]],
  ["6-33", [0, 2, 3, 5, 7, 9]],
  ["6-34", [0, 1, 3, 5, 7, 9]],
  ["6-35", [0, 2, 4, 6, 8, 10]],
  ["6-z36", [0, 1, 2, 3, 4, 7]],
  ["6-z37", [0, 1, 2, 3, 4, 8]],
  ["6-z38", [0, 1, 2, 3, 7, 8]],
  ["6-z39", [0, 2, 3, 4, 5, 8]],
  ["6-z40", [0, 1, 2, 3, 5, 8]],
  ["6-z41", [0, 1, 2, 3, 6, 8]],
  ["6-z42", [0, 1, 2, 3, 6, 9]],
  ["6-z43", [0, 1, 2, 5, 6, 8]],
  ["6-z44", [0, 1, 2, 5, 6, 9]],
  ["6-z45", [0, 2, 3, 4, 6, 9]],
  ["6-z46", [0, 1, 2, 4, 6, 9]],
  ["6-z47", [0, 1, 2, 4, 7, 9]],
  ["6-z48", [0, 1, 2, 5, 7, 9]],
  ["6-z49", [0, 1, 3, 4, 7, 9]],
  ["6-z50", [0, 1, 4, 6, 7, 9]],
];

const keyOf = (pcs: readonly number[]): string => primeForm(pcs).join(",");

/** Replace the cardinality prefix of a Forte label, keeping the ordinal and any z. */
function withCardinality(label: string, cardinality: number): string {
  const ordinal = label.slice(label.indexOf("-") + 1);
  return `${cardinality}-${ordinal}`;
}

let labelByKey: Map<string, string> | null = null;

function labels(): Map<string, string> {
  if (labelByKey) return labelByKey;
  const out = new Map<string, string>();
  for (const [label, pcs] of REPRESENTATIVES) out.set(keyOf(pcs), label);

  // Derive cardinalities 7, 8, 9 from their complements in 5, 4, 3.
  for (const entry of catalog().values()) {
    if (entry.cardinality < 7 || entry.cardinality > 9) continue;
    const complementLabel = out.get(entry.complementKey);
    if (complementLabel !== undefined) {
      out.set(entry.key, withCardinality(complementLabel, entry.cardinality));
    }
  }

  labelByKey = out;
  return out;
}

/** Forte set-class number for a prime-form key, or null when none is assigned. */
export function forteName(primeFormKey: string): string | null {
  return labels().get(primeFormKey) ?? null;
}

/**
 * Forte set-class number of a pitch-class set, for example "3-11", "4-z15", or "6-z44".
 * Returns null for cardinalities outside 3 through 9.
 */
export function forte(pcs: readonly number[]): string | null {
  return forteName(keyOf(pcs));
}
