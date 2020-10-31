import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from './../../models/login-response';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from './login-model';
import { LoginService } from 'src/app/services/auth/login.service';

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

  constructor(
    private loginService: LoginService
  ) {
    this.createForm(new LoginModel());
  }

  ngOnInit(): void {
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
      localStorage.clear();
      this.loginService.loginUser(this.username.value, this.password.value)
        .then((res) => {
          console.log(res);
          let result = res as LoginResponse;
          localStorage.setItem("token", result.token);
          localStorage.setItem("expirationDate", result.expirationDate.toString());
          localStorage.setItem("roles", JSON.stringify(result.roles));
          localStorage.setItem("user", JSON.stringify(result.user));
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

}
