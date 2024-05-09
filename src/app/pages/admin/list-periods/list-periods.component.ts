import { Component, OnInit } from "@angular/core";
import { NzI18nService, vi_VN } from "ng-zorro-antd/i18n";
import { ToastService } from "src/app/services/toast/toast.service";
import { ListPeriodsService, Period } from "./list-periods.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { map } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-list-periods",
  templateUrl: "./list-periods.component.html",
  styleUrls: ["./list-periods.component.scss"],
})
export class ListPeriodsComponent implements OnInit {
  listOfData: Period[] = [];
  isVisible = false;
  buttonTitle = "Tạo kỳ tổ chức";

  PeriodForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl("", [Validators.required]),
    start: new FormControl("", [Validators.required]),
    end: new FormControl("", [Validators.required]),
  });
  constructor(
    private periodService: ListPeriodsService,
    public toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.periodService.getList().subscribe((res) => {
      this.listOfData = res.data;
    });
  }

  handleCancel() {
    this.PeriodForm.reset();
    this.isVisible = false;
  }
  handleOk() {
    if (this.PeriodForm.valid) {
      if (this.checkValidInputDate()) {
        if (this.buttonTitle === "Tạo kỳ tổ chức") {
          this.create();
          this.handleCancel();
        } else {
          this.update();
          this.handleCancel();
        }
      } else
        this.toast.open("Ngày bắt đầu phải trước ngày kết thúc", "warning");
    } else {
      this.toast.open("Vui lòng nhập đầy đủ thông tin", "warning");
    }
  }
  toggleModal(data: any) {
    if (data.id) {
      this.buttonTitle = "Cập nhật";
      this.PeriodForm.controls["id"].setValue(data.id);
      this.PeriodForm.controls["title"].setValue(data.title);
      this.PeriodForm.controls["start"].setValue(data.start);
      this.PeriodForm.controls["end"].setValue(data.end);
    } else {
      this.buttonTitle = "Tạo kỳ tổ chức";
    }
    this.isVisible = true;
  }

  getDayFormat(formDate: string) {
    return moment(formDate).format("YYYY-MM-DD");
  }
  checkValidInputDate(): boolean {
    if (
      this.getDayFormat(this.PeriodForm.value.start!) <
      this.getDayFormat(this.PeriodForm.value.end!)
    )
      return true;
    return false;
  }
  create() {
    const form = {
      title: this.PeriodForm.value.title!,
      start: this.getDayFormat(this.PeriodForm.value.start!),
      end: this.getDayFormat(this.PeriodForm.value.end!),
    };

    this.periodService
      .create(form)
      .pipe(
        map((res) => {
          if (res.data) {
            this.toast.open("Tạo thành công", "success");
            this.getList();
          }
        }),
      )
      .subscribe();
  }

  update() {
    const id = this.PeriodForm.value.id;
    const dto = {
      title: this.PeriodForm.value.title,
      start: this.getDayFormat(this.PeriodForm.value.start!),
      end: this.getDayFormat(this.PeriodForm.value.end!),
    };
    this.periodService
      .update(id, dto)
      .pipe(
        map((res) => {
          if (res.data) {
            this.toast.open("Cập nhật thành công", "success");
            this.getList();
          }
        }),
      )
      .subscribe();
  }

  delete(id: number) {
    this.periodService
      .delete(id)
      .pipe(
        map((res) => {
          this.getList();
          return this.toast.open("Xóa thành công!", "success");
        }),
      )
      .subscribe();
  }
}
