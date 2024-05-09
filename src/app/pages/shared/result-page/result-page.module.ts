import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AntModule } from "src/app/ant/ant.module";
import { ResultPageComponent } from "./result-page.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [ResultPageComponent],
  imports: [CommonModule, AntModule, AppRoutingModule],
  exports: [ResultPageComponent],
})
export class ResultPageModule {}
