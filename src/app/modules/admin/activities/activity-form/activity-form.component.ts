import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from 'src/app/shared/common';

import { Activity } from './../../../../core/models/Activity.model';
import { ActivityService } from './../../../../core/services/activity.service';
import { AlertService } from './../../../../core/services/alert.service';
import { Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

export { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends FormComponent implements OnInit {

  constructor(alertService: AlertService, private activityService: ActivityService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    code: new FormControl(),
    dateStart: new FormControl(),
    timeStart: new FormControl(),
    dateEnd: new FormControl(),
    timeEnd: new FormControl(),
    active: new FormControl(true)
  });

  modelId: number;

  // Theme Timepicker
  timePickerTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#039be5',
    },
    dial: {
      dialBackgroundColor: '#039be5',
    },
    clockFace: {
      clockHandColor: '#039be5',
    }
  };

  ngOnInit() {
    if (this.modelId) {
      this.activityService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          FormHelper.setFormGroupValues(this.formGroup, res);
          // TODO: Create logic from capture time
        });
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const activity = new Activity();

    activity.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup, ['timeStart', 'timeEnd']));

    // Join start date with time
    const dateStart = this.formGroup.get('dateStart').value;
    const startTime = this.formGroup.get('timeStart').value;
    const splittedStartTime = startTime.split(':');
    dateStart.setHours(splittedStartTime[0], splittedStartTime[1]);
    activity.dateStart = dateStart;

    // Join end date with time
    const dateEnd = this.formGroup.get('dateEnd').value;
    const timeEnd = this.formGroup.get('timeEnd').value;
    const splittedEndTime = timeEnd.split(':');
    dateEnd.setHours(splittedEndTime[0], splittedEndTime[1]);
    activity.dateEnd = dateEnd;

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
