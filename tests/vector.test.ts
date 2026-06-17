import { describe, expect, it } from "vitest";
import { intervalVector } from "../src/vector";

describe("intervalVector", () => {
  it("computes the major triad vector", () => {
    expect(intervalVector([0, 4, 7])).toEqual([0, 0, 1, 1, 1, 0]);
  });

  it("computes the diminished triad vector", () => {
    expect(intervalVector([0, 3, 6])).toEqual([0, 0, 2, 0, 0, 1]);
  });

  it("computes the augmented triad vector", () => {
    expect(intervalVector([0, 4, 8])).toEqual([0, 0, 0, 3, 0, 0]);
  });

  it("computes the whole-tone scale vector", () => {
    expect(intervalVector([0, 2, 4, 6, 8, 10])).toEqual([0, 6, 0, 6, 0, 3]);
  });

  it("computes the diatonic scale vector", () => {
    expect(intervalVector([0, 2, 4, 5, 7, 9, 11])).toEqual([2, 5, 4, 3, 6, 1]);
  });

  it("gives the all-interval tetrachords a flat vector", () => {
    expect(intervalVector([0, 1, 4, 6])).toEqual([1, 1, 1, 1, 1, 1]);
    expect(intervalVector([0, 1, 3, 7])).toEqual([1, 1, 1, 1, 1, 1]);
  });

  it("sums to the number of pitch-class pairs", () => {
    const v = intervalVector([0, 1, 2, 5, 8]);
    expect(v.reduce((a, b) => a + b, 0)).toBe((5 * 4) / 2);
  });
});
