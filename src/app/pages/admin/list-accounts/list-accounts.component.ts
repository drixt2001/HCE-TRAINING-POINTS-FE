import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { map } from "rxjs";
import { LoadingService } from "src/app/interceptor/loading/loading.service";
import { ToastService } from "src/app/services/toast/toast.service";
import { AuthService } from "../../auth/auth.service";
import { ListClassService } from "../list-class/list-class.service";
import { ListAccountsService } from "./list-accounts.service";

@Component({
  selector: "app-list-accounts",
  templateUrl: "./list-accounts.component.html",
  styleUrls: ["./list-accounts.component.scss"],
})
export class ListAccountsComponent implements OnInit {
  passwordVisible = false;
  modalVisible = false;
  currentRoleCreate = "";
  classLeader = false;
  buttonTitle = "";
  modalTitle = "";
  viewVisile = false;

  listAccounts: any[] = [];
  listRoles: any[] = [];
  listClass: any[] = [];
  selectedClass: number[] = [];
  info: any;
  searchRole = new FormControl(0);
  searchEmail: string = "";
  currentRole = 0;
  column = {
    email: {
      sortFn: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    role_name: {
      sortFn: (a: any, b: any) => a.role_name.localeCompare(b.role_name),
    },
  };
  constructor(
    private listAccountsService: ListAccountsService,
    private listClassService: ListClassService,
    private toast: ToastService,
    public loadingService: LoadingService,
  ) {}

  createForm = new FormGroup({
    id: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    role_id: new FormControl(),
    role_code: new FormControl(0),
  });

  managerForm = new FormGroup({
    id: new FormControl(),
    manager_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    phone: new FormControl(""),
    address: new FormControl(""),
  });

  teacherForm = new FormGroup({
    id: new FormControl(),
    teacher_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    unit: new FormControl(""),
    class_id: new FormControl([], [Validators.required]),
    phone: new FormControl(""),
    address: new FormControl(""),
    tid: new FormControl(""),
  });

  studentForm = new FormGroup({
    id: new FormControl(),
    student_id: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    birthday: new FormControl("", [Validators.required]),
    class_id: new FormControl(0, [Validators.required]),
    phone: new FormControl(""),
    address: new FormControl(""),
    is_leader: new FormControl(false),
  });

  ngOnInit(): void {
    this.getList();
    this.getRoles();
    this.getClass();
  }

  search() {
    this.getList();
  }

  showModal() {
    this.modalTitle = "Tạo tài khoản";
    this.buttonTitle = "Tạo";
    this.modalVisible = true;
  }

  viewModal(email: string, role_code: string) {
    this.modalTitle = "Cập nhật tài khoản";
    this.buttonTitle = "Cập nhật";
    this.modalVisible = true;
    this.getInfo(email, role_code);
  }

  create(dto: any) {
    this.listAccountsService.create(dto).subscribe((res) => {
      if (res) {
        this.toast.open("Tạo thành công", "success");
        this.clickCancel();
        this.getList();
      }
    });
  }

  update(id: any, dto: any) {
    this.listAccountsService.update(id, dto).subscribe((res) => {
      if (res) {
        this.toast.open("Cập nhật thành công", "success");
        this.clickCancel();
        this.getList();
      }
    });
  }

  clickOk() {
    let account = this.createForm.value;
    let dto;
    if (this.currentRoleCreate === "Ban cán sự")
      this.studentForm.controls["is_leader"].setValue(true);

    if (this.currentRoleCreate === "Phòng CTSV") {
      dto = {
        account: account,
        manager: this.managerForm.value,
      };
    } else if (this.currentRoleCreate === "CVHT")
      dto = {
        account: account,
        teacher: this.teacherForm.value,
      };
    else if (
      this.currentRoleCreate === "Ban cán sự" ||
      this.currentRoleCreate === "Sinh viên"
    ) {
      dto = {
        account: account,
        student: this.studentForm.value,
      };
    }

    if (
      this.createForm.valid &&
      (this.managerForm.valid ||
        this.teacherForm.valid ||
        this.studentForm.valid)
    ) {
      if (this.buttonTitle == "Tạo") {
        this.create(dto);
      } else {
        this.update(this.createForm.value.id, dto);
      }
    } else {
      this.toast.open("Vui lòng điền các thông tin hợp lệ", "warning");
    }
  }

  clickCancel() {
    this.createForm.reset();
    this.managerForm.reset();
    this.teacherForm.reset();
    this.studentForm.reset();
    this.modalVisible = false;
    this.passwordVisible = false;
    this.currentRoleCreate = "";
  }

  getList() {
    this.listAccountsService
      .getLists(
        this.searchRole.value ? this.searchRole.value : 0,
        this.searchEmail,
      )
      .subscribe((res) => {
        this.listAccounts = res.data;
      });
  }

  getRoles() {
    this.listAccountsService.getAllRoles().subscribe((res) => {
      this.listRoles = res.data;
    });
  }
  getClass() {
    this.listClassService.getList().subscribe((res) => {
      this.listClass = res.data;
    });
  }

  getInfo(email: string, role_code: string) {
    if (localStorage.getItem("token")) {
      this.listAccountsService
        .getOne(email, role_code)
        .pipe(
          map((res) => {
            this.createForm.patchValue(res);
            this.managerForm.patchValue(res);
            this.teacherForm.patchValue(res);
            this.studentForm.patchValue(res);
            this.currentRoleCreate = res.role_name;
          }),
        )
        .subscribe();
    }
  }
  deleteAccount(id: any) {
    this.listAccountsService.delete(id).subscribe((res) => {
      if (res) {
        this.toast.open(res.message, res.status);
        this.getList();
      }
    });
  }
  checkViewRole(roles: any) {
    if (roles == 1) this.currentRoleCreate = "Phòng CTSV";
    if (roles == 2) this.currentRoleCreate = "CVHT";
    if (roles == 3) this.currentRoleCreate = "Ban cán sự";
    if (roles == 4) this.currentRoleCreate = "Sinh viên";
    this.managerForm.reset();
    this.teacherForm.reset();
    this.studentForm.reset();
  }

  getDayFormat(formDate: string) {
    return moment(formDate).format("YYYY-MM-DD");
  }
}
