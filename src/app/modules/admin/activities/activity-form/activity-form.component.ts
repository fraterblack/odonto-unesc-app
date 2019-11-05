import { AuthenticationType } from './../../../../core/services/auth.service';
import { Activity } from './../../../../core/models/Activity.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Form } from 'src/app/shared/common';

import { AlertService } from './../../../../core/services/alert.service';
import { ActivityService } from './../../../../core/services/activity.service';
import { Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends Form implements OnInit {

  formGroup: FormGroup = new FormGroup({
    code: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    start_date: new FormControl(new Date()),
    expiration_date: new FormControl(new Date()),
    id_teacher: new FormControl(1),
    active: new FormControl(true)
  });

  userId: number;

  constructor(alertService: AlertService, private activityService: ActivityService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.userId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.userId) {
      this.activityService.get(this.userId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const activity = new Activity();
    activity.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

    let action$: Observable<any>;

    if (this.userId) {
      action$ = this.activityService.put(this.userId, activity);
    } else {
      action$ = this.activityService.post(activity);
    }

    action$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {

          this.emitSuccessMessage(
            this.userId
            ? Message.SUCCESSFUL_REGISTRY_EDITION
            : Message.SUCCESSFUL_REGISTRY_INSERTION);

          // When save & close
          if (close) {
            this.router.navigate([`/admin/activities`]);

          // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.userId) {
              this.router.navigate([`/admin/activities/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  onCancel() {
    this.router.navigate([`/admin/activities`]);
  }

}
