import { describe, expect, it } from "vitest";
import { setClass } from "../src/setclass";

describe("setClass", () => {
  it("describes the major triad", () => {
    const sc = setClass([7, 0, 4]);
    expect(sc.pcs).toEqual([0, 4, 7]);
    expect(sc.normalOrder).toEqual([0, 4, 7]);
    expect(sc.primeForm).toEqual([0, 3, 7]);
    expect(sc.cardinality).toBe(3);
    expect(sc.intervalVector).toEqual([0, 0, 1, 1, 1, 0]);
    expect(sc.complementPrimeForm.length).toBe(9);
    expect(sc.zPartner).toBeNull();
    expect(sc.transpositionalSymmetry).toBe(1);
    expect(sc.inversionalSymmetry).toBe(0);
  });

  it("reports symmetry for the augmented triad", () => {
    const sc = setClass([0, 4, 8]);
    expect(sc.transpositionalSymmetry).toBe(3);
    expect(sc.inversionalSymmetry).toBe(3);
  });

  it("reports symmetry for the whole-tone and diminished-seventh collections", () => {
    expect(setClass([0, 2, 4, 6, 8, 10]).transpositionalSymmetry).toBe(6);
    expect(setClass([0, 3, 6, 9]).transpositionalSymmetry).toBe(4);
  });

  it("links the all-interval tetrachords as Z-partners", () => {
    expect(setClass([0, 1, 4, 6]).zPartner).toEqual([0, 1, 3, 7]);
    expect(setClass([0, 1, 3, 7]).zPartner).toEqual([0, 1, 4, 6]);
  });

  it("handles the empty set", () => {
    const sc = setClass([]);
    expect(sc.cardinality).toBe(0);
    expect(sc.primeForm).toEqual([]);
    expect(sc.complementPrimeForm.length).toBe(12);
  });
});
