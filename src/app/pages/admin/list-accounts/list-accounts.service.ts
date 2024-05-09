import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, ResAPI } from "src/api/interface";
import { host } from "../../../../api/config";

@Injectable({
  providedIn: "root",
})
export class ListAccountsService {
  constructor(private http: HttpClient) {}

  getLists(role_id?: any, email?: any) {
    return this.http
      .get<IAPI<any>>(
        `https://${host}/api/account?role_id=${role_id}&email=${email}`,
      )
      .pipe();
  }

  getOne(email: any, role_code: any) {
    return this.http
      .get<any>(
        `https://${host}/api/account/getOne?role_code=${role_code}&email=${email}`,
      )
      .pipe();
  }

  getAllRoles() {
    return this.http
      .get<IAPI<any>>(`https://${host}/api/account/allroles`)
      .pipe();
  }

  create(account: any) {
    return this.http.post<ResAPI>(`https://${host}/api/account`, account).pipe();
  }

  update(id: number, dto: any) {
    return this.http
      .put<ResAPI>(`https://${host}/api/account/` + id, dto)
      .pipe();
  }
  delete(id: any) {
    return this.http.delete<ResAPI>(`https://${host}/api/account/` + id).pipe();
  }
}
