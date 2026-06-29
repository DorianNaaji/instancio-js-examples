// These two imports come from Angular's ESM-only packages whose `exports` map has no `require`
// condition. With `isolatedModules: false` (required by the instancio-js program transformer) and a
// CommonJS jest config, TypeScript cannot statically resolve them and reports TS2307 / TS1479.
// The fix is in jest.config.cts: `diagnostics.ignoreCodes` lets the program build anyway, and these
// modules are resolved at runtime by jest-preset-angular's moduleNameMapper.
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { Instancio, type Infer, t } from 'instancio-js';
import type { User } from './ng-datagen';

describe('instancio-js transformer + Angular ESM-only imports', () => {
  it('resolves the Angular ESM-only imports at runtime', () => {
    expect(typeof TestBed).toBe('function');
    expect(typeof HttpClient).toBe('function');
  });

  it('generates typed data through the zero-boilerplate transformer API', () => {
    const user = Instancio.of<User>().generate();

    expect(typeof user.name).toBe('string');
    expect(typeof user.age).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.active).toBe('boolean');
  });

  it('also works with the explicit schema builder', () => {
    const schema = t.object({ id: t.number, label: t.string });
    type Item = Infer<typeof schema>;

    const item: Item = Instancio.of<Item>(schema).generate();
    expect(typeof item.id).toBe('number');
    expect(typeof item.label).toBe('string');
  });
});
