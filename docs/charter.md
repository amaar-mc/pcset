# Charter

## Purpose

Provide a correct, small, dependency-free engine for post-tonal pitch-class set
theory that runs in the browser and in Node, so that interactive music theory
and pedagogy tools can be built on a trustworthy core.

## Scope

- Pitch-class set normalization and encoding.
- Normal order and prime form.
- Interval-class vector.
- Transposition, inversion, and complement.
- Set-class identity, Z-relations, and symmetry.
- The complete set-class catalog for the 12-tone universe.

## Non-goals

- A full musicology framework. This is not a competitor to `music21`.
- Score parsing, audio, notation rendering, or MIDI.
- Tonal harmony (keys, chords by name, voice leading). The `tonal` library
  covers that ground; `pcset` is interoperable with its encoding.

## Principles

- Correctness first. Every theory claim is tested against a known value or a
  structural invariant.
- Small, stable public API. Pure functions only.
- Zero runtime dependencies.
- Honest documentation. Algorithms and their conventions (such as Rahn versus
  Forte prime form) are stated explicitly.

## Audience

Music theory students and educators, composers working with atonal and serial
material, computational musicologists, and developers building web tools.
