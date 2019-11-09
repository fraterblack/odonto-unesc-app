import { Model } from './model';
import { User } from './User.model';

export class Video extends Model {
  id: number;
  title: string;
  description?: string;
  archive: string;
  shared?: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  teacher: User;
}
