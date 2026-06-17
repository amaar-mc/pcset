# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Forte numbers for hexachords (cardinality 6).
- Common set-class names.
- Abstract subset and superset relations between set classes.

## [0.2.0]

### Added
- `forte(pcs)` and `forteName(key)`: Forte set-class numbers for cardinalities 3 to 5 and 7 to 9 (for example "3-11", "4-z15"). Labels for 7 to 9 are derived from their complements. Hexachords are not yet labeled.
- `forte` field on `SetClassInfo`.

### Notes
- Forte labels are verified structurally: counts per cardinality, complement pairing, and a cross-check that the z designation matches the library's own Z-relation detection across all 158 labeled set classes.

## [0.1.0]

### Added
- Normalization and encoding: `normalize`, `toChroma`, `fromChroma`, `toNumber`, `fromNumber` (tonal-compatible).
- `normalOrder` and `primeForm` (Rahn algorithm).
- `intervalVector` (interval-class vector).
- `transpose`, `invert`, `invertAround`, `complement`.
- Relations: `equals`, `isSubsetOf`, `isSupersetOf`, `isTranspositionOf`, `isInversionOf`, `sameSetClass`, `isZRelatedTo`.
- `transpositionalSymmetry` and `inversionalSymmetry`.
- `setClass` aggregator returning `SetClassInfo`.
- `catalog` and `catalogEntry` exposing the complete 224-class set-class catalog with Z-relation and complement links.
- Full test suite: known-value tests, catalog structural checks, and property-based invariants.
