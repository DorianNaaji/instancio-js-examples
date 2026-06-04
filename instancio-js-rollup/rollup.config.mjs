import typescript from '@rollup/plugin-typescript';

export default {
  input: 'instancio-rollup.ts',
  external: (id) => id.includes('node_modules') || id === 'reflect-metadata',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [typescript()],
};
