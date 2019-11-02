import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormHelper } from '../../../shared/form-helper';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  authRecoveryGroup: FormGroup;

  ngOnInit() {
    this.authRecoveryGroup = new FormGroup({
      email: new FormControl()
    });
  }

  onRecoveryPassword() {
    if (FormHelper.hasError(this.authRecoveryGroup)) {
      FormHelper.markAllTouched(this.authRecoveryGroup);

      return;
    }

    alert('To be implemented');
  }
}
