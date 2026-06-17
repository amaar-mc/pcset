import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { fromChroma, fromNumber, normalize, toChroma, toNumber } from "../src/chroma";
import { normalOrder, primeForm } from "../src/normal";
import { sameSetClass } from "../src/relations";
import { invertAround, transpose } from "../src/transform";
import { intervalVector } from "../src/vector";

const pcsArb = fc.array(fc.integer({ min: -24, max: 35 }), { maxLength: 14 });
const semitone = fc.integer({ min: 0, max: 11 });

describe("invariants", () => {
  it("normalizes to sorted, unique values in 0..11", () => {
    fc.assert(
      fc.property(pcsArb, (pcs) => {
        const s = normalize(pcs);
        for (let i = 1; i < s.length; i++) expect(s[i]).toBeGreaterThan(s[i - 1]);
        for (const p of s) {
          expect(p).toBeGreaterThanOrEqual(0);
          expect(p).toBeLessThan(12);
        }
      }),
    );
  });

  it("round-trips through chroma and set number", () => {
    fc.assert(
      fc.property(pcsArb, (pcs) => {
        const s = normalize(pcs);
        expect(fromChroma(toChroma(pcs))).toEqual(s);
        expect(fromNumber(toNumber(pcs))).toEqual(s);
      }),
    );
  });

  it("keeps normal order a permutation of the set", () => {
    fc.assert(
      fc.property(pcsArb, (pcs) => {
        expect([...normalOrder(pcs)].sort((a, b) => a - b)).toEqual(normalize(pcs));
      }),
    );
  });

  it("makes prime form idempotent and zero-based", () => {
    fc.assert(
      fc.property(pcsArb, (pcs) => {
        const pf = primeForm(pcs);
        expect(primeForm(pf)).toEqual(pf);
        if (pf.length > 0) expect(pf[0]).toBe(0);
      }),
    );
  });

  it("preserves set class and interval vector under transposition", () => {
    fc.assert(
      fc.property(pcsArb, semitone, (pcs, n) => {
        if (normalize(pcs).length === 0) return;
        expect(sameSetClass(pcs, transpose(pcs, n))).toBe(true);
        expect(intervalVector(transpose(pcs, n))).toEqual(intervalVector(pcs));
      }),
    );
  });

  it("preserves set class and interval vector under inversion", () => {
    fc.assert(
      fc.property(pcsArb, semitone, (pcs, axis) => {
        if (normalize(pcs).length === 0) return;
        expect(sameSetClass(pcs, invertAround(pcs, axis))).toBe(true);
        expect(intervalVector(invertAround(pcs, axis))).toEqual(intervalVector(pcs));
      }),
    );
  });
});
