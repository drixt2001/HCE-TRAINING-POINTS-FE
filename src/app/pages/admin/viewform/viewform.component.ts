import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, of, throwError } from "rxjs";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { ListCriteriaService } from "src/app/pages/admin/list-criteria/list-criteria.service";
import { ListGroupCriteriaService } from "src/app/pages/admin/list-group-criteria/list-group-criteria.service";
import { ListPeriodsService } from "src/app/pages/admin/list-periods/list-periods.service";
import {
  ListStatusService,
  Status,
} from "src/app/pages/admin/list-status/list-status.service";
import { ListStudentsService } from "src/app/pages/admin/list-students/list-students.service";
import { Student } from "../../student/points/newform/newform.component";
import { FormInfo, ViewformService } from "./viewform.service";
import * as moment from "moment";
import { ToastService } from "src/app/services/toast/toast.service";
import { SeflPointService } from "../../student/points/newform/sefl-point.service";

@Component({
  selector: "app-viewform",
  templateUrl: "./viewform.component.html",
  styleUrls: ["./viewform.component.scss"],
})
export class ViewformComponent implements OnInit, AfterViewInit {
  constructor(
    private listStatusService: ListStatusService,
    private listGroupCriteriaService: ListGroupCriteriaService,
    private listCriteriaService: ListCriteriaService,
    private viewformService: ViewformService,
    private listStudentsService: ListStudentsService,
    private toastService: ToastService,
    public loadingService: LoadingService,
    public route: ActivatedRoute,
    private seflPointService: SeflPointService,
    public router: Router,
  ) {}
  ngAfterViewInit(): void {
    //
  }

  ngOnInit(): void {
    if (this.router.url.includes("/student/form")) {
      this.viewAsStudent = true;
    }
    if (this.router.url.includes("/leader/form")) {
      this.viewAsLeader = true;
    }

    this.listStatusService.getList().subscribe((res) => {
      this.listStatus = res.data;
    });
    this.getFormInfo();
  }

  formatBirthday(date: string) {
    return moment(date).format("DD/MM/YYYY");
  }
  getFormInfo() {
    const routeParams = Number(this.route.snapshot.paramMap.get("id"));
    this.viewformService
      .getOne(routeParams)
      .pipe(
        map((res) => {
          this.formInfo = res.data;
          this.getStudent();
          this.getGroup();
        }),
      )
      .subscribe();
  }
  listStatus: Status[] = [];
  listGroup: any[] = [];
  listCriteria: any[] = [];
  dataTable: any[] = [];
  formInfo?: FormInfo;
  student?: Student;
  Error = false;
  viewAsStudent = false;
  viewAsLeader = false;

  updateForm(stt_id?: number) {
    const status_id = stt_id ? stt_id : this.getCurrentStatus()[0].id;
    const dto = {
      status_id: status_id,
      confirm_point: this.formInfo!.confirm_point
        ? this.formInfo!.confirm_point
        : null,
      result_point: this.formInfo!.result_point
        ? this.formInfo!.result_point
        : null,
    };
    this.viewformService
      .update(this.formInfo!.id, dto)
      .pipe(
        map((res) => {
          this.toastService.open(res.message, res.status);
          this.getFormInfo();
        }),
      )
      .subscribe();
  }

  getCurrentStatus() {
    return this.listStatus.filter((value) => {
      return value.step === this.formInfo!.step;
    });
  }

  getStudent() {
    this.listStudentsService
      .getInfoOne(this.formInfo?.student_id!)
      .subscribe((res) => {
        console.log(res);
        this.student = res.data;
        this.student.birthday = this.formatBirthday(this.student.birthday);
      });
  }
  async getGroup() {
    await this.listGroupCriteriaService.getLists().subscribe((res) => {
      this.listGroup = res.data;
      this.listCriteriaService.getLists().subscribe((res) => {
        this.listCriteria = res.data.map((data) => {
          if (this.formInfo?.points.length) {
            return {
              ...data,
              points: this.formInfo.points.filter((value) => {
                return value.criteria_id === data.id;
              })[0],
            };
          } else this.Error = true;
          return data;
        });
        this.dataByGroup();
      });
    });
  }

  async dataByGroup() {
    this.dataTable = await this.listGroup.map((group) => {
      return {
        ...group,
        criteria: this.listCriteria.filter((data) => {
          return data.groupId === group.id;
        }),
      };
    });
  }

  getResult(point: number): string {
    if (point == 0 || !point) return "Chưa nhập điểm";
    if (point >= 90) return "Xuất sắc";
    else if (point >= 80) return "Giỏi";
    else if (point >= 65) return "Khá";
    else if (point >= 50) return "Trung bình";
    else if (point >= 35) return "Yếu";
    else return "Kém";
  }
  onStatusChange(index: number) {
    this.formInfo!.step = index + 1;
  }

  checkView(role: string) {
    if (localStorage.getItem("viewMenu") === role) return true;
    else return false;
  }

  getTotalPoint(): number[] {
    let selfTotal = 0;
    let approvalTotal = 0;
    this.formInfo!.points.map((data) => {
      if (data.self_point) selfTotal += data.self_point!;
      if (data.approval_point) approvalTotal += data.approval_point!;
    });
    return [selfTotal, approvalTotal];
  }

  send() {
    console.log(this.formInfo);
    const value = this.formInfo!.points.map((data) => {
      return {
        criteria_id: data.criteria_id,
        self_point: data.self_point,
        approval_point: data.approval_point,
      };
    });

    return this.seflPointService
      .updateDetail(this.formInfo!.id, value)
      .pipe(
        map(() => {
          this.updateForm(2);
        }),
      )
      .subscribe();
  }
}
