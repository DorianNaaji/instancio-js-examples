import assert from 'assert';
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

describe('showcase-mocha', () => {
  it('generates a single object', () => {
    const user = Instancio.of<User>().generate();
    console.log(user);
    assert.ok(typeof user.name === 'string' && typeof user.age === 'number' && typeof user.active === 'boolean');
  });

  it('generates a collection', () => {
    const users = Instancio.ofArray<User>(5).generateArray();
    console.log(users);
    assert.strictEqual(users.length, 5);
  });

  it('generates a collection with a custom generator', () => {
    const users = Instancio.ofArray<User>(5).withCustomGenerator(new RealisticUserGenerator()).generateArray();
    console.log(users);
    assert.ok(users.every(u => RealisticUserGenerator.NAMES.includes(u.name)));
  });
});
