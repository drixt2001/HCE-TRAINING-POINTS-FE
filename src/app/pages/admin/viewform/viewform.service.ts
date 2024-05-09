import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, IOneAPI, ResAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ViewformService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getOne(id: any) {
    return this.http.get<IOneAPI<FormInfo>>(
      `https://${host}/api/points-form/` + id,
    );
  }

  update(id: number, dto: any) {
    return this.http.put<ResAPI>(`https://${host}/api/points-form/` + id, dto);
  }
}

export interface FormInfo {
  id: number;
  period_id: number;
  period_title: string;
  status_id: number;
  step: number;
  student_id: number;
  confirm_point: number;
  result_point: number;
  total_self: number;
  total_approval: number;
  form_create: string;
  points: DetailPoint[];
}

export interface DetailPoint {
  criteria_id: number;
  self_point: number;
  approval_point: number;
}
