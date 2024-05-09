import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { any } from "cypress/types/bluebird";
import { map } from "rxjs";
import {
  ListAllFormService,
  ListPointsForm,
} from "../../admin/list-all-form/list-all-form.service";
import { ListClassService } from "../../admin/list-class/list-class.service";
import { ListPeriodsService } from "../../admin/list-periods/list-periods.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-list-class-form",
  templateUrl: "./list-class-form.component.html",
  styleUrls: ["./list-class-form.component.scss"],
})
export class ListClassFormComponent implements OnInit {
  constructor(
    private listPeriodsService: ListPeriodsService,
    private listAllFormService: ListAllFormService,
    private listClassService: ListClassService,
    private authService: AuthService,
    public route: Router,
  ) {}

  listPoints: ListPointsForm[] = [];
  listPeriod: any[] = [];
  listClass: any[] = [];
  listStatus: any[] = [];

  selectedPeriod: number = 0;
  searchStudent: string = "";
  selectedClass: number = 0;
  classname: string | undefined;
  viewAsStudent = false;

  ngOnInit(): void {
    if (this.route.url === "/student/listform") {
      this.viewAsStudent = true;
    }
    this.routerRole();
  }

  search() {
    this.getListForm();
  }

  getPeriod() {
    this.listPeriodsService.getList().subscribe((res) => {
      this.listPeriod = res.data;
      if (res.data[0]) this.selectedPeriod = res.data[0].id;
      this.getListForm();
    });
  }

  getListForm() {
    this.listAllFormService
      .getList(
        this.selectedPeriod,
        this.listStatus,
        this.selectedClass,
        this.searchStudent,
      )
      .subscribe((res) => {
        this.listPoints = res.data;
      });
  }

  getClassOfTeacher(teacher_id: number) {
    this.listClassService.getListByTeacher(teacher_id).subscribe((res) => {
      this.listClass = res.data;
      if (res.data[0]) this.selectedClass = res.data[0].id;
      this.getPeriod();
    });
  }

  routerRole() {
    this.authService
      .auth()
      .pipe(
        map((res) => {
          // if teacher
          if (res.tid) {
            this.listStatus = [2, 3, 4, 5, 6, 7, 8];
            this.getClassOfTeacher(res.tid);
          }

          // if classleader
          if (res.class_id && res.is_leader && !this.viewAsStudent) {
            this.classname = res.class_full;
            this.selectedClass = res.class_id;
            this.listStatus = [];
            this.getPeriod();
          }

          // if student
          if (res.sid && this.viewAsStudent) {
            this.listAllFormService
              .getList(0, [], [], "", res.sid)
              .subscribe((res) => {
                this.listPoints = res.data;
              });
          }
        }),
      )
      .subscribe();
  }

  checkView(role: string) {
    if (localStorage.getItem("viewMenu") === role) return true;
    else return false;
  }
}
