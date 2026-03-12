import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminsComponent } from './admins/admins.component';

const routes: Routes = [
  {path: 'admins', component: AdminsComponent},  
  {path: 'edit-admin/:admin_id', component: EditAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routingComponents = [
    AdminsComponent,
    EditAdminComponent
]