# pcset

<p align="center">
  <img src="assets/logo.png" alt="pcset logo" width="160">
</p>

[![npm](https://img.shields.io/npm/v/pcset)](https://www.npmjs.com/package/pcset)
[![CI](https://github.com/amaar-mc/pcset/actions/workflows/ci.yml/badge.svg)](https://github.com/amaar-mc/pcset/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Post-tonal pitch-class set theory for JavaScript and TypeScript: normal order, prime form, interval-class vector, Forte numbers, Z-relations, complement, symmetry, and the full set-class catalog. Typed, zero runtime dependencies, runs in the browser and in Node.

## Install

```sh
npm install pcset
```

## 30-second example

```ts
import { setClass, primeForm, forte, intervalVector, sameSetClass } from "pcset";

primeForm([0, 4, 7]);            // [0, 3, 7]  major triad
primeForm([0, 3, 7]);            // [0, 3, 7]  minor triad, same set class
intervalVector([0, 4, 7]);       // [0, 0, 1, 1, 1, 0]
forte([0, 4, 7]);                // "3-11"
sameSetClass([0, 4, 7], [0, 3, 7]); // true

setClass([0, 1, 4, 6]);
// {
//   pcs: [0, 1, 4, 6],
//   normalOrder: [0, 1, 4, 6],
//   primeForm: [0, 1, 4, 6],
//   forte: "4-z15",
//   cardinality: 4,
//   intervalVector: [1, 1, 1, 1, 1, 1],   // all-interval tetrachord
//   complementPrimeForm: [0, 1, 2, 3, 5, 6, 7, 8],
//   zPartner: [0, 1, 3, 7],               // the other all-interval tetrachord
//   transpositionalSymmetry: 1,
//   inversionalSymmetry: 0,
// }
```

Pitch classes are integers, C = 0. Inputs may be unsorted, duplicated, or outside 0..11; they are reduced modulo 12.

## Why this exists

Post-tonal analysis (prime form, interval-class vectors, Z-relations) is standard material in music theory, but the JavaScript ecosystem has no focused library for it. `@tonaljs/pcset`, the set module of the dominant JS music library, computes only set membership, subset, and superset; it does not compute normal order, prime form, interval vectors, inversion, complement, or Z-relations. `music21` is excellent but is a large Python framework, not usable in a browser. The Python `pcsets` package was last released in 2007.

`pcset` fills that gap with a small, correct, dependency-free engine that is easy to embed in interactive theory and pedagogy tools.

## Comparison

| Capability                      | pcset | @tonaljs/pcset | music21 |
|---------------------------------|:-----:|:--------------:|:-------:|
| Normal order                    |  yes  |       no       |   yes   |
| Prime form                      |  yes  |       no       |   yes   |
| Interval-class vector           |  yes  |       no       |   yes   |
| Transposition and inversion     |  yes  |    partial     |   yes   |
| Complement                      |  yes  |       no       |   yes   |
| Z-relation detection            |  yes  |       no       |   yes   |
| Symmetry degrees                |  yes  |       no       |   yes   |
| Full set-class catalog          |  yes  |       no       |   yes   |
| Forte set-class numbers         | 3 to 5, 7 to 9 | no    |   yes   |
| Zero runtime dependencies       |  yes  |      yes        |   no    |
| Runs in the browser             |  yes  |      yes        |   no    |
| Language                        |  TS   |     JS/TS       | Python  |

The chroma string and set number use the same encoding as tonal, so the two libraries interoperate.

## API

All functions are pure. Inputs are read-only number arrays; outputs are normalized pitch-class sets (sorted, unique, 0..11).

### Core

- `normalize(pcs)` reduces raw integers to a normalized set.
- `normalOrder(pcs)` returns the most compact cyclic ordering.
- `primeForm(pcs)` returns the canonical set-class representative (Rahn algorithm), starting on 0.
- `intervalVector(pcs)` returns the interval-class vector `[ic1..ic6]`.
- `forte(pcs)` returns the Forte set-class number (for example "3-11" or "4-z15"), or null.
- `setClass(pcs)` returns the full `SetClassInfo` (normal order, prime form, interval vector, complement, Z-partner, symmetry).

### Transform

- `transpose(pcs, n)` transposes by n semitones (Tn).
- `invert(pcs)` inverts about pitch class 0 (T0I).
- `invertAround(pcs, axis)` inverts about an axis (TnI).
- `complement(pcs)` returns the pitch classes not in the set.

### Relations

- `equals(a, b)`, `isSubsetOf(a, b)`, `isSupersetOf(a, b)`
- `isTranspositionOf(a, b)`, `isInversionOf(a, b)`, `sameSetClass(a, b)`
- `isZRelatedTo(a, b)`

### Symmetry

- `transpositionalSymmetry(pcs)`, `inversionalSymmetry(pcs)`

### Encoding and catalog

- `toChroma(pcs)`, `fromChroma(chroma)`, `toNumber(pcs)`, `fromNumber(num)`
- `catalog()` returns the complete set-class catalog (224 classes) as a `Map` keyed by prime form.
- `catalogEntry(pcs)` looks up the catalog entry for a set.

## A note on prime form

Prime form here follows the Rahn algorithm (the convention used by Straus): take the more left-packed of the set's normal order and its inversion's normal order, each transposed to 0. For the small number of set classes where Forte and Rahn disagree (for example 5-20, 6-31, 7-20), this returns the Rahn form.

## A note on Forte numbers

Forte numbers are provided for cardinalities 3 to 5 and 7 to 9. Hexachords
(cardinality 6) return null for now, pending a verified complete catalog; every
other set-class property (prime form, interval vector, Z-relation, complement,
symmetry) is still available for hexachords. Because a set class and its
complement share a Forte ordinal, the labels for cardinalities 7 to 9 are derived
from those for 3 to 5.

## Roadmap

- Forte numbers for hexachords (cardinality 6), pending a verified complete source.
- Common set-class names (major scale, octatonic, and so on).
- Abstract subset and superset relations between set classes.
- Generalization to mod-n universes for microtonal work.

## Examples

```sh
npm run example
```

## Testing

```sh
npm test
```

The suite covers known prime forms and interval vectors, structural checks against the full set-class catalog (counts per cardinality, complement and Z-relation consistency), and property-based invariants (transposition and inversion preserve set class and interval vector, prime form is idempotent, encodings round-trip).

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT. See [LICENSE](./LICENSE).
