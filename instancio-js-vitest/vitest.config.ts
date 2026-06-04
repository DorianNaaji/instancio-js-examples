import { defineConfig } from 'vitest/config';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    typecheck: {
      tsconfig: 'tsconfig.json',
    },
  },
  // Execute vitest with ttypescript to ensure transformers are working for reflection lib (reflect-metadata)
  plugins: [
    typescript(),
  ],
});
