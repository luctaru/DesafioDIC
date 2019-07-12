import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragdropComponent } from './components/dragdrop/dragdrop.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './authorization/auth.guard';
import { UsertableComponent } from './components/usertable/usertable.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'kanban', component: DragdropComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsertableComponent, canActivate: [AuthGuard] },
  { path: 'details', component: UserdetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
