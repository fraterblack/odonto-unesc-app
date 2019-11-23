import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Case } from 'src/app/core/models/Case.model';

import { AlertService } from './../../../../core/services/alert.service';
import { CaseService } from './../../../../core/services/case.service';
import { FormComponent, Message } from './../../../../shared/common';
import {
  RelatedItem,
  RelatedItemAction,
  RelatedItemActionType,
} from './../../../../shared/components/related-items-selector/related-item-selector';
import { FormHelper } from './../../../../shared/form-helper';

const ELEMENT_DATA: RelatedItem[] = [

];

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent extends FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    shared: new FormControl(false),
    active: new FormControl(true)
  });

  modelId: number;

  dataSource = ELEMENT_DATA;
  relatedData: Subject<RelatedItem[]> = new Subject<RelatedItem[]>();
  private temp: any;

  constructor(alertService: AlertService, private caseService: CaseService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  onAction(action: RelatedItemAction) {
    console.log(action);
    console.log(this.dataSource);

    switch (action.type) {
      // When notified by the component that is done to populate
      case RelatedItemActionType.LOADED:
        this.dataSource.push({ id: 1, position: 1, title: 'LOADED' });
        break;
      case RelatedItemActionType.NEW:
        this.dataSource.push({ id: 2, position: 2, title: 'NEW' });
        break;
      case RelatedItemActionType.SORT_UP:
        const indexItemUp = this.dataSource.indexOf(this.getItemSelected(action.element.id));
        this.temp = this.dataSource[indexItemUp - 1];
        this.dataSource[indexItemUp - 1] = this.dataSource[indexItemUp];
        this.dataSource[indexItemUp] = this.temp;
        break;
      case RelatedItemActionType.SORT_DOWN:
        const indexItemDown = this.dataSource.indexOf(this.getItemSelected(action.element.id));
        this.temp = this.dataSource[indexItemDown + 1];
        this.dataSource[indexItemDown + 1] = this.dataSource[indexItemDown];
        this.dataSource[indexItemDown] = this.temp;
        break;
      case RelatedItemActionType.DELETE:
        this.dataSource.splice(this.dataSource.indexOf(this.getItemSelected(action.element.id)), 1);
        break;
      case RelatedItemActionType.VIEW:
        this.dataSource.push({ id: 5, position: 5, title: 'VIEW' });
        break;
    }

    // When notified by the component that is done to populate6
    this.relatedData.next(this.dataSource);
    this.relatedData.asObservable();
  }

  ngOnInit() {
    if (this.modelId) {
      this.caseService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const casee = new Case();
    casee.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));
    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.caseService.put(this.modelId, casee);
    } else {
      action$ = this.caseService.post(casee);
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
            this.router.navigate([`/admin/cases`]);

          // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.modelId) {
              this.router.navigate([`/admin/cases/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  private getItemSelected(idElement: number) {
    return this.dataSource.find((item) => item.id === idElement);
  }

  onCancel() {
    this.router.navigate([`/admin/cases`]);
  }
}
