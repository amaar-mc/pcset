import { describe, expect, it } from "vitest";
import { commonName } from "../src/commonName";
import { forte } from "../src/forte";
import { primeForm } from "../src/normal";

describe("commonName: known set classes", () => {
  it("names the major/minor triad (3-11) for any representative", () => {
    // Major triad (C major)
    expect(commonName([0, 4, 7])).toBe("major/minor triad (3-11)");
    // Minor triad (D minor)
    expect(commonName([2, 6, 9])).toBe("major/minor triad (3-11)");
    // Prime form itself
    expect(commonName([0, 3, 7])).toBe("major/minor triad (3-11)");
  });

  it("verifies that 3-11 is the correct Forte number for both major and minor triads", () => {
    expect(forte([0, 4, 7])).toBe("3-11");
    expect(forte([2, 6, 9])).toBe("3-11");
    expect(forte([0, 3, 7])).toBe("3-11");
  });

  it("names the diminished triad (3-10)", () => {
    expect(commonName([0, 3, 6])).toBe("diminished triad (3-10)");
    expect(commonName([2, 5, 8])).toBe("diminished triad (3-10)");
    expect(forte([0, 3, 6])).toBe("3-10");
  });

  it("names the augmented triad (3-12)", () => {
    expect(commonName([0, 4, 8])).toBe("augmented triad (3-12)");
    expect(commonName([4, 8, 0])).toBe("augmented triad (3-12)");
    expect(forte([0, 4, 8])).toBe("3-12");
  });

  it("names dominant seventh / half-diminished seventh as one set class (4-27)", () => {
    // Dominant seventh (C7)
    const dom7 = commonName([0, 4, 7, 10]);
    // Half-diminished (leading-tone seventh / half-dim)
    const halfDim = commonName([0, 3, 6, 10]);
    expect(dom7).toBe("dominant seventh / half-diminished seventh (4-27)");
    expect(halfDim).toBe("dominant seventh / half-diminished seventh (4-27)");
    // They genuinely share a set class
    expect(primeForm([0, 4, 7, 10])).toEqual(primeForm([0, 3, 6, 10]));
    expect(forte([0, 4, 7, 10])).toBe("4-27");
    expect(forte([0, 3, 6, 10])).toBe("4-27");
  });

  it("names the minor seventh chord (4-26)", () => {
    expect(commonName([0, 3, 7, 10])).toBe("minor seventh chord (4-26)");
    expect(forte([0, 3, 7, 10])).toBe("4-26");
  });

  it("names the major seventh chord (4-20)", () => {
    expect(commonName([0, 4, 7, 11])).toBe("major seventh chord (4-20)");
    expect(forte([0, 4, 7, 11])).toBe("4-20");
  });

  it("names the diminished seventh chord (4-28)", () => {
    expect(commonName([0, 3, 6, 9])).toBe("diminished seventh chord (4-28)");
    expect(forte([0, 3, 6, 9])).toBe("4-28");
  });

  it("names the major/minor pentatonic (5-35)", () => {
    // Major pentatonic
    expect(commonName([0, 2, 4, 7, 9])).toBe("major/minor pentatonic (5-35)");
    // Minor pentatonic (inversionally related, same set class)
    expect(commonName([0, 3, 5, 7, 10])).toBe("major/minor pentatonic (5-35)");
    expect(forte([0, 2, 4, 7, 9])).toBe("5-35");
    expect(forte([0, 3, 5, 7, 10])).toBe("5-35");
  });

  it("names the whole-tone scale (6-35)", () => {
    expect(commonName([0, 2, 4, 6, 8, 10])).toBe("whole-tone scale (6-35)");
    expect(forte([0, 2, 4, 6, 8, 10])).toBe("6-35");
  });

  it("names the diatonic/major scale (7-35)", () => {
    // C major
    expect(commonName([0, 2, 4, 5, 7, 9, 11])).toBe("diatonic / major scale (7-35)");
    // A rotation (the input given in the spec)
    expect(commonName([0, 1, 3, 5, 6, 8, 10])).toBe("diatonic / major scale (7-35)");
    expect(forte([0, 2, 4, 5, 7, 9, 11])).toBe("7-35");
  });

  it("names the octatonic/diminished scale (8-28)", () => {
    expect(commonName([0, 1, 3, 4, 6, 7, 9, 10])).toBe("octatonic / diminished scale (8-28)");
    expect(forte([0, 1, 3, 4, 6, 7, 9, 10])).toBe("8-28");
  });
});

describe("commonName: returns null for unnamed set classes", () => {
  it("returns null for an obscure trichord", () => {
    expect(commonName([0, 1, 2])).toBeNull(); // 3-1, chromatic cluster
    expect(commonName([0, 1, 5])).toBeNull(); // 3-4
  });

  it("returns null for an obscure tetrachord", () => {
    expect(commonName([0, 1, 2, 3])).toBeNull(); // 4-1
  });

  it("returns null for sets outside any named set class", () => {
    expect(commonName([0, 1, 2, 3, 4, 5])).toBeNull(); // chromatic hexachord, 6-1
  });
});

describe("commonName: transposition and inversion invariance", () => {
  it("gives the same name under transposition", () => {
    const original = commonName([0, 4, 7]);
    // Transpose by 5 semitones: F major triad
    expect(commonName([5, 9, 0])).toBe(original);
    // Transpose by 9 semitones: A major triad
    expect(commonName([9, 1, 4])).toBe(original);
  });

  it("gives the same name under inversion for the whole-tone scale", () => {
    // The whole-tone scale is inversionally symmetric; any inversion is the same set class
    expect(commonName([0, 2, 4, 6, 8, 10])).toBe(commonName([1, 3, 5, 7, 9, 11]));
  });

  it("gives the same name for all transpositions of the diminished seventh", () => {
    expect(commonName([0, 3, 6, 9])).toBe(commonName([1, 4, 7, 10]));
    expect(commonName([0, 3, 6, 9])).toBe(commonName([2, 5, 8, 11]));
  });

  it("gives the same name for major scale transpositions", () => {
    // D major
    expect(commonName([2, 4, 6, 7, 9, 11, 1])).toBe("diatonic / major scale (7-35)");
    // G major
    expect(commonName([7, 9, 11, 0, 2, 4, 6])).toBe("diatonic / major scale (7-35)");
  });
});
