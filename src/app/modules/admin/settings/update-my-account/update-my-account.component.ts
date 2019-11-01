import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-my-account',
  templateUrl: './update-my-account.component.html',
  styleUrls: ['./update-my-account.component.scss']
})
export class UpdateMyAccountComponent {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl()
  });

  constructor() { }
}
