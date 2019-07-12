import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatStepperModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatTabsModule
} from '@angular/material';
import {
  ViewportRuler,
  ScrollDispatcher,
  ScrollDispatchModule,
  VIEWPORT_RULER_PROVIDER,
} from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './authorization/token.interceptor';
import { AuthGuard } from './authorization/auth.guard';
import { AuthService } from './authorization/auth.service';

import { SettingsbuttonComponent } from './components/dragdrop/settingsbutton/settingsbutton.component';
import { DicdialogComponent } from './components/dragdrop/dicdialog/dicdialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { AdddicdialogComponent } from './components/dragdrop/adddicdialog/adddicdialog.component';
import { OperationdialogComponent } from './components/operationdialog/operationdialog.component';
import { LoginComponent } from './components/login/login.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { AdduserdialogComponent } from './components/usertable/adduserdialog/adduserdialog.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormdepartmentdialogComponent } from './components/formdepartmentdialog/formdepartmentdialog.component';
import { FormprocessdialogComponent } from './components/formprocessdialog/formprocessdialog.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PeriodtableComponent } from './components/periodtable/periodtable.component';
import { FormperioddialogComponent } from './components/periodtable/formperioddialog/formperioddialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DragdropComponent,
    SettingsbuttonComponent,
    DicdialogComponent,
    ConfirmdialogComponent,
    AdddicdialogComponent,
    OperationdialogComponent,
    LoginComponent,
    UsertableComponent,
    AdduserdialogComponent,
    UserdetailsComponent,
    DashboardComponent,
    FormdepartmentdialogComponent,
    FormprocessdialogComponent,
    SettingsComponent,
    PeriodtableComponent,
    FormperioddialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    MatMenuModule,
    ScrollDispatchModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTabsModule,
    GoogleChartsModule.forRoot()
  ],
  entryComponents: [
    DicdialogComponent,
    ConfirmdialogComponent,
    AdddicdialogComponent,
    OperationdialogComponent,
    AdduserdialogComponent,
    FormdepartmentdialogComponent,
    FormprocessdialogComponent,
    FormperioddialogComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    VIEWPORT_RULER_PROVIDER,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
