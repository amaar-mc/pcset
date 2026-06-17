# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Forte set-class names (for example `3-11`, `6-z44`).
- Common set-class names.
- Abstract subset and superset relations between set classes.

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
