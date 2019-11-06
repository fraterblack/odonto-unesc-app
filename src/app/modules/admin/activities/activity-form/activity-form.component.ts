import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Form } from 'src/app/shared/common';

import { Activity } from './../../../../core/models/Activity.model';
import { ActivityService } from './../../../../core/services/activity.service';
import { AlertService } from './../../../../core/services/alert.service';
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
    start_date: new FormControl(),
    start_time: new FormControl(),
    expiration_date: new FormControl(),
    expiration_time: new FormControl(),
    active: new FormControl(true)
  });

  modelId: number;

  constructor(alertService: AlertService, private activityService: ActivityService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.modelId) {
      this.activityService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res, ['start_time', 'expiration_time']));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const activity = new Activity();

    activity.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup, ['start_time', 'expiration_time']));

    const startTimeFull = !this.formGroup.get('start_time').value ? this.defaultStartTime : this.formGroup.get('start_time').value;
    const splitted = startTimeFull.split(':');
    const hour = splitted[0];
    const minute = splitted[1];

    const startDate = this.formGroup.get('start_date').value;
    startDate.setHours(hour, minute);

    activity.start_date = startDate;

    console.log(this.formGroup.controls);

    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.activityService.put(this.modelId, activity);
    } else {
      action$ = this.activityService.post(activity);
    }

    action$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {

          this.emitSuccessMessage(
            this.modelId
            ? Message.SUCCESSFUL_REGISTRY_EDITION
            : Message.SUCCESSFUL_REGISTRY_INSERTION);

          // When save & close
          if (close) {
            this.router.navigate([`/admin/activities`]);

          // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.modelId) {
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
