import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListGroupCriteriaComponent } from "./list-group-criteria/list-group-criteria.component";
import { AdminComponent } from "./admin.component";
import { AntModule } from "src/app/ant/ant.module";
import { ListNotifiactionsComponent } from "./list-notifiactions/list-notifiactions.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListPeriodsComponent } from "./list-periods/list-periods.component";
import { ListAllFormComponent } from "./list-all-form/list-all-form.component";
import { ListCriteriaComponent } from "./list-criteria/list-criteria.component";
import { ListStudentsComponent } from "./list-students/list-students.component";
import { ListStatusComponent } from "./list-status/list-status.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ListAccountsComponent } from "./list-accounts/list-accounts.component";
import { ListResultComponent } from './list-result/list-result.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    ListNotifiactionsComponent,
    ListPeriodsComponent,
    ListAllFormComponent,
    ListCriteriaComponent,
    ListStudentsComponent,
    ListStatusComponent,
    ListAccountsComponent,
    ListResultComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AntModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class AdminModule {}
