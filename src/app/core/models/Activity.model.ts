import { Model } from './model';
import { User } from './User.model';

export class Activity extends Model {
  id: number;
  code: number;
  name: string;
  description: string;
  start_date: Date;
  expiration_date: Date;
  active?: boolean;
  id_teacher: User;
}
