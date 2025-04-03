import { it } from 'vitest';
import { Instancio } from 'instancio-js'

export interface User {
  name: string,
  age: number,
}

it(`should generate`, () => {
  const user: User = Instancio.of<User>().generate();
  console.log(user);
})
