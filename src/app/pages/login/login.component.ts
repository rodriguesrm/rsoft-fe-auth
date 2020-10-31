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
  }

  onSubmit() {
    this.isPost = true;
    this.hideMessage = false;
    if (this.formLogin.valid) {
      // this.loginService.loginUser(this.username.value, this.password.value)
      this.loginService.loginUser('', '')
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

}
