import { AfterContentInit, Component, DoCheck, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, Observer } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { AccountInfoService } from "./account-info.service";
import { ToastService } from "../../../services/toast/toast.service";
@Component({
  selector: "app-account-info",
  templateUrl: "./account-info.component.html",
  styleUrls: ["./account-info.component.scss"],
})
export class AccountInfoComponent implements OnInit, DoCheck {
  visibleChangepass = true;
  currentRoleView = "";
  info: any;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private accService: AccountInfoService,
    private toast: ToastService,
  ) {
    this.validateForm = this.fb.group({
      oldpass: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm: ["", [this.confirmValidator]],
    });
  }
  ngDoCheck(): void {
    this.renderView();
  }
  ngOnInit(): void {
    this.renderView();
    if (localStorage.getItem("token")) {
      this.authService
        .auth()
        .pipe(
          map((res) => {
            this.info = res;
            this.currentRoleView = res.role_name;
          }),
        )
        .subscribe();
    }
  }

  validateForm!: UntypedFormGroup;

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls["confirm"].updateValueAndValidity(),
    );
  }
  confirmValidator = (
    control: UntypedFormControl,
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  };

  renderView() {
    const route = this.router.url;
    if (route === "/account/changepass") {
      this.visibleChangepass = true;
    } else this.visibleChangepass = false;
  }

  changepass() {
    if (this.validateForm.valid) {
      this.accService
        .changepass(
          this.info.email,
          this.validateForm.value.oldpass,
          this.validateForm.value.password,
        )
        .pipe(
          map((res) => {
            if (res) {
              this.toast.open(res.message, res.status);
              this.validateForm.reset();
              this.router.navigate(["/account/info"]);
            }
          }),
        )
        .subscribe();
    }
  }
}
