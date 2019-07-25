import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickadoveComponent } from './pickadove/pickadove.component';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { ConnectComponent } from './connect/connect.component';
import { VerificationComponent } from './verification/verification.component';
import { 
  AuthGuardService as AuthGuard 
} from './service/auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {path: '', component: PickadoveComponent, canActivate: [AuthGuard] },
  {path: 'sign', component: ConnectComponent},
  {path: 'verification', component: VerificationComponent, canActivate: [AuthGuard]},
  {path: 'admin',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './admin/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  { path: 'reset/:id', component: ChangePasswordComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
