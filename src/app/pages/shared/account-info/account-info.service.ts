import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResAPI } from "src/api/interface";
import { host } from "../../../../api/config";

@Injectable({
  providedIn: "root",
})
export class AccountInfoService {
  constructor(private http: HttpClient) {}

  changepass(email: string, oldpass: string, newpass: string) {
    return this.http.post<ResAPI>(`https://${host}/api/account/changepass`, {
      email,
      oldpass,
      newpass,
    });
  }
}
