import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, ResAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class SeflPointService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  create(dto: any) {
    return this.http.post<ResAPI>(`https://${host}/api/points-form`, dto);
  }

  updateDetail(id: number, dto: any) {
    return this.http.put<ResAPI>(
      `https://${host}/api/points-form/detail/` + id,
      dto,
    );
  }

  checkFormInPeriod(dto: any) {
    return this.http.post<ResAPI>(`https://${host}/api/points-form/check`, dto);
  }
}
