import { Model } from './model';
import { User } from './User.model';

export class Script extends Model {
  id: number;
  title: string;
  description?: string;
  shared?: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  teacher: User;
}
