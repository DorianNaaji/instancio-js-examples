import { Instancio } from 'instancio-js';

export interface User {
  name: string,
  age: number,
}


const user: User = Instancio.of<User>().generate();
console.log(user);