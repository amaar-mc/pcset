import { describe, expect, it } from "vitest";
import { fromChroma, fromNumber, normalize, toChroma, toNumber } from "../src/chroma";

describe("normalize", () => {
  it("reduces mod 12, de-duplicates, and sorts", () => {
    expect(normalize([12, 0, 16, 4, -5])).toEqual([0, 4, 7]);
  });

  it("returns an empty set unchanged", () => {
    expect(normalize([])).toEqual([]);
  });

  it("rejects non-integers", () => {
    expect(() => normalize([0, 1.5])).toThrow(TypeError);
  });
});

describe("chroma", () => {
  it("encodes the C major triad like tonal", () => {
    expect(toChroma([0, 4, 7])).toBe("100010010000");
  });

  it("round-trips through chroma", () => {
    expect(fromChroma(toChroma([0, 2, 4, 7, 9]))).toEqual([0, 2, 4, 7, 9]);
  });

  it("rejects malformed chroma", () => {
    expect(() => fromChroma("xyz")).toThrow(TypeError);
    expect(() => fromChroma("10101")).toThrow(TypeError);
  });
});

describe("set number", () => {
  it("matches the chroma read as binary", () => {
    expect(toNumber([0, 4, 7])).toBe(0b100010010000);
  });

  it("maps the empty set to 0 and the chromatic aggregate to 4095", () => {
    expect(toNumber([])).toBe(0);
    expect(toNumber([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toBe(4095);
  });

  it("round-trips through the set number", () => {
    expect(fromNumber(toNumber([0, 1, 4, 6]))).toEqual([0, 1, 4, 6]);
  });

  it("rejects out-of-range numbers", () => {
    expect(() => fromNumber(-1)).toThrow(RangeError);
    expect(() => fromNumber(4096)).toThrow(RangeError);
  });
});
