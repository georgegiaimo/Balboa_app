import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionAdminProductionDetailsComponent } from './production-admin-production-details/production-admin-production-details.component';
import { authGuard } from '../auth.guards';
import { ProductionAdminUsersComponent } from './production-admin-users/production-admin-users.component';
import { ProductionAdminActivityComponent } from './production-admin-activity/production-admin-activity.component';
import { ProductionAdminEditUserComponent } from './production-admin-edit-user/production-admin-edit-user.component';
import { ProductionAdminMailingComponent } from './production-admin-mailing/production-admin-mailing.component';

const routes: Routes = [
  {path: 'production-details', component: ProductionAdminProductionDetailsComponent, canActivate: [authGuard]},
  {path: 'users', component: ProductionAdminUsersComponent, canActivate: [authGuard]},
  {path: 'activity', component: ProductionAdminActivityComponent, canActivate: [authGuard]},
  {path: 'edit-user/:user_id', component: ProductionAdminEditUserComponent, canActivate: [authGuard]},
  {path: 'mailing', component: ProductionAdminMailingComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionAdminRoutingModule { }

export const routingComponents = [
  ProductionAdminProductionDetailsComponent,
  ProductionAdminUsersComponent,
  ProductionAdminActivityComponent,
  ProductionAdminEditUserComponent,
  ProductionAdminMailingComponent
]
