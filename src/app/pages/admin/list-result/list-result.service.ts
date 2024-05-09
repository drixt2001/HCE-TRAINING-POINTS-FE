import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { host } from "src/api/config";
import { IAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";

@Injectable({
  providedIn: "root",
})
export class ListResultService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getList(class_id?: any, student?: any) {
    return this.http.get<IAPI<any>>(
      `https://${host}/api/result?class=[${class_id}]&student=${student}`,
    );
  }

  getOne(student_id: number) {
    return this.http.get<IAPI<any>>(`https://${host}/api/result/` + student_id);
  }

  getDetail(student_id?: any) {
    return this.http.get<IAPI<any>>(
      `https://${host}/api/result/detail/` + student_id,
    );
  }
}
