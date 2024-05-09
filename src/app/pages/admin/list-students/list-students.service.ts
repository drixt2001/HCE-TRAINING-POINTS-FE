import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, IOneAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { Student } from "../../student/points/newform/newform.component";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListStudentsService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getInfoOne(id: number) {
    return this.http.get<IOneAPI<Student>>(`https://${host}/api/students/` + id);
  }
}
