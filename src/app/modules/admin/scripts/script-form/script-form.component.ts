import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Script } from './../../../../core/models/Script.model';
import { AlertService } from './../../../../core/services/alert.service';
import { ScriptService } from './../../../../core/services/script.service';
import { FormComponent, Message } from './../../../../shared/common';
import { FormHelper } from './../../../../shared/form-helper';

@Component({
  selector: 'app-script-form',
  templateUrl: './script-form.component.html',
  styleUrls: ['./script-form.component.scss']
})
export class ScriptFormComponent extends FormComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    shared: new FormControl(false),
    active: new FormControl(true)
  });

  modelId: number;

  constructor(alertService: AlertService, private scriptService: ScriptService, private router: Router, route: ActivatedRoute) {
    super(alertService);

    this.modelId = route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.modelId) {
      this.scriptService.get(this.modelId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => FormHelper.setFormGroupValues(this.formGroup, res));
    }
  }

  onSave(close?: boolean) {
    if (!this.validateForm(this.formGroup)) {
      return;
    }

    const script = new Script();
    script.deserialize(FormHelper.getValuesFromFormGroup(this.formGroup));

    let action$: Observable<any>;

    if (this.modelId) {
      action$ = this.scriptService.put(this.modelId, script);
    } else {
      action$ = this.scriptService.post(script);
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
            this.router.navigate([`/admin/scripts`]);

          // When save only
          } else {
            // When is a new registry, redirect to update
            if (!this.modelId) {
              this.router.navigate([`/admin/scripts/update/${res.id}`]);
            }
          }
        },
        error => this.emitErrorMessage(error)
      );
  }

  onCancel() {
    this.router.navigate([`/admin/scripts`]);
  }
}
