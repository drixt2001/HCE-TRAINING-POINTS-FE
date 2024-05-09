import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { ListResultService } from "src/app/pages/admin/list-result/list-result.service";
import { AuthService } from "src/app/pages/auth/auth.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private listResultService: ListResultService,
    public loadingService: LoadingService,
  ) {}

  detailResult: any[] = [];
  selectedStudent: any = {};

  ngOnInit(): void {
    this.routerRole();
  }

  getResultText(point: number): string {
    if (point == 0) return "Chưa nhập điểm";
    if (point >= 90) return "Xuất sắc";
    else if (point >= 80) return "Giỏi";
    else if (point >= 65) return "Khá";
    else if (point >= 50) return "Trung bình";
    else if (point >= 35) return "Yếu";
    else return "Kém";
  }

  routerRole() {
    this.authService
      .auth()
      .pipe(
        map((res) => {
          if (res.sid) {
            this.listResultService.getOne(res.sid).subscribe((res) => {
              this.selectedStudent = res.data;
            });
            this.listResultService.getDetail(res.sid).subscribe((res) => {
              this.detailResult = res.data;
            });
          }
        }),
      )
      .subscribe();
  }
}
