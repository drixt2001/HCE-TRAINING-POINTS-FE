import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListClassService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getList() {
    return this.http.get<IAPI<Class>>(`https://${host}/api/class`);
  }

  getListByTeacher(teacher_id: number) {
    return this.http.get<IAPI<Class>>(`https://${host}/api/class/${teacher_id}`);
  }
}

export interface Class {
  id: number;
  fullname: string;
  shortname: string;
}
