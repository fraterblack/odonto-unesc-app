import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from 'src/app/shared/common';

import { FormHelper } from '../../../../shared/form-helper';
import { User } from './../../../../core/models/User.model';
import { AlertService } from './../../../../core/services/alert.service';
import { AuthService } from './../../../../core/services/auth.service';
import { UserService } from './../../../../core/services/user.service';
import { Message } from './../../../../shared/common';
import {
  RelatedItem,
  RelatedItemAction,
  RelatedItemActionType
} from './../../../../shared/components/related-items-selector/related-item-selector';

const ELEMENT_DATA: RelatedItem[] = [
  { id: 1, position: 1, title: 'Hydrogen' },
  /*{ id: 2, position: 2, title: 'Helium' },
  { id: 3, position: 3, title: 'Lithium' },
  { id: 4, position: 4, title: 'Beryllium' },
  { id: 5, position: 5, title: 'Boron' },
  { id: 6, position: 6, title: 'Carbon' },
  { id: 7, position: 7, title: 'Nitrogen' },
  { id: 8, position: 8, title: 'Oxygen' },
  { id: 9, position: 9, title: 'Fluorine' },
  { id: 10, position: 10, title: 'Neon' },*/
];

@Component({
  selector: 'app-update-my-account',
  templateUrl: './update-my-account.component.html',
  styleUrls: ['./update-my-account.component.scss']
})
export class UpdateMyAccountComponent extends FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repeat_password: new FormControl()
  });

  private userId: number;

  // Stard here
  dataSource = ELEMENT_DATA;
  relatedData: Subject<RelatedItem[]> = new Subject<RelatedItem[]>();

  onAction(action: RelatedItemAction) {
    console.log(action);

    // When notified by the component that is done to populate
    if (action.type === RelatedItemActionType.LOADED) {
      this.relatedData.next(this.dataSource);
      this.relatedData.asObservable();

      return;
    }

    this.dataSource.push({ id: 2, position: 2, title: 'Helium' });

    this.relatedData.next(this.dataSource);
    this.relatedData.asObservable();
  }

  // Until here

  constructor(alertService: AlertService, private userService: UserService, authService: AuthService) {
    super(alertService);

    this.userId = authService.getUserId();
  }

  ngOnInit() {
    this.userService.get(this.userId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res, ['password', 'repeat_password']));
  }

  onSave() {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const user = new User();
    user.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup, ['repeat_password']));

    this.userService.put(this.userId, user)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          // Empty password fields
          this.formGroup.get('password').reset();
          this.formGroup.get('repeat_password').reset();

          this.emitSuccessMessage(Message.SUCCESSFUL_REGISTRY_EDITION);
        },
        error => this.emitErrorMessage(error)
      );
  }
}
