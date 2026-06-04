import { Instancio, DefaultPrimitiveGenerator, InstancioPrimitiveGenerator } from 'instancio-js';
import { PrimitiveTypeEnum } from 'instancio-js/dist/primitive-type.enum';

interface User {
  name: string;
  age: number;
  active: boolean;
}

class RealisticUserGenerator extends InstancioPrimitiveGenerator {
  static readonly NAMES = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
  constructor() {
    const generators = DefaultPrimitiveGenerator.getDefaultGenerators();
    generators.set(PrimitiveTypeEnum.String, () =>
      RealisticUserGenerator.NAMES[Math.floor(Math.random() * RealisticUserGenerator.NAMES.length)]
    );
    generators.set(PrimitiveTypeEnum.Number, () => Math.floor(Math.random() * 80) + 18);
    super(generators);
  }
}

describe('showcase-jest', () => {
  it('generates a single object', () => {
    const user = Instancio.of<User>().generate();
    console.log(user);
    expect(user).toMatchObject({ name: expect.any(String), age: expect.any(Number), active: expect.any(Boolean) });
  });

  it('generates a collection', () => {
    const users = Instancio.ofArray<User>(5).generateArray();
    console.log(users);
    expect(users).toHaveLength(5);
  });

  it('generates a collection with a custom generator', () => {
    const users = Instancio.ofArray<User>(5).withCustomGenerator(new RealisticUserGenerator()).generateArray();
    console.log(users);
    expect(users.every(u => RealisticUserGenerator.NAMES.includes(u.name))).toBe(true);
  });
});
