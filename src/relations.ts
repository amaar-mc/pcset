import { normalize, toNumber } from "./chroma";
import { primeForm } from "./normal";
import { invertAround, transpose } from "./transform";
import { intervalVector } from "./vector";

const MOD = 12;
const keyOf = (pcs: readonly number[]): string => primeForm(pcs).join(",");

/** True when two sets contain exactly the same pitch classes. */
export function equals(a: readonly number[], b: readonly number[]): boolean {
  return toNumber(a) === toNumber(b);
}

/** True when every pitch class of `subset` is present in `superset`. */
export function isSubsetOf(subset: readonly number[], superset: readonly number[]): boolean {
  const sup = new Set(normalize(superset));
  return normalize(subset).every((p) => sup.has(p));
}

/** True when `superset` contains every pitch class of `subset`. */
export function isSupersetOf(superset: readonly number[], subset: readonly number[]): boolean {
  return isSubsetOf(subset, superset);
}

/** True when some transposition Tn maps `a` onto `b`. */
export function isTranspositionOf(a: readonly number[], b: readonly number[]): boolean {
  const target = toNumber(b);
  for (let n = 0; n < MOD; n++) if (toNumber(transpose(a, n)) === target) return true;
  return false;
}

/** True when some inversion TnI maps `a` onto `b`. */
export function isInversionOf(a: readonly number[], b: readonly number[]): boolean {
  const target = toNumber(b);
  for (let axis = 0; axis < MOD; axis++)
    if (toNumber(invertAround(a, axis)) === target) return true;
  return false;
}

/** True when two sets belong to the same set class (related by transposition or inversion). */
export function sameSetClass(a: readonly number[], b: readonly number[]): boolean {
  return keyOf(a) === keyOf(b);
}

/**
 * True when two sets are Z-related: same interval-class vector but different set classes.
 * Z-related sets sound related in interval content yet cannot be mapped onto one another
 * by transposition or inversion.
 */
export function isZRelatedTo(a: readonly number[], b: readonly number[]): boolean {
  const na = normalize(a);
  const nb = normalize(b);
  if (na.length !== nb.length) return false;
  if (sameSetClass(na, nb)) return false;
  return intervalVector(na).join(",") === intervalVector(nb).join(",");
}
