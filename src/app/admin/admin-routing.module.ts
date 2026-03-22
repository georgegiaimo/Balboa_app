import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminsComponent } from './admins/admins.component';
import { CoordinatorsComponent } from './coordinators/coordinators.component';
import { EditCoordinatorComponent } from './edit-coordinator/edit-coordinator.component';
import { CoordinatorDetailsComponent } from './coordinator-details/coordinator-details.component';
import { authGuard } from '../auth.guards';
import { EditCoordinatorAssignmentComponent } from './edit-coordinator-assignment/edit-coordinator-assignment.component';

const routes: Routes = [
  {path: 'admins', component: AdminsComponent, canActivate: [authGuard]},  
  {path: 'edit-admin/:admin_id', component: EditAdminComponent, canActivate: [authGuard]},
  {path: 'coordinators', component: CoordinatorsComponent, canActivate: [authGuard]},
  {path: 'coordinator-details/:coordinator_id', component: CoordinatorDetailsComponent, canActivate: [authGuard]},   
  {path: 'edit-coordinator/:coordinator_id', component: EditCoordinatorComponent, canActivate: [authGuard]},
  {path: 'edit-coordinator-assignment/:key', component: EditCoordinatorAssignmentComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routingComponents = [
    AdminsComponent,
    EditAdminComponent,
    CoordinatorsComponent,
    EditCoordinatorComponent,
    CoordinatorDetailsComponent,
    EditCoordinatorAssignmentComponent
]