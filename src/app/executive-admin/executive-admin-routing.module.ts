import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutiveAdminProductionDetailsComponent } from './executive-admin-production-details/executive-admin-production-details.component';
import { authGuard } from '../auth.guards';
import { ExecutiveAdminUsersComponent } from './executive-admin-users/executive-admin-users.component';
import { ExecutiveAdminActivityComponent } from './executive-admin-activity/executive-admin-activity.component';
import { ExecutiveAdminEditUserComponent } from './executive-admin-edit-user/executive-admin-edit-user.component';
import { ExecutiveAdminMailingComponent } from './executive-admin-mailing/executive-admin-mailing.component';
import { ExecutiveAdminProductionsComponent } from './executive-admin-productions/executive-admin-productions.component';
import { ExecutiveAdminComposeMessageComponent } from './executive-admin-compose-message/executive-admin-compose-message.component';
import { ExecutiveAdminEditMessagingGroupComponent } from './executive-admin-edit-messaging-group/executive-admin-edit-messaging-group.component';
import { ExecutiveAdminMessageDetailsComponent } from './executive-admin-message-details/executive-admin-message-details.component';
import { ExecutiveAdminMessagingComponent } from './executive-admin-messaging/executive-admin-messaging.component';
import { ExecutiveAdminMessagingGroupsComponent } from './executive-admin-messaging-groups/executive-admin-messaging-groups.component';

const routes: Routes = [
  { path: 'production-details/:production_id', component: ExecutiveAdminProductionDetailsComponent, canActivate: [authGuard] },
  { path: 'users', component: ExecutiveAdminUsersComponent, canActivate: [authGuard] },
  { path: 'activity', component: ExecutiveAdminActivityComponent, canActivate: [authGuard] },
  { path: 'edit-user/:user_id', component: ExecutiveAdminEditUserComponent, canActivate: [authGuard] },
  { path: 'mailing', component: ExecutiveAdminMailingComponent, canActivate: [authGuard] },
  { path: 'productions', component: ExecutiveAdminProductionsComponent, canActivate: [authGuard] },
  { path: 'compose-message', component: ExecutiveAdminComposeMessageComponent, canActivate: [authGuard] },
  { path: 'message-details/:composed_message_id', component: ExecutiveAdminMessageDetailsComponent, canActivate: [authGuard] },
  { path: 'edit-group/:group_id', component: ExecutiveAdminEditMessagingGroupComponent, canActivate: [authGuard] },
  { path: 'messages', component: ExecutiveAdminMessagingComponent, canActivate: [authGuard] },
  { path: 'messaging-groups', component: ExecutiveAdminMessagingGroupsComponent, canActivate: [authGuard] },
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
  ExecutiveAdminProductionsComponent,
  ExecutiveAdminComposeMessageComponent,
  ExecutiveAdminMessageDetailsComponent,
  ExecutiveAdminEditMessagingGroupComponent,
  ExecutiveAdminMessagingComponent,
  ExecutiveAdminMessagingGroupsComponent
]
