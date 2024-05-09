import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, ResAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListPeriodsService {
  constructor(private http: HttpClient, public toast: ToastService) {}

  getList() {
    return this.http.get<IAPI<Period>>(`https://${host}/api/periods`);
  }

  getActiveNow() {
    return this.http.get<IAPI<Period>>(`https://${host}/api/periods/now`);
  }

  create(dto: any) {
    return this.http.post<IAPI<Period>>(`https://${host}/api/periods`, dto);
  }

  update(id: number, dto: any) {
    return this.http.put<IAPI<Period>>(`https://${host}/api/periods/` + id, dto);
  }

  delete(id: number) {
    return this.http.delete<ResAPI>(`https://${host}/api/periods/` + id);
  }
}

export interface Period {
  id: number;
  title: string;
  start: string;
  end: string;
  form?: Array<any>;
  noti?: Array<any>;
}
