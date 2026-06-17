import { normalize } from "./chroma";
import type { IntervalVector } from "./types";

const MOD = 12;

/** Interval-class vector: the count of each interval class (1..6) across all pitch pairs. */
export function intervalVector(pcs: readonly number[]): IntervalVector {
  const s = normalize(pcs);
  const v: [number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const d = Math.abs(s[i] - s[j]) % MOD;
      const ic = Math.min(d, MOD - d);
      v[ic - 1]++;
    }
  }
  return v;
}
