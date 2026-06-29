/* eslint-disable */
// Angular ships ESM-only packages (no `require` condition in their `exports`). The instancio-js
// program transformer needs a real TypeScript Program, so `isolatedModules` must be false - and that
// turns on whole-program type-checking, where TypeScript cannot statically resolve sub-path imports
// such as `@angular/core/testing` under a CommonJS jest config (TS2307, or TS1479 with node16).
//
// Those are type-resolution diagnostics only: the transformer just needs *your* types, and the
// Angular modules are resolved at runtime by jest-preset-angular's moduleNameMapper. We suppress the
// diagnostics with `diagnostics.ignoreCodes` and keep the nx-generated module/moduleResolution.
// This is Node-version independent (no reliance on require(esm) / Node 22+).
const { createCjsPreset } = require('jest-preset-angular/presets');

const preset = createCjsPreset();

module.exports = {
  ...preset,
  displayName: '@org/ng-datagen',
  coverageDirectory: 'test-output/jest/coverage',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: `${__dirname}/tsconfig.spec.json`,
        stringifyContentPathRegex: '\\.(html|svg)$',
        isolatedModules: false,
        // 2307: cannot find module (node10) - 1479: ESM imported from CJS (node16/nodenext)
        // 151002: ts-jest "hybrid module kind" warning (node16/nodenext)
        diagnostics: { ignoreCodes: [2307, 1479, 151002] },
        astTransformers: {
          before: ['instancio-js/dist/jest-transformer'],
        },
      },
    ],
  },
};
