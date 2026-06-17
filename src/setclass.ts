import { catalogEntry } from "./catalog";
import { normalize } from "./chroma";
import { normalOrder, primeForm } from "./normal";
import type { PcSet, SetClassInfo } from "./types";
import { intervalVector } from "./vector";

const fromKey = (key: string): PcSet => (key === "" ? [] : key.split(",").map(Number));

/** Describe the full set class of a pitch-class set in one call. */
export function setClass(pcs: readonly number[]): SetClassInfo {
  const norm = normalize(pcs);
  const entry = catalogEntry(norm);
  return {
    pcs: norm,
    normalOrder: normalOrder(norm),
    primeForm: primeForm(norm),
    cardinality: norm.length,
    intervalVector: intervalVector(norm),
    complementPrimeForm: fromKey(entry.complementKey),
    zPartner: entry.zPartnerKey === null ? null : fromKey(entry.zPartnerKey),
    transpositionalSymmetry: entry.transpositionalSymmetry,
    inversionalSymmetry: entry.inversionalSymmetry,
  };
}
