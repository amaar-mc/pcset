# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Abstract subset and superset relations between set classes.

## [0.4.0]

### Added
- `commonName(pcs)`: returns a widely recognized common name for the set class of a
  pitch-class set, or null when none is assigned. Lookup is by prime form, so any
  transposition or inversion of a named set class returns the same name.
- Named set classes (with verified Forte numbers):
  - major/minor triad (3-11)
  - diminished triad (3-10)
  - augmented triad (3-12)
  - dominant seventh / half-diminished seventh (4-27)
  - minor seventh chord (4-26)
  - major seventh chord (4-20)
  - diminished seventh chord (4-28)
  - major/minor pentatonic (5-35)
  - whole-tone scale (6-35)
  - diatonic / major scale (7-35)
  - octatonic / diminished scale (8-28)

### Notes
- Dominant seventh and half-diminished seventh chords genuinely share set class 4-27
  (they are inversionally related). The name reflects both rather than asserting a
  single quality. Similarly, major and minor triads share 3-11, and major and minor
  pentatonic share 5-35.
- All prime-form keys are computed at runtime using the library's own `primeForm()`,
  so the name table is correct by construction and not reliant on hardcoded string keys.
- `npm publish` of 0.4.0 is pending the maintainer's npm 2FA OTP.

## [0.3.0]

### Added
- Forte numbers for the 50 hexachords (cardinality 6), with the z designation on Z-related classes (for example "6-z44"). `forte` and `forteName` now cover every set class of cardinalities 3 to 9.

### Notes
- Hexachord labels were taken from the music21 Forte table and cross-checked against this library's independently computed catalog. The structural tests confirm that the z marking matches the catalog's interval-vector Z-relation detection for every hexachord, that all 50 classes are covered, and that each of the 208 labels is unique.

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
