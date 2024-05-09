import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI, ResAPI } from "src/api/interface";
import { ToastService } from "src/app/services/toast/toast.service";
import { Notifiactions } from "./list-notifiactions.component";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListNotifiactionsService {
  constructor(private http: HttpClient) {}

  getLists() {
    return this.http
      .get<IAPI<Notifiactions>>(`https://${host}/api/notifications`)
      .pipe();
  }

  getListsView() {
    return this.http
      .get<IAPI<Notifiactions>>(`https://${host}/api/notifications/public`)
      .pipe();
  }

  create(dto: create_dto) {
    return this.http.post<IAPI<Notifiactions>>(
      `https://${host}/api/notifications`,
      dto,
    );
  }

  update(id: number, dto: create_dto) {
    return this.http.put<IAPI<Notifiactions>>(
      `https://${host}/api/notifications/` + id,
      dto,
    );
  }

  delete(id: number) {
    return this.http.delete<ResAPI>(`https://${host}/api/notifications/` + id);
  }
}

export interface create_dto {
  title: string;
  content: string;
  status: string;
  period_id: number;
}
