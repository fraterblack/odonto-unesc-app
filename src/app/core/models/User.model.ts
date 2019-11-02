import { Model } from './model';

export class User extends Model {
  id: number;
  code: number;
  name: string;
  email: string;
  manager: boolean;
  password?: string;
  active?: boolean;
}
