import { Model } from './model';
import { Script } from './Script.model';

export class ScriptActivity extends Model {
  id: number;
  position: number;
  script: Script;
}
