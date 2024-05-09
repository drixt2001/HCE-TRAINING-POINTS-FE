import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.sass"],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
