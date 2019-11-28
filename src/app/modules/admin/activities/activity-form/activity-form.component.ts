import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from 'src/app/shared/common';
import {
  RelatedItem,
  RelatedItemAction,
  RelatedItemActionType,
} from 'src/app/shared/components/related-items-selector/related-item-selector';
import { SearchRelatedItemComponent } from 'src/app/shared/components/search-related-item/search-related-item.component';

import { Activity } from './../../../../core/models/Activity.model';
import { Script } from './../../../../core/models/Script.model';
import { ScriptActivity } from './../../../../core/models/ScriptActivity.model';
import { ActivityService } from './../../../../core/services/activity.service';
import { AlertService } from './../../../../core/services/alert.service';
import { ScriptService } from './../../../../core/services/script.service';
import { Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

export { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends FormComponent implements OnInit {

  constructor(
    alertService: AlertService,
    private scriptService: ScriptService,
    private activityService: ActivityService,
    private router: Router,
    private dialog: MatDialog,
    route: ActivatedRoute
  ) {
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
    scripts: new FormControl([]),
    active: new FormControl(true)
  });

  modelId: number;

  dataSource: RelatedItem[] = [];
  relatedData: Subject<RelatedItem[]> = new Subject<RelatedItem[]>();

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
      this.activityService.get(this.modelId, new HttpParams(), 'script')
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(res => {
          FormHelper.setFormGroupValues(this.formGroup, res, ['scripts']);
          // TODO: Create logic from capture time

          res.scripts
            .sort((a, b) => {
              if (a.position < b.position) {
                return -1;
              }
              if (a.position > b.position) {
                return 1;
              }

              return 0;
            })
            .forEach(x => {
              this.dataSource.push(x.script);
            });

          this.relatedData.next(this.dataSource);
          this.relatedData.asObservable();
        });
    }
  }

  onAction(action: RelatedItemAction) {
    switch (action.type) {
      // When notified by the component that is done to populate
      case RelatedItemActionType.LOADED:
        this.relatedData.next(this.dataSource);
        this.relatedData.asObservable();
        break;
      case RelatedItemActionType.NEW:
        return this.dialog.open(SearchRelatedItemComponent, {
          width: '700px',
          data: {
            title: 'Selecionar Roteiros',
            query: this.queryScripts.bind(this),
            columns: [
              {
                name: 'title',
                header: 'Título',
                binding: 'title'
              }
            ]
          }
        }).afterClosed()
          .subscribe((result) => {
            if (result) {
              // Iterate over each selected item to put in the list
              result.forEach(x => {
                const alreadyExists = this.dataSource.find(y => y.id === x.id);

                if (!alreadyExists) {
                  this.dataSource.push(x);
                }
              });

              this.relatedData.next(this.dataSource);
              this.relatedData.asObservable();
            }
          });
        break;
      case RelatedItemActionType.SORT_UP:
        const indexItemUp = this.dataSource.findIndex((item) => item.id === action.element.id);
        this.dataSource.splice((indexItemUp - 1), 0, this.dataSource.splice(indexItemUp, 1)[0]);
        break;
      case RelatedItemActionType.SORT_DOWN:
        const indexItemDown = this.dataSource.findIndex((item) => item.id === action.element.id);
        this.dataSource.splice((indexItemDown + 1), 0, this.dataSource.splice(indexItemDown, 1)[0]);
        break;
      case RelatedItemActionType.DELETE:
        this.dataSource.splice(this.dataSource.findIndex((item) => item.id === action.element.id), 1);
        break;
      case RelatedItemActionType.VIEW:
        // TODO
        // this.dataSource.push({ id: 5, position: 5, title: 'VIEW' });
        break;
    }

    // When notified by the component that is done to populate6
    this.relatedData.next(this.dataSource);
    this.relatedData.asObservable();
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

    this.dataSource.forEach((x, i) => {
      const obj = new ScriptActivity();
      const script = new Script();
      script.id = x.id;

      obj.position = i++;
      obj.script = script;

      activity.scripts.push(obj);
    });

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

  queryScripts(params: HttpParams) {
    return this.scriptService.query(params);
  }

  onCancel() {
    this.router.navigate([`/admin/activities`]);
  }

}
