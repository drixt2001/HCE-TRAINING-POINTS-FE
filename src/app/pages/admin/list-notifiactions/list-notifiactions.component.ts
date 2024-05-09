import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs";
import { ToastService } from "src/app/services/toast/toast.service";
import { ListPeriodsService } from "../list-periods/list-periods.service";
import {
  create_dto,
  ListNotifiactionsService,
} from "./list-notifiactions.service";

@Component({
  selector: "app-list-notifiactions",
  templateUrl: "./list-notifiactions.component.html",
  styleUrls: ["./list-notifiactions.component.scss"],
})
export class ListNotifiactionsComponent implements OnInit {
  constructor(
    private service: ListNotifiactionsService,
    private periodService: ListPeriodsService,
    public toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.getList();
  }
  isVisible = false;
  listOfData: any[] = [];
  listPeriods: any[] = [];
  buttonTitle = "Tạo";
  createForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    period_id: new FormControl("", [Validators.required]),
  });

  showModal(data?: any): void {
    this.isVisible = true;
    if (data) {
      this.buttonTitle = "Cập nhật";
      this.createForm.controls["id"].setValue(data.id);
      this.createForm.controls["title"].setValue(data.title);
      this.createForm.controls["content"].setValue(data.content);
      this.createForm.controls["status"].setValue(data.status);
      this.createForm.controls["period_id"].setValue(data.period_id.toString());
    }
  }

  handleOk(): void {
    if (this.createForm.valid) {
      if (this.buttonTitle === "Tạo") {
        this.create();
      } else {
        this.update();
      }
      this.isVisible = false;
    } else {
      this.toast.open("Vui lòng điền đầy đủ thông tin", "warning");
    }
  }

  create() {
    const dto = {
      title: this.createForm.get("title")!.value!,
      content: this.createForm.get("content")!.value!,
      status: this.createForm.get("status")!.value!,
      period_id: Number(this.createForm.get("period_id")!.value!),
    };
    this.service.create(dto).subscribe((res) => {
      if (res.data) {
        this.toast.open("Tạo thành công", "success");
        this.getList();
      }
    });
  }

  update() {
    const id = this.createForm.controls["id"].value;
    const dto = {
      title: this.createForm.get("title")!.value!,
      content: this.createForm.get("content")!.value!,
      status: this.createForm.get("status")!.value!,
      period_id: Number(this.createForm.get("period_id")!.value!),
    };
    this.service.update(id, dto).subscribe((res) => {
      if (res.data) {
        this.toast.open("Cập nhật thành công", "success");
        this.getList();
      }
    });
  }

  getList() {
    this.service.getLists().subscribe((res) => {
      this.listOfData = res.data;
    });

    this.periodService.getList().subscribe((res) => {
      this.listPeriods = res.data;
    });
  }

  handleCancel(): void {
    this.createForm.reset();
    this.buttonTitle = "Tạo";
    this.isVisible = false;
  }

  deleteNoti(id: number) {
    this.service
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

export interface Notifiactions {
  title: string;
  content: string;
  status: string;
  period_id: number;
  created_at: string;
  updated_at: string;
}
