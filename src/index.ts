export { type CatalogEntry, catalog, catalogEntry } from "./catalog";
export { fromChroma, fromNumber, normalize, toChroma, toNumber } from "./chroma";
export { normalOrder, primeForm } from "./normal";
export {
  equals,
  isInversionOf,
  isSubsetOf,
  isSupersetOf,
  isTranspositionOf,
  isZRelatedTo,
  sameSetClass,
} from "./relations";
export { setClass } from "./setclass";
export { inversionalSymmetry, transpositionalSymmetry } from "./symmetry";
export { complement, invert, invertAround, transpose } from "./transform";
export type { Chroma, IntervalVector, PcSet, PitchClass, SetClassInfo } from "./types";
export { intervalVector } from "./vector";
