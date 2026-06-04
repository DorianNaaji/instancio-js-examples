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

console.log(Instancio.of<User>().generate());
console.log(Instancio.ofArray<User>(5).generateArray());
console.log(Instancio.ofArray<User>(5).withCustomGenerator(new RealisticUserGenerator()).generateArray());
