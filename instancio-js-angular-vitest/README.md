# instancio-js + Angular + Vitest (minimal)

Minimal reproduction of the modern Angular test stack, wired with the official instancio-js Vite
plugin:

- Angular 22
- Vitest 4 + Vite 8
- `@analogjs/vite-plugin-angular`

## The problem this solves

`@analogjs/vite-plugin-angular` compiles TypeScript with the Angular compiler, not `tsc`. The
`tsconfig` `plugins` transformer (`instancio-js/dist/transformer`) is a `tsc`/`ts-patch`-only
mechanism, so it never runs here. Without a fix, `Instancio.of<User>().generate()` receives no schema
and returns a single primitive fallback value (`No schema provided: falling back to default
generation`).

## The fix

Add the instancio Vite plugin **before** `angular()` in `vitest.config.ts`:

```typescript
import { instancio } from 'instancio-js/dist/vite';

export default defineConfig({
  plugins: [instancio({ tsconfig: './tsconfig.spec.json' }), angular()],
  test: { globals: true, environment: 'happy-dom' },
});
```

The source you write never changes: `Instancio.of<User>().generate()` stays exactly as is. The plugin
resolves `User` against a real TypeScript program and injects the schema before Angular compiles the
file.

## Run it

```bash
npm install
npm test
```

## Note on the instancio-js dependency

The Vite plugin lands in instancio-js 2.3.0. Until it is published, this example installs a local
tarball (`file:../../instancio-js/instancio-js-2.3.0.tgz`). Regenerate it with `npm pack` in the
library folder if needed. Once published, switch the dependency to `"instancio-js": "^2.3.0"`.

The tarball form matters here: it installs like a real npm package, so instancio-js resolves the
**same** `typescript` instance as `@analogjs/vite-plugin-angular`. The Angular integration works by
wrapping that shared `ts.sys.readFile`, so a `file:` symlink to the library source (which would pull
in the library's own bundled `typescript`) does **not** work.
