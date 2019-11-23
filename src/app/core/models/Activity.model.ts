import { Model } from './model';
import { User } from './User.model';

export class Activity extends Model {
  id: number;
  title: string;
  description?: string;
  code: number;
  dateStart: Date;
  dateEnd: Date;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  teacher: User;
}
