# instancio-js + nx + Angular 22 + Vitest

Full nx workspace matching the modern Angular test stack from the bug report:

- nx 23
- Angular 22
- Vitest 4 + Vite 8
- `@analogjs/vite-plugin-angular`

It is the Vitest counterpart of `instancio-js-nx-angular` (which runs on jest via ts-jest).

## The problem this solves

Under `@analogjs/vite-plugin-angular`, Angular compiles TypeScript with its own compiler, not `tsc`.
The `tsconfig` `plugins` transformer never runs, so `Instancio.of<User>().generate()` gets no schema
and returns a single primitive fallback value.

## The fix

`packages/ng-datagen/vite.config.ts` adds the instancio Vite plugin before `angular()`:

```typescript
import { instancio } from 'instancio-js/dist/vite';

export default defineConfig(() => ({
  plugins: [instancio({ tsconfig: `${__dirname}/tsconfig.spec.json` }), angular(), nxViteTsPaths()],
  test: { globals: true, environment: 'happy-dom' /* ... */ },
}));
```

The source you write never changes: `Instancio.of<User>().generate()` stays as is.

## Run it

```bash
npm install
npx nx test ng-datagen
```

## Note on the instancio-js dependency

The Vite plugin lands in instancio-js 2.3.0. Until it is published, this workspace installs a local
tarball (`file:../../instancio-js/instancio-js-2.3.0.tgz`); regenerate it with `npm pack` in the
library folder if needed. Once published, switch the dependency to `"instancio-js": "^2.3.0"`.

The tarball form matters: it installs like a real npm package, so instancio-js resolves the **same**
`typescript` instance as `@analogjs/vite-plugin-angular`. The Angular integration works by wrapping
that shared `ts.sys.readFile`.
