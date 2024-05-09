import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { ToastService } from "src/app/services/toast/toast.service";
import { ResLogin } from "./login/login.component";
import { host } from "../../../api/config";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public toast: ToastService,
    public router: Router,
  ) {}

  login(email: string, password: string) {
    const Url = `https://${host}/api/auth/login`;
    return this.http.post<ResLogin>(Url, { email, password }).pipe(
      map((res) => {
        localStorage.setItem("token", res.access_token);
        this.router.navigate(["/home"]);
      }),
    );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("viewMenu");
    localStorage.removeItem("viewInfo");
    this.router.navigate(["login"]);
  }

  auth() {
    const token = localStorage.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${token}`);
    return this.http
      .get<AuthInfo>(`https://${host}/api/account/info`, {
        headers: headers,
      })
      .pipe();
  }
}

export interface AuthInfo {
  id: number;
  email: string;
  password: string;
  register_date: string;
  role_id: number;
  role_name: string;
  role_code: number;
  last_login: string;
  sid?: number;
  tid?: number;
  class_id?: number;
  class_full?: string;
  is_leader?: boolean;
}
