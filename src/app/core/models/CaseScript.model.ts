import { Case } from './Case.model';
import { Model } from './model';

export class CaseScript extends Model {
  id: number;
  position: number;
  case: Case;
}
