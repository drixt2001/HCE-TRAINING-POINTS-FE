import { Component, OnInit } from "@angular/core";
import { LoadingService } from "../app/interceptor/loading/loading.service";
import { AuthService } from "./pages/auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Quản Lý Rèn Luyện HCE";

  constructor(
    public loadingService: LoadingService,
    private authServie: AuthService,
  ) {}
  ngOnInit(): void {
    // alert(info);
  }

  checkLogin() {
    if (localStorage.getItem("token")) return true;
    else return false;
  }

  checkView(role: string) {
    if (localStorage.getItem("viewMenu") === role) return true;
    else return false;
  }

  logout() {
    this.authServie.logout();
  }

  renderInfo(): Info {
    const info = JSON.parse(localStorage.getItem("viewInfo")!);
    if (info) return info;
    else
      return {
        name: "",
        role: "",
      };
  }
}

interface Info {
  name: string;
  role: string;
}
