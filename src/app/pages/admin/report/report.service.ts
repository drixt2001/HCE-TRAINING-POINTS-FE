import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getReportPie() {
    return this.http.get<any>(`https://${host}/api/points-form/report/pie`);
  }

  getReportBar() {
    return this.http.get<any>(`https://${host}/api/points-form/report/bar`);
  }
}
