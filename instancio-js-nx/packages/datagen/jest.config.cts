/* eslint-disable */
// instancio-js needs its TypeScript program transformer to run, which requires a real
// TypeScript Program (the type checker). nx generates jest projects with @swc/jest, which
// strips types and never builds a Program, so the transformer cannot run there.
//
// We therefore switch this project to ts-jest and register the transformer through
// astTransformers. No ts-patch, no tsconfig `plugins`, and the test code stays boilerplate-free:
// `Instancio.of<T>().generate()` works as-is.
module.exports = {
  displayName: '@org/datagen',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        // Dedicated CommonJS tsconfig: jest runs CommonJS while the project package is
        // "type":"module". It sets `isolatedModules: false` so ts-jest builds a real Program
        // (ts-jest 29.4 reads that flag from tsconfig; the nx base sets it to true).
        // A string path (not an inline object) also keeps the @nx/jest graph plugin happy.
        tsconfig: `${__dirname}/tsconfig.jest.json`,
        astTransformers: {
          before: ['instancio-js/dist/jest-transformer'],
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
};
