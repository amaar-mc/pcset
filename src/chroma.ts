import type { Chroma, PcSet } from "./types";

const MOD = 12;
const CHROMA_RE = /^[01]{12}$/;

/** Reduce raw pitch integers to a canonical set: each value mod 12, de-duplicated, ascending. */
export function normalize(pcs: readonly number[]): PcSet {
  const seen = new Set<number>();
  for (const p of pcs) {
    if (!Number.isInteger(p)) {
      throw new TypeError(`pitch class must be an integer, received ${String(p)}`);
    }
    seen.add(((p % MOD) + MOD) % MOD);
  }
  return [...seen].sort((a, b) => a - b);
}

/** Convert a set to a 12-character chroma string (index i is "1" when pitch class i is present). */
export function toChroma(pcs: readonly number[]): Chroma {
  const bits = Array<string>(MOD).fill("0");
  for (const p of normalize(pcs)) bits[p] = "1";
  return bits.join("");
}

/** Parse a 12-character chroma string into a normalized set. */
export function fromChroma(chroma: Chroma): PcSet {
  if (!CHROMA_RE.test(chroma)) {
    throw new TypeError(
      `chroma must be 12 characters of 0 or 1, received ${JSON.stringify(chroma)}`,
    );
  }
  const out: number[] = [];
  for (let i = 0; i < MOD; i++) if (chroma[i] === "1") out.push(i);
  return out;
}

/** Convert a set to its set number (0..4095), compatible with tonal's pcset encoding. */
export function toNumber(pcs: readonly number[]): number {
  return Number.parseInt(toChroma(pcs), 2);
}

/** Convert a set number (0..4095) back into a normalized set. */
export function fromNumber(num: number): PcSet {
  if (!Number.isInteger(num) || num < 0 || num > 4095) {
    throw new RangeError(`set number must be an integer in 0..4095, received ${String(num)}`);
  }
  return fromChroma(num.toString(2).padStart(MOD, "0"));
}
