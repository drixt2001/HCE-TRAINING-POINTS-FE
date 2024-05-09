import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AntModule } from "src/app/ant/ant.module";
import { Page404Component } from "./page404.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [Page404Component],
  imports: [CommonModule, AntModule, AppRoutingModule],
  exports: [Page404Component],
})
export class Page404Module {}
