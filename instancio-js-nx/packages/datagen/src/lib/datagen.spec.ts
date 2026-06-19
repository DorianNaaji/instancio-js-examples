import { Instancio } from 'instancio-js';

// Original, zero-boilerplate instancio-js API: no schema, no `t`, no `Infer`.
// It works under nx + jest because jest.config.cts uses ts-jest + the instancio-js
// program transformer (registered via astTransformers), instead of the nx default @swc/jest.
interface RoomMate {
  name: string;
  age: number;
}

interface User {
  name: string;
  age: number;
  active: boolean;
  roomMate: RoomMate;
}

describe('instancio-js under nx + jest (ts-jest + astTransformers)', () => {
  it('generates a fully populated nested object with the bare of<T>() API', () => {
    const user = Instancio.of<User>().generate();
    // eslint-disable-next-line no-console
    console.log('GENERATED:', JSON.stringify(user));

    expect(user).toMatchObject({
      name: expect.any(String),
      age: expect.any(Number),
      active: expect.any(Boolean),
      roomMate: {
        name: expect.any(String),
        age: expect.any(Number),
      },
    });
  });

  it('generates arrays', () => {
    const users = Instancio.ofArray<User>(5).generateArray();
    expect(users).toHaveLength(5);
  });
});
