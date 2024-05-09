import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, throwError } from "rxjs";
import { ToastService } from "src/app/services/toast/toast.service";
import { ListClassService } from "../list-class/list-class.service";
import { ListPeriodsService } from "../list-periods/list-periods.service";
import { ListStatusService } from "../list-status/list-status.service";
import { ViewformService } from "../viewform/viewform.service";
import { ListAllFormService } from "./list-all-form.service";
import { ListPointsForm } from "./list-all-form.service";
@Component({
  selector: "app-list-all-form",
  templateUrl: "./list-all-form.component.html",
  styleUrls: ["./list-all-form.component.scss"],
})
export class ListAllFormComponent implements OnInit {
  allClass = { shortname: "Tất cả", id: 0 };

  constructor(
    private listPeriodsService: ListPeriodsService,
    private listStatusService: ListStatusService,
    private listClassService: ListClassService,
    private listAllFormService: ListAllFormService,
    private viewformService: ViewformService,
    public route: ActivatedRoute,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.listPeriodsService.getList().subscribe((res) => {
      this.listPeriod = res.data;
      if (res.data[0]) this.selectedPeriod = res.data[0].id;
      this.setPeriodByParam();
      this.getListForm();
    });

    this.listStatusService.getList().subscribe((res) => {
      this.listStatus = res.data;
    });

    this.listClassService.getList().subscribe((res) => {
      this.listClass = res.data;
      this.listClass.unshift(this.allClass);
    });
  }

  listPoints: ListPointsForm[] = [];
  listClass: any[] = [];
  listPeriod: any[] = [];
  listStatus: any[] = [];

  selectedClass: number[] = [];
  selectedPeriod: number = 0;
  selectedStatus: number = 0;
  searchStudent: string = "";

  column = {
    student_id: {
      sortFn: (a: any, b: any) => a.student_id.localeCompare(b.student_id),
    },
    student_name: {
      sortFn: (a: any, b: any) => a.student_name.localeCompare(b.student_name),
    },
    class: {
      sortFn: (a: any, b: any) => a.class.localeCompare(b.class),
    },
    form_point: {
      sortFn: (a: any, b: any) => a.form_point - b.form_point,
    },
    confirm_point: {
      sortFn: (a: any, b: any) => a.confirm_point - b.confirm_point,
    },
    result_point: {
      sortFn: (a: any, b: any) => a.result_point - b.result_point,
    },
    status: {
      sortFn: (a: any, b: any) => a.status.localeCompare(b.status),
    },
  };

  submit(id: number, rs_point: number) {
    const dto = {
      status_id: this.listStatus.filter((value) => {
        return value.title === "Đã công bố";
      })[0].id,
      result_point: rs_point,
      confirm_point: rs_point,
    };
    this.viewformService
      .update(id, dto)
      .pipe(
        map((res) => {
          this.toastService.open(
            "Công bố điểm chính thức hoàn tất",
            res.status,
          );
          this.getListForm();
        }),
      )
      .subscribe();
  }
  search() {
    this.getListForm();
  }
  getListForm() {
    this.listAllFormService
      .getList(
        this.selectedPeriod,
        this.selectedStatus ? this.selectedStatus : "",
        this.getClassID(),
        this.searchStudent,
      )
      .subscribe((res) => {
        this.listPoints = res.data;
      });
  }
  setPeriodByParam() {
    const routeParams = Number(this.route.snapshot.paramMap.get("period_id"));
    if (routeParams) {
      this.selectedPeriod = routeParams;
      this.getListForm();
    }
  }
  getClassID() {
    if (this.selectedClass.includes(0)) {
      return [];
    } else return this.selectedClass;
  }
}
