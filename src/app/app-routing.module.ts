import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { ListAllFormComponent } from "./pages/admin/list-all-form/list-all-form.component";
import { ListNotifiactionsComponent } from "./pages/admin/list-notifiactions/list-notifiactions.component";
import { ListPeriodsComponent } from "./pages/admin/list-periods/list-periods.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { NotificationsComponent } from "./pages/public/notifications/notifications.component";
import { NewformComponent } from "./pages/student/points/newform/newform.component";
import { ViewformComponent } from "./pages/admin/viewform/viewform.component";
import { Page404Component } from "./pages/shared/page404/page404.component";
import { ListAccountsComponent } from "./pages/admin/list-accounts/list-accounts.component";
import { AccountInfoComponent } from "./pages/shared/account-info/account-info.component";
import {
  AdminGuard,
  ChildGuard,
  StudentGuard,
} from "./guard/admin/admin.guard";
import { ListResultComponent } from "./pages/admin/list-result/list-result.component";
import { ListClassFormComponent } from "./pages/teacher/list-class-form/list-class-form.component";
import { ListResultClassComponent } from "./pages/teacher/list-result/list-result.component";
import { ResultComponent } from "./pages/student/points/result/result.component";
import { ReportComponent } from "./pages/admin/report/report.component";

const routes: Routes = [
  {
    path: "home",
    component: NotificationsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [],
  },
  {
    path: "noti",
    component: NotificationsComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [ChildGuard],
    children: [
      { path: "account", component: ListAccountsComponent },
      { path: "notification", component: ListNotifiactionsComponent },
      { path: "listform", component: ListAllFormComponent },
      { path: "listform/:period_id", component: ListAllFormComponent },
      { path: "periods", component: ListPeriodsComponent },
      { path: "form/:id", component: ViewformComponent },
      { path: "result", component: ListResultComponent },
      { path: "report", component: ReportComponent },
    ],
  },
  {
    path: "teacher",
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [ChildGuard],
    children: [
      { path: "listform", component: ListClassFormComponent },
      { path: "form/:id", component: ViewformComponent },
      { path: "result", component: ListResultClassComponent },
    ],
  },
  {
    path: "leader",
    component: AdminComponent,
    canActivate: [AdminGuard],
    canActivateChild: [ChildGuard],
    children: [
      { path: "listform", component: ListClassFormComponent },
      { path: "form/:id", component: ViewformComponent },
      { path: "result", component: ListResultClassComponent },
    ],
  },
  {
    path: "student",
    canActivate: [StudentGuard],
    canActivateChild: [ChildGuard],
    children: [
      { path: "newform", component: NewformComponent },
      { path: "listform", component: ListClassFormComponent },
      { path: "form/:id", component: ViewformComponent },
      { path: "result", component: ResultComponent },
    ],
  },
  { path: "login", component: LoginComponent },
  {
    path: "account",
    component: AccountInfoComponent,
    canActivate: [AdminGuard],
    canActivateChild: [ChildGuard],
    children: [
      { path: "info", component: AccountInfoComponent },
      { path: "changepass", component: AccountInfoComponent },
    ],
  },
  { path: "", redirectTo: "/noti", pathMatch: "full" },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
