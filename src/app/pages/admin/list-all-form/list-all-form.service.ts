import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";

@Injectable({
  providedIn: "root",
})
export class ListAllFormService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getList(
    period?: any,
    status?: any,
    class_id?: any,
    student?: any,
    student_id?: number,
  ) {
    return this.http.get<IAPI<ListPointsForm>>(
      `https://${host}/api/points-form?period=${period}&status=[${status}]&class=[${class_id}]&student=${student}&student_id=${student_id}`,
    );
  }
}

export interface ListPointsForm {
  id: number;
  student_id: number;
  period_id: number;
  form_id: number;
  student_name: string;
  class: string;
  created_at: string;
  form_point: number;
  confirm_point: number;
  result_point: number;
  approval_point: number;
  status: string;
  birthday: string;
  period: string;
}
