import { describe, expect, it } from "vitest";
import { catalog } from "../src/catalog";
import { forte, forteName } from "../src/forte";

describe("forte: known values", () => {
  it("labels every trichord", () => {
    expect(forte([0, 1, 2])).toBe("3-1");
    expect(forte([0, 1, 3])).toBe("3-2");
    expect(forte([0, 1, 4])).toBe("3-3");
    expect(forte([0, 1, 5])).toBe("3-4");
    expect(forte([0, 1, 6])).toBe("3-5");
    expect(forte([0, 2, 4])).toBe("3-6");
    expect(forte([0, 2, 5])).toBe("3-7");
    expect(forte([0, 2, 6])).toBe("3-8");
    expect(forte([0, 2, 7])).toBe("3-9");
    expect(forte([0, 3, 6])).toBe("3-10");
    expect(forte([0, 3, 7])).toBe("3-11");
    expect(forte([0, 4, 8])).toBe("3-12");
  });

  it("labels major and minor triads identically", () => {
    expect(forte([0, 4, 7])).toBe("3-11");
    expect(forte([2, 6, 9])).toBe("3-11");
  });

  it("labels well-known tetrachords", () => {
    expect(forte([0, 1, 2, 3])).toBe("4-1");
    expect(forte([0, 3, 6, 9])).toBe("4-28"); // diminished seventh
    expect(forte([0, 4, 7, 10])).toBe("4-27"); // dominant seventh
    expect(forte([0, 1, 4, 6])).toBe("4-z15"); // all-interval tetrachords
    expect(forte([0, 1, 3, 7])).toBe("4-z29");
  });

  it("labels well-known pentachords", () => {
    expect(forte([0, 1, 2, 3, 4])).toBe("5-1");
    expect(forte([0, 2, 4, 7, 9])).toBe("5-35"); // major pentatonic
    expect(forte([0, 2, 4, 6, 8])).toBe("5-33"); // whole-tone pentachord
    expect(forte([0, 1, 3, 5, 6])).toBe("5-z12");
    expect(forte([0, 1, 2, 4, 7])).toBe("5-z36");
  });

  it("labels well-known hexachords", () => {
    expect(forte([0, 1, 2, 3, 4, 5])).toBe("6-1"); // chromatic hexachord
    expect(forte([0, 2, 4, 6, 8, 10])).toBe("6-35"); // whole-tone scale
    expect(forte([0, 1, 4, 5, 8, 9])).toBe("6-20"); // hexatonic (augmented) scale
    expect(forte([0, 2, 4, 5, 7, 9])).toBe("6-32"); // diatonic hexachord
    expect(forte([0, 1, 2, 6, 7, 8])).toBe("6-7"); // non-Z, self-complementary
  });

  it("labels Z-related hexachord pairs with z", () => {
    expect(forte([0, 1, 2, 3, 5, 6])).toBe("6-z3");
    expect(forte([0, 1, 2, 3, 4, 7])).toBe("6-z36"); // Z partner of 6-z3
    expect(forte([0, 1, 3, 4, 7, 8])).toBe("6-z19");
    expect(forte([0, 1, 2, 5, 6, 9])).toBe("6-z44"); // Z partner of 6-z19
  });

  it("derives larger cardinalities by complement", () => {
    expect(forte([0, 2, 4, 5, 7, 9, 11])).toBe("7-35"); // diatonic, complement of 5-35
    expect(forte([0, 1, 3, 4, 6, 7, 9, 10])).toBe("8-28"); // octatonic, complement of 4-28
    expect(forte([5, 6, 7, 8, 9, 10, 11])).toBe("7-1"); // complement of 5-1
    expect(forte([1, 2, 3, 5, 6, 7, 9, 10, 11])).toBe("9-12"); // complement of 3-12
  });

  it("returns null outside cardinalities 3 to 9", () => {
    expect(forte([])).toBeNull();
    expect(forte([0])).toBeNull();
    expect(forte([0, 1])).toBeNull();
    expect(forte([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toBeNull();
  });
});

describe("forte: structural verification", () => {
  const cat = catalog();
  const labeled = [...cat.values()]
    .map((e) => forteName(e.key))
    .filter((label): label is string => label !== null);

  it("labels exactly the expected count per cardinality", () => {
    const counts: Record<number, number> = {};
    for (const entry of cat.values()) {
      if (forteName(entry.key) !== null) {
        counts[entry.cardinality] = (counts[entry.cardinality] ?? 0) + 1;
      }
    }
    expect(counts).toEqual({ 3: 12, 4: 29, 5: 38, 6: 50, 7: 38, 8: 29, 9: 12 });
  });

  it("assigns each label exactly once (208 total)", () => {
    expect(labeled.length).toBe(208);
    expect(new Set(labeled).size).toBe(labeled.length);
  });

  it("marks a label with z exactly when the set class is Z-related", () => {
    for (const entry of cat.values()) {
      const label = forteName(entry.key);
      if (label === null) continue;
      expect(label.includes("z")).toBe(entry.zPartnerKey !== null);
    }
  });

  it("pairs each set class with its complement under the same ordinal", () => {
    for (const entry of cat.values()) {
      if (entry.cardinality < 3 || entry.cardinality > 5) continue;
      const label = forteName(entry.key);
      if (label === null) continue;
      const ordinal = label.slice(label.indexOf("-") + 1);
      expect(forteName(entry.complementKey)).toBe(`${12 - entry.cardinality}-${ordinal}`);
    }
  });
});
