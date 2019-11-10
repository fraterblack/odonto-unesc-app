import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from 'src/app/shared/common';

import { FormHelper } from '../../../../shared/form-helper';
import { User } from './../../../../core/models/User.model';
import { AlertService } from './../../../../core/services/alert.service';
import { AuthService } from './../../../../core/services/auth.service';
import { UserService } from './../../../../core/services/user.service';
import { Message } from './../../../../shared/common';

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
