import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { ListClassService } from "../../admin/list-class/list-class.service";
import { ListResultService } from "../../admin/list-result/list-result.service";
import { AuthService } from "../../auth/auth.service";
import * as XLSX from "xlsx";
import * as moment from "moment";
@Component({
  selector: "app-list-result",
  templateUrl: "./list-result.component.html",
  styleUrls: ["./list-result.component.scss"],
})
export class ListResultClassComponent implements OnInit {
  constructor(
    private listClassService: ListClassService,
    private listResultService: ListResultService,
    public loadingService: LoadingService,
    private authService: AuthService,
  ) {}

  isVisible = false;
  listClass: any[] = [];
  listResult: any[] = [];
  detailResult: any[] = [];
  viewAsLeader = false;

  classname = "";
  selectedClass: number = 0;
  searchStudent: string = "";
  selectedStudent: any = {};

  ngOnInit(): void {
    this.routerRole();
  }

  routerRole() {
    this.authService
      .auth()
      .pipe(
        map((res) => {
          // if teacher
          if (res.tid) {
            this.getClassOfTeacher(res.tid);
          }

          // if classleader
          if (res.class_id && res.is_leader && res.class_full) {
            this.viewAsLeader = true;
            this.classname = res.class_full;
            this.selectedClass = res.class_id;
            this.search();
          }
        }),
      )
      .subscribe();
  }

  getClassOfTeacher(teacher_id: number) {
    this.listClassService.getListByTeacher(teacher_id).subscribe((res) => {
      this.listClass = res.data;
      if (res.data[0]) this.selectedClass = res.data[0].id;
      this.search();
    });
  }

  search() {
    this.getResult(this.selectedClass, this.searchStudent);
  }

  getResult(class_id?: any, student?: any) {
    this.listResultService.getList(class_id, student).subscribe((res) => {
      this.listResult = res.data;
    });
  }

  getClass() {
    this.listClassService.getList().subscribe((res) => {
      this.listClass = res.data;
    });
  }

  modal(data: any) {
    this.isVisible = true;
    this.selectedStudent = data;
    this.listResultService.getDetail(data.sid).subscribe((res) => {
      this.detailResult = res.data;
    });
  }

  handleCancel() {
    this.isVisible = false;
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

  export() {
    let classname;
    if (this.viewAsLeader) classname = this.classname;
    else
      this.listClass.map((value) => {
        if (value.id == this.selectedClass) classname = value.short_name;
      });

    let element = document.getElementById("tablersclass");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    console.log(ws);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    const now = moment(Date.now()).format("DD-MM-YYYY");
    XLSX.writeFile(wb, `KQRL HCE ${classname} ${now}.xlsx`);
  }
}
