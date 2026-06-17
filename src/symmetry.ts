import { normalize, toNumber } from "./chroma";
import { invertAround, transpose } from "./transform";

const MOD = 12;

/** Count of transpositions Tn (n in 0..11) that map the set onto itself; always at least 1. */
export function transpositionalSymmetry(pcs: readonly number[]): number {
  const s = normalize(pcs);
  if (s.length === 0) return MOD;
  const target = toNumber(s);
  let count = 0;
  for (let n = 0; n < MOD; n++) if (toNumber(transpose(s, n)) === target) count++;
  return count;
}

/** Count of inversions TnI (n in 0..11) that map the set onto itself. */
export function inversionalSymmetry(pcs: readonly number[]): number {
  const s = normalize(pcs);
  if (s.length === 0) return MOD;
  const target = toNumber(s);
  let count = 0;
  for (let axis = 0; axis < MOD; axis++) if (toNumber(invertAround(s, axis)) === target) count++;
  return count;
}
