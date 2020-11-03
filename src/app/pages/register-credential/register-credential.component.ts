import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CredentialService } from 'src/app/services/auth/credential.service';

@Component({
  selector: 'app-register-credential',
  templateUrl: './register-credential.component.html',
  styleUrls: ['./register-credential.component.css']
})
export class RegisterCredentialComponent implements OnInit {

  formCredential: FormGroup;
  password: FormControl;
  confirmPassword: FormControl;

  isPost: boolean = false;
  hideMessage: boolean = false;
  errorMessage: string = null;

  token: string = null;
  recovery: boolean = false;

  constructor(
    private credentialService: CredentialService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((queryParams) => {
      this.token = queryParams.get("token");
      this.recovery = (queryParams.get("recovery") === "true" || queryParams.get("recovery") === "1");
    });
    this.createForm(null, null);
  }

  createForm(pwd: string, confirmpwd: string) {
    this.password = new FormControl(pwd, Validators.required);
    this.confirmPassword = new FormControl(confirmpwd, Validators.required);
    this.formCredential = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  onHideMessage() {
    this.hideMessage = true;
    this.errorMessage = null;
  }

  onSubmit() {
    this.isPost = true;
    this.onHideMessage();
    if (this.formCredential.invalid) {
      this.hideMessage = false;
      this.errorMessage = "Enter any username and password.";
    } else {

      if (this.password.value !== this.confirmPassword.value) {
        this.hideMessage = false;
        this.errorMessage = "Passwords entered do not match.";
      } else {

        this.credentialService.saveCredential(this.token, this.password.value, !this.recovery)
          .then(() => {
            this.isPost = false;
            this.formCredential.reset();
          })
          .catch((res: HttpErrorResponse) => {
            this.hideMessage = false;
            this.errorMessage = res.statusText + ' - ' + JSON.stringify(res.error);
            console.log(res);
          })
          .catch((error) => console.error(error));

      }

    }
  }

}
