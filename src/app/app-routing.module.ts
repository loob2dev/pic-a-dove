import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickadoveComponent } from './pickadove/pickadove.component';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { ConnectComponent } from './connect/connect.component';
import { VerificationComponent } from './verification/verification.component';
import { 
  AuthGuardUserService as AuthUserGuard
} from './service/auth-guard-user.service';
import {
  AuthGuardAdminService as AuthAdminCuard
} from './service/auth-guard-admin.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {path: '', component: PickadoveComponent, canActivate: [AuthUserGuard] },
  {path: 'sign', component: ConnectComponent},
  {path: 'verification', component: VerificationComponent, canActivate: [AuthUserGuard]},
  {path: 'admin',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './admin/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }],
  canActivate: [AuthAdminCuard]},
  { path: 'reset/:id', component: ChangePasswordComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
