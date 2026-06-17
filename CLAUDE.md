# pcset

TypeScript library for post-tonal pitch-class set theory. Zero runtime dependencies.

## Commands

- Install: `npm install`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint` (Biome); fix with `npm run format`
- Test: `npm test` (Vitest)
- Build: `npm run build` (tsup, dual ESM and CJS plus type declarations)
- Example: `npm run example`

## Architecture

Small pure modules under `src/`, each one concern:
- `chroma.ts` normalization and encoding (array, chroma string, set number)
- `transform.ts` transpose, invert, invertAround, complement
- `normal.ts` normal order and prime form (Rahn)
- `vector.ts` interval-class vector
- `symmetry.ts` transpositional and inversional symmetry degrees
- `catalog.ts` generates and memoizes the full 224-class set-class catalog; detects Z-relations by shared interval vector
- `setclass.ts` aggregates everything into `SetClassInfo`
- `relations.ts` equality, subset, transposition, inversion, set class, Z-relation
- `index.ts` public surface

See `docs/architecture.md` for the algorithms.

## Conventions

- All functions pure and strictly typed. Inputs are `readonly number[]`, outputs are normalized `PcSet`.
- No default parameter values; expose a second named function instead (for example `invert` and `invertAround`).
- No runtime dependencies. Keep the public API small.
- Pitch classes are integers, C = 0; inputs are reduced mod 12.

## Testing rules

- Known-value tests for published prime forms and interval vectors.
- Structural catalog checks (counts per cardinality, complement and Z consistency) for any catalog change.
- Property tests for invariants. Bug fixes start with a failing test.

## Release

- Semantic versioning. Update `CHANGELOG.md` under the new version.
- Gates before publish: `npm run typecheck && npm run lint && npm test && npm run build && npm pack --dry-run`.
- Tag `vX.Y.Z`, then `npm publish` (requires npm auth) and a GitHub release.

## Style

- No em dash characters in docs, comments, or commit messages.
- Comments explain non-obvious reasoning only.
