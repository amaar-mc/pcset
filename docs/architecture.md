# Architecture

`pcset` is a set of small pure modules. Data flows in one direction: encoding and
transforms are the base, normal order and prime form build on them, and the
catalog and aggregator build on those.

## Representation

A pitch-class set is a `number[]` of integers in 0..11, sorted and de-duplicated
(`normalize`). Two interchangeable encodings are provided:

- Chroma: a 12-character binary string where index i is "1" when pitch class i is
  present (C = index 0). This matches tonal's encoding.
- Set number: the chroma read as a binary integer, 0..4095. Also tonal-compatible.

## Normal order

`normalOrder` considers every cyclic rotation of the sorted set. For each rotation
it measures the ascending intervals from the first pitch to each subsequent pitch.
It selects the rotation that is most compact, comparing the outer interval (first
to last) first and working inward, and breaks a full tie by choosing the lowest
starting pitch class. This is the standard rule described by Straus and Rahn.

## Prime form

`primeForm` uses the Rahn algorithm. It transposes the set's normal order to begin
on 0, does the same for the normal order of the set's inversion, and returns the
more left-packed of the two (lexicographic comparison). For the small number of
set classes where Forte and Rahn disagree (for example 5-20, 6-31, 7-20), the Rahn
form is returned. The choice is documented so results are reproducible.

## Interval-class vector

`intervalVector` counts, for every unordered pair of pitch classes, the interval
class `min(d, 12 - d)` where d is the pitch-class difference. The six counts form
the vector. Its sum equals the number of pairs, which the tests assert.

## Catalog generation

`catalog` enumerates all 4096 pitch-class sets, reduces each to its prime form, and
collects the distinct set classes. There are 224 of them. For each it records
cardinality, interval vector, complement, and symmetry degrees.

Z-relations are found structurally: two distinct set classes of the same
cardinality that share an interval vector are Z-related. Because the relation is
pairwise in the 12-tone universe, every shared interval vector belongs to exactly
two set classes, which the tests assert. This avoids hand-transcribing the
Z-relation table.

The catalog is computed once on first use and memoized.

## Symmetry

`transpositionalSymmetry` counts the transpositions Tn that map a set onto itself;
`inversionalSymmetry` counts the inversions TnI that do. Both compare set numbers
for an exact match.

## Why no embedded tables

Prime forms, interval vectors, complements, Z-relations, and symmetry are all
derived from the algorithms rather than transcribed from a printed catalog. The
structural tests (counts per cardinality, complement involution, Z-relation
symmetry) would fail if any derivation were wrong, so the catalog is self-checking.
Forte set-class names, which are a naming convention rather than a derivable
property, are the one piece of reference data in the library (see `forte.ts`).
Common set-class names (`commonName.ts`) follow the same approach: a small table
of representative pitch-class sets is run through `primeForm()` at initialization
time to produce the lookup keys, so the keys are correct by construction rather
than being hardcoded strings. Only names that are genuinely standard in tonal
pedagogy and post-tonal theory are included.
