import { describe, expect, it } from "vitest";
import { complement, invert, invertAround, transpose } from "../src/transform";

describe("transpose", () => {
  it("shifts and wraps", () => {
    expect(transpose([0, 4, 7], 5)).toEqual([0, 5, 9]);
    expect(transpose([0, 4, 7], 12)).toEqual([0, 4, 7]);
  });

  it("rejects non-integer amounts", () => {
    expect(() => transpose([0], 1.5)).toThrow(TypeError);
  });
});

describe("invert", () => {
  it("inverts about 0", () => {
    expect(invert([0, 4, 7])).toEqual([0, 5, 8]);
  });

  it("inverts about an axis", () => {
    expect(invertAround([0, 4, 7], 7)).toEqual([0, 3, 7]);
  });
});

describe("complement", () => {
  it("returns the missing pitch classes", () => {
    expect(complement([0, 2, 4, 6, 8, 10])).toEqual([1, 3, 5, 7, 9, 11]);
  });

  it("maps the empty set to the aggregate and back", () => {
    expect(complement([])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(complement([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toEqual([]);
  });
});
