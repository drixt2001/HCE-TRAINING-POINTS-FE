import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
// import { LoginService } from './login.service';
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit {
  hide = true;
  ngOnInit(): void {}
  constructor(private authService: AuthService) {}
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
  ]);
  matcher = new ErrorStateMatcher();

  Login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    if (!this.emailFormControl.invalid && !this.passwordFormControl.invalid)
      return this.authService.login(email!, password!).subscribe();
    return null;
  }
}

export interface ResLogin {
  status: string;
  message: string;
  access_token: string;
}
