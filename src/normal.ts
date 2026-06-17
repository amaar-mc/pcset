import { normalize } from "./chroma";
import { invert } from "./transform";
import type { PcSet } from "./types";

const MOD = 12;

/** Interval (ascending, mod 12) from a rotation's first pitch to its k-th pitch. */
function ascInterval(s: readonly number[], start: number, k: number): number {
  const n = s.length;
  return (((s[(start + k) % n] - s[start]) % MOD) + MOD) % MOD;
}

/**
 * True when the rotation starting at index `cand` is more compact than the one at `cur`.
 * Compares the outer interval (first to last) first, then works inward; a full tie is
 * broken by the lower starting pitch class. This is the standard rule (Straus, Rahn).
 */
function rotationIsMoreCompact(s: readonly number[], cand: number, cur: number): boolean {
  const n = s.length;
  for (let k = n - 1; k >= 1; k--) {
    const a = ascInterval(s, cand, k);
    const b = ascInterval(s, cur, k);
    if (a !== b) return a < b;
  }
  return s[cand] < s[cur];
}

/** Normal order: the most compact cyclic rotation of the set. */
export function normalOrder(pcs: readonly number[]): PcSet {
  const s = normalize(pcs);
  const n = s.length;
  if (n <= 1) return s;
  let best = 0;
  for (let i = 1; i < n; i++) {
    if (rotationIsMoreCompact(s, i, best)) best = i;
  }
  const out: number[] = [];
  for (let k = 0; k < n; k++) out.push(s[(best + k) % n]);
  return out;
}

/** Transpose an ordering so its first pitch class is 0, keeping the ascending interval shape. */
function zeroBased(order: readonly number[]): PcSet {
  const first = order[0];
  return order.map((x) => (((x - first) % MOD) + MOD) % MOD);
}

/** Compare two equal-length pitch sequences lexicographically. */
function compareSequences(a: readonly number[], b: readonly number[]): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

/**
 * Prime form: the canonical representative of a set class, using the Rahn algorithm.
 * Takes the more left-packed of the set's normal order and its inversion's normal order,
 * each transposed to begin on 0. For the small number of set classes where Forte and Rahn
 * disagree (for example 5-20, 6-31, 7-20), this returns the Rahn form.
 */
export function primeForm(pcs: readonly number[]): PcSet {
  const s = normalize(pcs);
  if (s.length === 0) return [];
  const original = zeroBased(normalOrder(s));
  const inverted = zeroBased(normalOrder(invert(s)));
  return compareSequences(original, inverted) <= 0 ? original : inverted;
}
