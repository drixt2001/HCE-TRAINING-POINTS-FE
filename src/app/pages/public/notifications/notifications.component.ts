import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { ListNotifiactionsService } from "../../admin/list-notifiactions/list-notifiactions.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  constructor(
    private notiService: ListNotifiactionsService,
    private authService: AuthService,
  ) {}

  notiData: any[] = [];
  ngOnInit(): void {
    this.notiService.getListsView().subscribe((res) => {
      this.notiData = res.data;
    });
  }

  checkView(role: string) {
    if (localStorage.getItem("viewMenu") === role) return true;
    else return false;
  }

  imageArray: number[] = [1, 2, 3];
}
