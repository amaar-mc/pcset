import { describe, expect, it } from "vitest";
import { normalOrder, primeForm } from "../src/normal";

describe("normalOrder", () => {
  it("keeps a compact set in place", () => {
    expect(normalOrder([0, 1, 6])).toEqual([0, 1, 6]);
  });

  it("rotates to the most compact ordering", () => {
    expect(normalOrder([0, 4, 7])).toEqual([0, 4, 7]);
    expect(normalOrder([2, 1, 5, 8])).toEqual([1, 2, 5, 8]);
  });

  it("handles symmetric sets by lowest starting pitch class", () => {
    expect(normalOrder([4, 0, 8])).toEqual([0, 4, 8]);
    expect(normalOrder([9, 0, 3, 6])).toEqual([0, 3, 6, 9]);
  });

  it("is trivial for short sets", () => {
    expect(normalOrder([])).toEqual([]);
    expect(normalOrder([5])).toEqual([5]);
  });
});

describe("primeForm", () => {
  it("maps major and minor triads to the same prime form", () => {
    expect(primeForm([0, 4, 7])).toEqual([0, 3, 7]);
    expect(primeForm([0, 3, 7])).toEqual([0, 3, 7]);
  });

  it("computes well-known prime forms", () => {
    expect(primeForm([0, 3, 6])).toEqual([0, 3, 6]); // diminished triad, 3-10
    expect(primeForm([0, 4, 8])).toEqual([0, 4, 8]); // augmented triad, 3-12
    expect(primeForm([0, 4, 7, 10])).toEqual([0, 2, 5, 8]); // dominant seventh, 4-27
    expect(primeForm([0, 2, 4, 7, 9])).toEqual([0, 2, 4, 7, 9]); // major pentatonic, 5-35
    expect(primeForm([0, 2, 4, 6, 8, 10])).toEqual([0, 2, 4, 6, 8, 10]); // whole tone, 6-35
  });

  it("starts on 0", () => {
    expect(primeForm([1, 5, 8])[0]).toBe(0);
  });

  it("returns an empty prime form for the empty set", () => {
    expect(primeForm([])).toEqual([]);
  });
});
