import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListCriteriaService {
  constructor(private http: HttpClient) {}

  getLists() {
    return this.http.get<IAPI<ICriteria>>(`https://${host}/api/criteria`);
  }
}

export interface ICriteria {
  id: number;
  title: string;
  maxPoint: number;
  groupId: number;
}
