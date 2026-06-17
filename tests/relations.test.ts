import { describe, expect, it } from "vitest";
import {
  equals,
  isInversionOf,
  isSubsetOf,
  isSupersetOf,
  isTranspositionOf,
  isZRelatedTo,
  sameSetClass,
} from "../src/relations";

describe("equals", () => {
  it("ignores order and duplicates", () => {
    expect(equals([7, 0, 4], [0, 4, 7, 12])).toBe(true);
    expect(equals([0, 4, 7], [0, 3, 7])).toBe(false);
  });
});

describe("subset and superset", () => {
  it("detects literal containment", () => {
    expect(isSubsetOf([0, 4], [0, 4, 7])).toBe(true);
    expect(isSubsetOf([0, 5], [0, 4, 7])).toBe(false);
    expect(isSupersetOf([0, 4, 7], [0, 7])).toBe(true);
  });
});

describe("transposition and inversion equivalence", () => {
  it("relates a major triad to its transpositions", () => {
    expect(isTranspositionOf([0, 4, 7], [2, 6, 9])).toBe(true);
    expect(isTranspositionOf([0, 4, 7], [0, 3, 7])).toBe(false);
  });

  it("relates a major triad to a minor triad by inversion", () => {
    expect(isInversionOf([0, 4, 7], [0, 3, 7])).toBe(true);
  });

  it("groups major and minor triads in one set class", () => {
    expect(sameSetClass([0, 4, 7], [0, 3, 7])).toBe(true);
    expect(sameSetClass([0, 4, 7], [0, 3, 6])).toBe(false);
  });
});

describe("Z-relation", () => {
  it("relates the all-interval tetrachords", () => {
    expect(isZRelatedTo([0, 1, 4, 6], [0, 1, 3, 7])).toBe(true);
  });

  it("does not relate a set class to itself", () => {
    expect(isZRelatedTo([0, 4, 7], [0, 4, 7])).toBe(false);
  });

  it("does not relate sets with different interval vectors", () => {
    expect(isZRelatedTo([0, 4, 7], [0, 3, 6])).toBe(false);
  });
});
