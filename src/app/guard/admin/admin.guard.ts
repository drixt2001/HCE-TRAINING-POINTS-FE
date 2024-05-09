import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "src/app/pages/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    // check token in localStorage
    if (localStorage.getItem("token")) {
      return this.authService.auth().pipe(
        map((response) => {
          if (response.role_name === "Phòng CTSV") {
            localStorage.setItem("viewMenu", "ctsv");
          }
          if (response.role_name === "CVHT") {
            localStorage.setItem("viewMenu", "cvht");
          }
          if (response.role_name === "Ban cán sự") {
            localStorage.setItem("viewMenu", "classleader");
          }
          if (response.role_name === "Sinh viên") {
            localStorage.setItem("viewMenu", "student");
          }
          const info = {
            name: response.email,
            role: response.role_name,
          };
          localStorage.setItem("viewInfo", JSON.stringify(info));

          let flag = false;
          //check api token if response is success return can activate
          if (response.id) {
            flag = true;
          }
          return flag;
        }),
        catchError(() => {
          //check api token if response is not success return can not activate
          this.authService.logout();
          return of(false);
        }),
      );
    } else {
      // not token in localStorage
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class ChildGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}
  canActivateChild() {
    // check token in localStorage
    if (localStorage.getItem("token")) {
      return this.authService.auth().pipe(
        map((response) => {
          if (response.role_name === "Phòng CTSV") {
            localStorage.setItem("viewMenu", "ctsv");
          }
          if (response.role_name === "CVHT") {
            localStorage.setItem("viewMenu", "cvht");
          }
          if (response.role_name === "Ban cán sự") {
            localStorage.setItem("viewMenu", "classleader");
          }
          if (response.role_name === "Sinh viên") {
            localStorage.setItem("viewMenu", "student");
          }
          const info = {
            name: response.email,
            role: response.role_name,
          };
          localStorage.setItem("viewInfo", JSON.stringify(info));
          let flag = false;
          if (response.id) {
            flag = true;
          }
          return flag;
        }),
        catchError(() => {
          this.authService.logout();
          return of(false);
        }),
      );
    } else {
      // not token in localStorage
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    // check token in localStorage
    if (localStorage.getItem("token")) {
      return this.authService.auth().pipe(
        map((response) => {
          if (response.role_name === "Phòng CTSV") {
            localStorage.setItem("viewMenu", "ctsv");
          }
          if (response.role_name === "CVHT") {
            localStorage.setItem("viewMenu", "cvht");
          }
          if (response.role_name === "Ban cán sự") {
            localStorage.setItem("viewMenu", "classleader");
          }
          if (response.role_name === "Sinh viên") {
            localStorage.setItem("viewMenu", "student");
          }
          const info = {
            name: response.email,
            role: response.role_name,
          };
          localStorage.setItem("viewInfo", JSON.stringify(info));

          let flag = false;
          //check api token if response is success return can activate
          if (
            response.role_name === "Sinh viên" ||
            response.role_name === "Ban cán sự"
          ) {
            flag = true;
          }
          return flag;
        }),
        catchError(() => {
          //check api token if response is not success return can not activate
          this.authService.logout();
          return of(false);
        }),
      );
    } else {
      // not token in localStorage
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
