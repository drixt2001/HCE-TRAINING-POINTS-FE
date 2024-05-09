import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPI } from "src/api/interface";
import { GroupCriteria } from "./list-group-criteria.component";
import { host } from "../../../../api/config";
@Injectable({
  providedIn: "root",
})
export class ListGroupCriteriaService {
  constructor(private http: HttpClient) {}

  getLists() {
    return this.http.get<IAPI<GroupCriteria>>(
      `https://${host}/api/group-criteria`,
    );
  }
}
