import { catalogEntry } from "./catalog";
import { normalize } from "./chroma";
import { forteName } from "./forte";
import { normalOrder, primeForm } from "./normal";
import type { PcSet, SetClassInfo } from "./types";
import { intervalVector } from "./vector";

const fromKey = (key: string): PcSet => (key === "" ? [] : key.split(",").map(Number));

/** Describe the full set class of a pitch-class set in one call. */
export function setClass(pcs: readonly number[]): SetClassInfo {
  const norm = normalize(pcs);
  const pf = primeForm(norm);
  const entry = catalogEntry(norm);
  return {
    pcs: norm,
    normalOrder: normalOrder(norm),
    primeForm: pf,
    forte: forteName(pf.join(",")),
    cardinality: norm.length,
    intervalVector: intervalVector(norm),
    complementPrimeForm: fromKey(entry.complementKey),
    zPartner: entry.zPartnerKey === null ? null : fromKey(entry.zPartnerKey),
    transpositionalSymmetry: entry.transpositionalSymmetry,
    inversionalSymmetry: entry.inversionalSymmetry,
  };
}
