import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsubscrable } from 'src/app/shared/classes/common';

import { AuthService } from './../../../core/services/auth.service';
import { FormValidationHelper } from './../../../shared/classes/form-validation-helper';
import { AlertService, AlertType } from './../../../shared/services/alert.service';

export enum AuthType {
  teacher = 'Teacher',
  student = 'Student'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Unsubscrable implements OnInit {
  authType: AuthType = AuthType.student;

  authAdminGroup: FormGroup;
  authStudentGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    route: ActivatedRoute
  ) {
    super();

    // Logout user
    if (route.snapshot.routeConfig.path === 'logout') {
      authService.logout();

      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    if (this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin']);
    }

    this.authAdminGroup = new FormGroup({
      code: new FormControl(),
      password: new FormControl()
    });

    this.authStudentGroup = new FormGroup({
      name: new FormControl(),
      code: new FormControl(),
      activity_code: new FormControl()
    });
  }

  onLoginAdministrator() {
    if (FormValidationHelper.hasError(this.authAdminGroup)) {
      FormValidationHelper.markAllTouched(this.authAdminGroup);

      return;
    }

    this.authService.loginAdministrator(
      this.authAdminGroup.controls.code.value,
      this.authAdminGroup.controls.password.value
    )
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(res => {
      this.router.navigate(['/admin']);
    }, error => {
      this.alertService.open(error.error, AlertType.ERROR);
    });
  }

  onLoginStudent() {
    if (FormValidationHelper.hasError(this.authStudentGroup)) {
      FormValidationHelper.markAllTouched(this.authStudentGroup);

      return;
    }

    // TODO:
    alert('To be implemented ;)');
  }

  toggleAuthType() {
    this.authType = this.authType === AuthType.student ? AuthType.teacher : AuthType.student;
  }

  authTypeIsStudent() {
    return this.authType === AuthType.student;
  }

  authTypeIsAdministrator() {
    return this.authType === AuthType.teacher;
  }
}
