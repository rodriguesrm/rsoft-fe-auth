import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from './../../models/login-response';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from './login-model';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  username: FormControl;
  password: FormControl;
  isPost: boolean = false;
  hideMessage: boolean = false;
  errorMessage: string = null;
  isAuthenticatedUser: boolean;
  redirect: string = null;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.createForm(new LoginModel());
  }

  ngOnInit(): void {
    this.checkUserAuthenticated();
    this.activeRoute.queryParamMap.subscribe((queryParams) => {
      this.redirect = queryParams.get("redirect");
    });
  }

  createForm(model: LoginModel) {
    this.username = new FormControl(model.username, Validators.required);
    this.password = new FormControl(model.password, Validators.required);
    this.formLogin = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onHideMessage() {
    this.hideMessage = true;
    this.errorMessage = null;
  }

  onSubmit() {
    this.isPost = true;
    this.onHideMessage();
    if (this.formLogin.invalid) {
      this.hideMessage = false;
      this.errorMessage = "Enter any username and password.";
    } else {
      this.unRegisterUser();
      this.loginService.loginUser(this.username.value, this.password.value)
        .then((res) => {
          this.registerUser(res as LoginResponse);
          this.isPost = false;
          this.formLogin.reset();
        })
        .catch((res: HttpErrorResponse) => {
          this.hideMessage = false;
          if (res.status === 401)
            this.errorMessage = res.statusText + ' - ' + res.error;
          else
            this.errorMessage = res.statusText + ' - ' + JSON.stringify(res.error);
          console.log(res);
        })
        .catch((error) => console.error(error));
    }
  }

  registerUser(userData: LoginResponse) {
    console.log(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("expirationDate", userData.expirationDate.toString());
    localStorage.setItem("roles", JSON.stringify(userData.roles));
    localStorage.setItem("user", JSON.stringify(userData.user));
    this.checkUserAuthenticated();
    if (this.redirect)
      window.open(this.redirect);
  }

  unRegisterUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("roles");
    localStorage.removeItem("user");
    this.isAuthenticatedUser = false;
  }

  checkUserAuthenticated() {
    let token = localStorage.getItem("token");
    let expirationDate = localStorage.getItem("expirationDate");
    if (token && expirationDate) {
      let tokenDeadline = new Date(expirationDate);
      if (tokenDeadline.getTime() < new Date().getTime()) {
        this.unRegisterUser();
      } else {
        this.isAuthenticatedUser = true;
      }
    } else {
      this.unRegisterUser();
    }
  }

}
