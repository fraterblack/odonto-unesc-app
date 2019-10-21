import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Helper class to easy unsubscribe subscriptions
 */
export abstract class Unsubscrable implements OnDestroy {
  protected ngUnsubscribe = new Subject();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
