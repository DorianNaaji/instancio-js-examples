import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { instancio } from 'instancio-js/dist/vite';

// `@analogjs/vite-plugin-angular` compiles TypeScript with the Angular compiler, not `tsc`, so the
// `tsconfig` `plugins` transformer never runs. The instancio() plugin injects the schema before the
// Angular compiler does its work (it declares enforce: 'pre'), which is why it is listed first.
export default defineConfig({
  plugins: [instancio({ tsconfig: './tsconfig.spec.json' }), angular()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
