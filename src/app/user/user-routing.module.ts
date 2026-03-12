import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductionsComponent } from './productions/productions.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { DomainsComponent } from './domains/domains.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditProductionComponent } from './edit-production/edit-production.component';


const routes: Routes = [
    {path: 'account', component: AccountComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'productions', component: ProductionsComponent},
    {path: 'production-details/:production_id', component: ProductionDetailsComponent},
    {path: 'user-details/:user_id', component: UserDetailsComponent},
    {path: 'domain-details/:domain', component: DomainDetailsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'domains', component: DomainsComponent},
    {path: 'edit-user/:user_id', component: EditUserComponent},
    {path: 'edit-production/:production_id', component: EditProductionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const routingComponents = [
    AccountComponent,
    DashboardComponent,
    ProductionsComponent,
    ProductionDetailsComponent,
    UserDetailsComponent,
    UsersComponent,
    DomainDetailsComponent,
    DomainsComponent,
    EditUserComponent,
    EditProductionComponent
]