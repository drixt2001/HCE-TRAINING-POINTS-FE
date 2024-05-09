import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-result-page",
  templateUrl: "./result-page.component.html",
  styleUrls: ["./result-page.component.sass"],
})
export class ResultPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  status!: string;

  @Input()
  title!: string;

  @Input()
  buttonTitle!: string;

  @Input()
  link!: string;
}
