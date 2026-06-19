# instancio-js in an nx monorepo (jest)

Showcases how to use `instancio-js` inside an **nx** workspace whose tests run with **jest**.

## The problem

`instancio-js` relies on a TypeScript *program* transformer: it needs the real TypeScript type
checker, at compile time, to turn `Instancio.of<T>()` into a populated object. nx generates jest
projects with **`@swc/jest`**, which strips types and never builds a TypeScript `Program`, so the
transformer cannot run. The result is that `Instancio.of<T>()` returns a default value instead of an
object - and no `tsconfig` `plugins` entry or `ts-patch install` can fix it, because swc never looks
at types.

## The fix (no boilerplate in your tests)

Switch the jest project to **ts-jest** and register the transformer through ts-jest's
`astTransformers`. No `ts-patch`, no `tsconfig` `plugins`, and your test code stays unchanged:

```typescript
const user: User = Instancio.of<User>().generate();
```

Two files make it work:

- [`packages/datagen/jest.config.cts`](packages/datagen/jest.config.cts) - replaces the default
  `@swc/jest` transform with `ts-jest` + `astTransformers.before: ['instancio-js/dist/jest-transformer']`.
- [`packages/datagen/tsconfig.jest.json`](packages/datagen/tsconfig.jest.json) - a CommonJS tsconfig
  with `isolatedModules: false`, so jest can run the output and ts-jest builds a real `Program`.

See [`packages/datagen/src/lib/datagen.spec.ts`](packages/datagen/src/lib/datagen.spec.ts) for the
test using the plain, boilerplate-free API.

### Gotchas worth knowing

- ts-jest 29.4 reads `isolatedModules` from the tsconfig; the nx base tsconfig sets it to `true`,
  which forces transpile-only mode (no `Program`). The dedicated `tsconfig.jest.json` overrides it.
- nx libraries are `"type": "module"`; jest runs CommonJS. The dedicated tsconfig emits CommonJS.
- Point ts-jest at a tsconfig **path** (a string), not an inline object, otherwise the `@nx/jest`
  graph plugin fails to analyze the config.

## Run it

```bash
npm install
npx nx test @org/datagen
```

## Alternative: explicit schema (if you must stay on swc/esbuild)

If you cannot use ts-jest, `instancio-js` also ships a runtime escape hatch (the `t` schema builder)
that needs no transformer at all. See the main project README.
