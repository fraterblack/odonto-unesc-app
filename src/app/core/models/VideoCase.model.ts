import { Model } from './model';
import { Video } from './Video.model';

export class VideoCase extends Model {
  id: number;
  position: number;
  video: Video;
}
