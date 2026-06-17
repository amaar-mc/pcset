# Contributing to pcset

Thanks for your interest. This project values correctness, small surface area,
and clear tests.

## Development

```sh
npm install
npm run typecheck
npm run lint
npm test
npm run build
```

## Guidelines

- Keep the public API small and stable. New functions should be pure and typed.
- Every behavior change needs a test. Bug fixes start with a failing test.
- Theory claims must be backed by a test with a known reference value, or by a
  structural check against the set-class catalog.
- No runtime dependencies.
- Run `npm run format` before committing.
- Commit messages follow `type(scope): description`, for example
  `feat(catalog): add Forte set-class names`.

## Adding theory features

When adding a feature that produces a named result (such as Forte numbers),
prefer to verify it structurally: counts per cardinality, complement pairing,
and Z-relation consistency catch most transcription errors. Add those checks
alongside any embedded reference data.

## Reporting issues

Open an issue with a minimal reproduction: the input pitch classes, the expected
result with a source, and the actual result.
