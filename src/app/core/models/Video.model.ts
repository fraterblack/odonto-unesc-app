import { Model } from './model';

export class Video extends Model {
  id: number;
  title: string;
  description: string;
  archive: string;
  teacher: number;
  shared?: boolean;
  active?: boolean;
}
