import { Deserializable } from './deserializable.model';

export class User implements Deserializable {
  id: number;
  name: string;
  email: string;
  manager: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
