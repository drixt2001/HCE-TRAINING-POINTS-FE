import { Component, OnInit } from "@angular/core";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { ListClassService } from "../list-class/list-class.service";
import { ListResultService } from "./list-result.service";
import * as XLSX from "xlsx";
import * as moment from "moment";
@Component({
  selector: "app-list-result",
  templateUrl: "./list-result.component.html",
  styleUrls: ["./list-result.component.scss"],
})
export class ListResultComponent implements OnInit {
  isVisible = false;
  viewAsClass = false;

  listResult: any[] = [];
  detailResult: any[] = [];
  listClass: any[] = [];

  selectedClass: number[] = [];
  selectedStudent: any = {};
  searchStudent: string = "";
  allClass = { shortname: "Tất cả", id: 0 };

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
    result_point: {
      sortFn: (a: any, b: any) => a.result_point - b.result_point,
    },
    rank: {
      sortFn: (a: any, b: any) => a.rank - b.rank,
    },
  };

  constructor(
    private listClassService: ListClassService,
    private listResultService: ListResultService,
    public loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.getClass();
    this.getResult(this.selectedClass, this.searchStudent);
  }

  getClass() {
    this.listClassService.getList().subscribe((res) => {
      this.listClass = res.data;
      this.listClass.unshift(this.allClass);
    });
  }

  getResult(class_id?: any, student?: any) {
    this.listResultService.getList(class_id, student).subscribe((res) => {
      this.listResult = res.data;
    });
  }

  search() {
    this.getResult(this.getClassID(), this.searchStudent);
  }

  getClassID() {
    if (this.selectedClass.includes(0)) {
      return [];
    } else return this.selectedClass;
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
    let element = document.getElementById("tablers");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    console.log(ws);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    const now = moment(Date.now()).format("DD-MM-YYYY");
    XLSX.writeFile(wb, `KQRL HCE ${now}.xlsx`);
  }
}
