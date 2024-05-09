import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ListCriteriaService } from "src/app/pages/admin/list-criteria/list-criteria.service";
import { ListGroupCriteriaService } from "src/app/pages/admin/list-group-criteria/list-group-criteria.service";
import { ListStudentsService } from "../../../admin/list-students/list-students.service";
import { SeflPointService } from "../newform/sefl-point.service";
import { ListPeriodsService } from "../../../admin/list-periods/list-periods.service";
import { map } from "rxjs";
import { ToastService } from "src/app/services/toast/toast.service";
import { HttpErrorResponse } from "@angular/common/http";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { AccountInfoService } from "src/app/pages/shared/account-info/account-info.service";
import { AuthService } from "src/app/pages/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-newform",
  templateUrl: "./newform.component.html",
  styleUrls: ["./newform.component.scss"],
})
export class NewformComponent implements OnInit, AfterViewInit {
  isCreateNow = false;
  titleResult = "";
  buttonTitle = "Gửi";
  sid = 0;
  constructor(
    private toast: ToastService,
    private listGroupCriteriaService: ListGroupCriteriaService,
    private listCriteriaService: ListCriteriaService,
    private listStudentsService: ListStudentsService,
    private seflPointService: SeflPointService,
    private listPeriodsService: ListPeriodsService,
    public loadingService: LoadingService,
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router,
  ) {}
  ngAfterViewInit(): void {
    //
  }
  async getGroup() {
    await this.listGroupCriteriaService.getLists().subscribe((res) => {
      this.listGroup = res.data;
      this.listCriteriaService.getLists().subscribe((res) => {
        this.listOfData = res.data.map((data) => {
          return { ...data, selfPoint: 0 };
        });
        this.dataByGroup();
      });
    });
  }

  ngOnInit(): void {
    this.getGroup();

    this.listPeriodsService.getActiveNow().subscribe((res) => {
      if (res.data.length) {
        this.period.id = res.data[0].id;
        this.period.title = res.data[0].title;
        this.getInfo();
      } else {
        this.isCreateNow = false;
        this.titleResult = "Chưa mở kỳ đánh giá rèn luyện";
      }
    });
  }

  getInfo() {
    if (localStorage.getItem("token")) {
      this.authService
        .auth()
        .pipe(
          map((res) => {
            this.sid = res.sid!;
            this.getInfoStudent();
          }),
        )
        .subscribe();
    }
  }

  listOfData: IpointsForm[] = [];
  listGroup: any[] = [];
  student: Student | undefined;
  groupData: any[] = [];
  period: Period = {
    id: 0,
    title: "",
  };

  getInfoStudent() {
    this.listStudentsService.getInfoOne(this.sid).subscribe((res) => {
      this.student = res.data;
      this.checkCanCreate();
    });
  }
  checkCanCreate() {
    const dto = {
      period_id: this.period.id,
      student_id: this.student?.id,
    };
    this.seflPointService.checkFormInPeriod(dto).subscribe((res) => {
      if (res) {
        this.isCreateNow = true;
      } else {
        this.isCreateNow = false;
        this.titleResult =
          "Bạn đã gửi phiếu đánh giá rèn luyện trong kỳ này rồi!";
      }
    });
  }

  getResult(): string {
    const totalSelf = this.getTotalPoint()[0];
    if (totalSelf == 0) return "Chưa nhập điểm";
    if (totalSelf >= 90) return "Xuất sắc";
    else if (totalSelf >= 80) return "Giỏi";
    else if (totalSelf >= 65) return "Khá";
    else if (totalSelf >= 50) return "Trung bình";
    else if (totalSelf >= 35) return "Yếu";
    else return "Kém";
  }
  async dataByGroup() {
    this.groupData = await this.listGroup.map((group) => {
      return {
        ...group,
        criteria: this.listOfData.filter((data) => {
          return data.groupId === group.id;
        }),
      };
    });
  }

  send() {
    const value = this.listOfData.map((data) => {
      return {
        criteria_id: data.id,
        self_point: data.selfPoint,
      };
    });
    const dto = {
      period_id: this.period.id,
      student_id: this.student?.id,
      points: value,
    };
    return this.seflPointService
      .create(dto)
      .pipe(
        map((res) => {
          this.toast.open("Gửi phiếu rèn luyện thành công!", "success");
          this.router.navigate(["/student/listform"]);
        }),
      )
      .subscribe();
  }

  getTotalPoint(): number[] {
    let selfTotal = 0;
    let approvalTotal = 0;
    this.listOfData.map((data) => {
      if (data.selfPoint) selfTotal += data.selfPoint!;
      // if (data.approvalPoint) approvalTotal += data.approvalPoint!;
    });
    return [selfTotal, approvalTotal];
  }
}

export interface IpointsForm {
  id: number;
  title: string;
  maxPoint: number;
  selfPoint?: number;
  groupId: number;
}

export interface Criteria {
  id: number;
  title: string;
  max: number;
  group_id: number;
}

export interface Student {
  id: number;
  name: string;
  birthday: string;
  gender: string;
  is_leader: boolean;
  classname: string;
  major: string;
  role: string;
}

export interface Period {
  id: number;
  title: string;
}
