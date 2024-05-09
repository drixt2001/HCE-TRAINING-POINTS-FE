import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { AuthComponent } from "./pages/auth/auth.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { MaterialModule } from "./pages/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NzI18nService, NZ_DATE_LOCALE, NZ_I18N } from "ng-zorro-antd/i18n";
import { vi_VN } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import vi from "@angular/common/locales/vi";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AntModule } from "./ant/ant.module";
import { NotificationsComponent } from "./pages/public/notifications/notifications.component";
import { AdminModule } from "./pages/admin/admin.module";
import { AdminComponent } from "./pages/admin/admin.component";
import { ToastService } from "./services/toast/toast.service";
import { NewformComponent } from "./pages/student/points/newform/newform.component";
import { LoadingInterceptor } from "./interceptor/loading/loading.interceptor";
import { LoadingComponent } from "./pages/shared/loading/loading.component";
import { ResultPageModule } from "./pages/shared/result-page/result-page.module";
import { vi as vn } from "date-fns/locale";
import { ViewformComponent } from "./pages/admin/viewform/viewform.component";
import { Page404Module } from "./pages/shared/page404/page404.module";
import { ApiInterceptor } from "./interceptor/api/api.interceptor";
import { AccountInfoComponent } from "./pages/shared/account-info/account-info.component";
import { ListClassFormComponent } from "./pages/teacher/list-class-form/list-class-form.component";
import { ListResultClassComponent } from "./pages/teacher/list-result/list-result.component";
import { ResultComponent } from './pages/student/points/result/result.component';
registerLocaleData(vi);
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    NotificationsComponent,
    AdminComponent,
    NewformComponent,
    ViewformComponent,
    LoadingComponent,
    AccountInfoComponent,
    ListClassFormComponent,
    ListResultClassComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AntModule,
    AdminModule,
    ResultPageModule,
    Page404Module,
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: NZ_DATE_LOCALE, useValue: vn },
    ToastService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private i18n: NzI18nService) {}

  switchLanguage() {
    this.i18n.setDateLocale(vn); // Switch language to Japanese at runtime
  }
}
