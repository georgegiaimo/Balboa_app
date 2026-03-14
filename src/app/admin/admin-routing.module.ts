import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminsComponent } from './admins/admins.component';
import { CoordinatorsComponent } from './coordinators/coordinators.component';
import { EditCoordinatorComponent } from './edit-coordinator/edit-coordinator.component';
import { CoordinatorDetailsComponent } from './coordinator-details/coordinator-details.component';

const routes: Routes = [
  {path: 'admins', component: AdminsComponent},  
  {path: 'edit-admin/:admin_id', component: EditAdminComponent},
  {path: 'coordinators', component: CoordinatorsComponent},
  {path: 'coordinator-details/:coordinator_id', component: CoordinatorDetailsComponent},   
  {path: 'edit-coordinator/:coordinator_id', component: EditCoordinatorComponent},
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
    CoordinatorDetailsComponent
]