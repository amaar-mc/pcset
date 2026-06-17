/** A pitch class is an integer in 0..11 (C = 0). Inputs may be any integers; they are reduced mod 12. */
export type PitchClass = number;

/** A normalized pitch-class set: ascending, de-duplicated, each value in 0..11. */
export type PcSet = number[];

/** A 12-character binary string; index i is "1" when pitch class i is present (C = index 0). */
export type Chroma = string;

/** Interval-class vector: counts of interval classes 1 through 6. */
export type IntervalVector = readonly [number, number, number, number, number, number];

/** Full set-class description for a pitch-class set. */
export interface SetClassInfo {
  /** The input reduced to a normalized pitch-class set. */
  readonly pcs: PcSet;
  /** Most compact cyclic ordering of the set. */
  readonly normalOrder: PcSet;
  /** Canonical representative of the set class (Rahn algorithm), transposed to start on 0. */
  readonly primeForm: PcSet;
  /** Number of pitch classes in the set. */
  readonly cardinality: number;
  /** Interval-class content. */
  readonly intervalVector: IntervalVector;
  /** Prime form of the complementary set class. */
  readonly complementPrimeForm: PcSet;
  /** Prime form of the Z-related set class (same interval vector, different set class), or null. */
  readonly zPartner: PcSet | null;
  /** Count of transpositions Tn (n in 0..11) that map the set onto itself. */
  readonly transpositionalSymmetry: number;
  /** Count of inversions TnI (n in 0..11) that map the set onto itself. */
  readonly inversionalSymmetry: number;
}
