import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth.service';

export enum AuthType {
  teacher = 'Teacher',
  student = 'Student'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authType: AuthType = AuthType.student;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginClicked() {
    // TODO
    this.authService.authenticateUser();

    this.router.navigate(['/']);
  }

  toggleAuthType() {
    this.authType = this.authType == AuthType.student ? AuthType.teacher : AuthType.student;
  }

  authTypeIsStudent() {
    return this.authType == AuthType.student;
  }

  authTypeIsTeacher() {
    return this.authType == AuthType.teacher;
  }
}
