import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveAdminProductionDetailsComponent } from './executive-admin-production-details/executive-admin-production-details.component';
import { authGuard } from '../auth.guards';
import { ExecutiveAdminUsersComponent } from './executive-admin-users/executive-admin-users.component';
import { ExecutiveAdminActivityComponent } from './executive-admin-activity/executive-admin-activity.component';
import { ExecutiveAdminEditUserComponent } from './executive-admin-edit-user/executive-admin-edit-user.component';
import { ExecutiveAdminMailingComponent } from './executive-admin-mailing/executive-admin-mailing.component';
import { ExecutiveAdminProductionsComponent } from './executive-admin-productions/executive-admin-productions.component';

const routes: Routes = [
   {path: 'production-details/:production_id', component: ExecutiveAdminProductionDetailsComponent, canActivate: [authGuard]},
    {path: 'users', component: ExecutiveAdminUsersComponent, canActivate: [authGuard]},
    {path: 'activity', component: ExecutiveAdminActivityComponent, canActivate: [authGuard]},
    {path: 'edit-user/:user_id', component: ExecutiveAdminEditUserComponent, canActivate: [authGuard]},
    {path: 'mailing', component: ExecutiveAdminMailingComponent, canActivate: [authGuard]},
    {path: 'productions', component: ExecutiveAdminProductionsComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutiveAdminRoutingModule { }

export const routingComponents = [
  ExecutiveAdminProductionDetailsComponent,
  ExecutiveAdminUsersComponent,
  ExecutiveAdminActivityComponent,
  ExecutiveAdminEditUserComponent,
  ExecutiveAdminMailingComponent,
  ExecutiveAdminProductionsComponent
]
