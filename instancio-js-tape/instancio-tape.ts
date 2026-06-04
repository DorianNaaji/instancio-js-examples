import test from 'tape';
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

test('showcase: generates a single object', t => {
  const user = Instancio.of<User>().generate();
  console.log(user);
  t.ok(typeof user.name === 'string' && typeof user.age === 'number' && typeof user.active === 'boolean');
  t.end();
});

test('showcase: generates a collection', t => {
  const users = Instancio.ofArray<User>(5).generateArray();
  console.log(users);
  t.equal(users.length, 5);
  t.end();
});

test('showcase: generates a collection with a custom generator', t => {
  const users = Instancio.ofArray<User>(5).withCustomGenerator(new RealisticUserGenerator()).generateArray();
  console.log(users);
  t.ok(users.every(u => RealisticUserGenerator.NAMES.includes(u.name)));
  t.end();
});
