import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionAdminProductionDetailsComponent } from './production-admin-production-details/production-admin-production-details.component';
import { authGuard } from '../auth.guards';
import { ProductionAdminUsersComponent } from './production-admin-users/production-admin-users.component';
import { ProductionAdminActivityComponent } from './production-admin-activity/production-admin-activity.component';
import { ProductionAdminEditUserComponent } from './production-admin-edit-user/production-admin-edit-user.component';
import { ProductionAdminMailingComponent } from './production-admin-mailing/production-admin-mailing.component';
import { ProductionAdminMessagingComponent } from './production-admin-messaging/production-admin-messaging.component';
import { ProductionAdminComposeMessageComponent } from './production-admin-compose-message/production-admin-compose-message.component';
import { ProductionAdminEditMessagingGroupComponent } from './production-admin-edit-messaging-group/production-admin-edit-messaging-group.component';
import { ProductionAdminMessagingGroupsComponent } from './production-admin-messaging-groups/production-admin-messaging-groups.component';
import { ProductionAdminMessageDetailsComponent } from './production-admin-message-details/production-admin-message-details.component';

const routes: Routes = [
  {path: 'production-details', component: ProductionAdminProductionDetailsComponent, canActivate: [authGuard]},
  {path: 'users', component: ProductionAdminUsersComponent, canActivate: [authGuard]},
  {path: 'messages', component: ProductionAdminMessagingComponent, canActivate: [authGuard]},
  {path: 'activity', component: ProductionAdminActivityComponent, canActivate: [authGuard]},
  {path: 'edit-user/:user_id', component: ProductionAdminEditUserComponent, canActivate: [authGuard]},
  {path: 'compose-message', component: ProductionAdminComposeMessageComponent, canActivate: [authGuard]},
  {path: 'message-details/:composed_message_id', component: ProductionAdminMessageDetailsComponent, canActivate: [authGuard]},
  {path: 'edit-group/:group_id', component: ProductionAdminEditMessagingGroupComponent, canActivate: [authGuard]},
  {path: 'mailing', component: ProductionAdminMailingComponent, canActivate: [authGuard]},
  {path: 'messaging-groups', component: ProductionAdminMessagingGroupsComponent, canActivate: [authGuard]},
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
  ProductionAdminMailingComponent,
  ProductionAdminMessagingComponent,
  ProductionAdminComposeMessageComponent,
  ProductionAdminEditMessagingGroupComponent,
  ProductionAdminMessagingGroupsComponent,
  ProductionAdminMessageDetailsComponent
]
