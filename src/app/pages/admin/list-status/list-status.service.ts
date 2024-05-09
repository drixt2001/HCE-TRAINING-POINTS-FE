import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListStatusService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getList() {
    return this.http.get<IAPI<Status>>(`https://${host}/api/status`);
  }
}

export interface Status {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  step: number;
}
