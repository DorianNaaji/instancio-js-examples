import { describe, expect, it } from 'vitest';
import { Instancio, type Infer, t } from 'instancio-js';
import type { User } from './ng-datagen';

// The nx counterpart that runs on jest (instancio-js-nx-angular) uses ts-jest astTransformers.
// Here the same zero-boilerplate API is powered by the instancio() Vite plugin instead, because the
// Angular compiler behind @analogjs/vite-plugin-angular never runs the tsconfig `plugins` transformer.
describe('instancio-js + nx + Angular 22 + Vitest', () => {
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
