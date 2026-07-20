import { describe, expect, it } from 'vitest';
import { Instancio } from 'instancio-js';
import type { User } from './user';

// Without the instancio() Vite plugin this exact test fails: the Angular compiler ignores the
// tsconfig transformer, so `Instancio.of<User>()` gets no schema and generate() returns a single
// primitive fallback string instead of a populated object.
describe('instancio-js + Angular (Vitest, @analogjs/vite-plugin-angular)', () => {
  it('generates a populated User through the zero-boilerplate transformer API', () => {
    const user = Instancio.of<User>().generate();

    expect(typeof user.name).toBe('string');
    expect(typeof user.age).toBe('number');
    expect(typeof user.email).toBe('string');
    expect(typeof user.active).toBe('boolean');
  });
});
