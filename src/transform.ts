import { normalize } from "./chroma";
import type { PcSet } from "./types";

const MOD = 12;

/** Transpose every pitch class by n semitones (Tn). */
export function transpose(pcs: readonly number[], n: number): PcSet {
  if (!Number.isInteger(n)) {
    throw new TypeError(`transposition must be an integer, received ${String(n)}`);
  }
  return normalize(normalize(pcs).map((p) => p + n));
}

/** Invert the set about pitch class 0 (T0I). */
export function invert(pcs: readonly number[]): PcSet {
  return normalize(normalize(pcs).map((p) => -p));
}

/** Invert the set about an axis, equivalent to TnI with n = axis. */
export function invertAround(pcs: readonly number[], axis: number): PcSet {
  if (!Number.isInteger(axis)) {
    throw new TypeError(`inversion axis must be an integer, received ${String(axis)}`);
  }
  return normalize(normalize(pcs).map((p) => axis - p));
}

/** The set of pitch classes not present in the input (its literal complement). */
export function complement(pcs: readonly number[]): PcSet {
  const present = new Set(normalize(pcs));
  const out: number[] = [];
  for (let i = 0; i < MOD; i++) if (!present.has(i)) out.push(i);
  return out;
}
