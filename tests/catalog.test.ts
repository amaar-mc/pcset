import { describe, expect, it } from "vitest";
import { catalog, catalogEntry } from "../src/catalog";

const known: Record<number, number> = {
  0: 1,
  1: 1,
  2: 6,
  3: 12,
  4: 29,
  5: 38,
  6: 50,
  7: 38,
  8: 29,
  9: 12,
  10: 6,
  11: 1,
  12: 1,
};

describe("catalog", () => {
  const c = catalog();

  it("contains every set class exactly once (224 total)", () => {
    expect(c.size).toBe(224);
  });

  it("has the known number of set classes per cardinality", () => {
    const counts: Record<number, number> = {};
    for (const entry of c.values())
      counts[entry.cardinality] = (counts[entry.cardinality] ?? 0) + 1;
    expect(counts).toEqual(known);
  });

  it("memoizes the same instance", () => {
    expect(catalog()).toBe(c);
  });

  it("pairs every set class with a complement whose complement is itself", () => {
    for (const entry of c.values()) {
      const comp = c.get(entry.complementKey);
      expect(comp).toBeDefined();
      expect(comp?.cardinality).toBe(12 - entry.cardinality);
      expect(comp?.complementKey).toBe(entry.key);
    }
  });

  it("makes Z-partners mutual, equal-cardinality, and interval-vector-matched", () => {
    for (const entry of c.values()) {
      if (entry.zPartnerKey === null) continue;
      const z = c.get(entry.zPartnerKey);
      expect(z).toBeDefined();
      expect(z?.zPartnerKey).toBe(entry.key);
      expect(z?.cardinality).toBe(entry.cardinality);
      expect(z?.intervalVector).toEqual(entry.intervalVector);
      expect(z?.key).not.toBe(entry.key);
    }
  });

  it("keeps every interval vector shared by at most two set classes", () => {
    const groups = new Map<string, number>();
    for (const entry of c.values()) {
      const g = `${entry.cardinality}:${entry.intervalVector.join("")}`;
      groups.set(g, (groups.get(g) ?? 0) + 1);
    }
    expect(Math.max(...groups.values())).toBe(2);
  });

  it("keeps interval-vector sums equal to the pair count", () => {
    for (const entry of c.values()) {
      const sum = entry.intervalVector.reduce((a, b) => a + b, 0);
      const pairs = entry.cardinality < 2 ? 0 : (entry.cardinality * (entry.cardinality - 1)) / 2;
      expect(sum).toBe(pairs);
    }
  });
});

describe("catalogEntry", () => {
  it("resolves a set to its set class", () => {
    const entry = catalogEntry([0, 4, 7]);
    expect(entry.primeForm).toEqual([0, 3, 7]);
    expect(entry.intervalVector).toEqual([0, 0, 1, 1, 1, 0]);
  });
});
