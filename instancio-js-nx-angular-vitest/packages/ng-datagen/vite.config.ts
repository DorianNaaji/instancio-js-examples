/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { instancio } from 'instancio-js/dist/vite';

// instancio() runs before the Angular compiler (it declares enforce: 'pre') so the schema is present
// when @analogjs/vite-plugin-angular builds the Angular program.
export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ng-datagen',
  plugins: [instancio({ tsconfig: `${__dirname}/tsconfig.spec.json` }), angular()],
  test: {
    watch: false,
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    passWithNoTests: true,
  },
});
