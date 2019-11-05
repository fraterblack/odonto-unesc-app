import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/User.model';
import { Form } from 'src/app/shared/common';

import { AlertService } from './../../../../core/services/alert.service';
import { UserService } from './../../../../core/services/user.service';
import { Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends Form implements OnInit {

  formGroup: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    repeat_password: new FormControl(),
    manager: new FormControl(),
    active: new FormControl(true)
  });

  userId: number;

  constructor(alertService: AlertService, private userService: UserService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.userId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.userId) {
      this.userService.get(this.userId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res, ['password', 'repeat_password']));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const user = new User();
    user.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup, ['repeat_password']));

    let action$: Observable<any>;

    if (this.userId) {
      action$ = this.userService.put(this.userId, user);
    } else {
      action$ = this.userService.post(user);
    }

    action$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          // Empty password fields
          this.formGroup.get('password').reset();
          this.formGroup.get('repeat_password').reset();

          this.emitSuccessMessage(
            this.userId
            ? Message.SUCCESSFUL_REGISTRY_EDITION
            : Message.SUCCESSFUL_REGISTRY_INSERTION);

          // When save & close
          if (close) {
            this.router.navigate([`/admin/users`]);

          // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.userId) {
              this.router.navigate([`/admin/users/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  onCancel() {
    this.router.navigate([`/admin/users`]);
  }
}
