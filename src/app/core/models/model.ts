import { Deserializable } from './deserializable.model';

export abstract class Model implements Deserializable {
  id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
