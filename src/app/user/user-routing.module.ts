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
import { HealthComponent } from './health/health.component';
import { DuplicatesByNameComponent } from './duplicates-by-name/duplicates-by-name.component';
import { DuplicatesByEmailComponent } from './duplicates-by-email/duplicates-by-email.component';
import { UnassignedUsersComponent } from './unassigned-users/unassigned-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { SimilarByEmailComponent } from './similar-by-email/similar-by-email.component';
import { SimilarByNameComponent } from './similar-by-name/similar-by-name.component';
import { authGuard } from '../auth.guards';
import { ApproachingOneYearMarkComponent } from './approaching-one-year-mark/approaching-one-year-mark.component';
import { EditUserAssignmentComponent } from './edit-user-assignment/edit-user-assignment.component';
import { EditProductionAssignmentComponent } from './edit-production-assignment/edit-production-assignment.component';
import { ActivityComponent } from './activity/activity.component';


const routes: Routes = [
    {path: 'account', component: AccountComponent, canActivate: [authGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'productions', component: ProductionsComponent, canActivate: [authGuard]},
    {path: 'production-details/:production_id', component: ProductionDetailsComponent, canActivate: [authGuard]},
    {path: 'user-details/:user_id', component: UserDetailsComponent, canActivate: [authGuard]},
    {path: 'domain-details/:domain', component: DomainDetailsComponent, canActivate: [authGuard]},
    {path: 'users', component: UsersComponent, canActivate: [authGuard]},
    {path: 'domains', component: DomainsComponent, canActivate: [authGuard]},
    {path: 'health', component: HealthComponent, canActivate: [authGuard]},
    {path: 'activity', component: ActivityComponent, canActivate: [authGuard]},
    {path: 'duplicates-by-name', component: DuplicatesByNameComponent, canActivate: [authGuard]},
    {path: 'duplicates-by-email', component: DuplicatesByEmailComponent, canActivate: [authGuard]},
    {path: 'unassigned-users', component: UnassignedUsersComponent, canActivate: [authGuard]},
    {path: 'inactive-users', component: InactiveUsersComponent, canActivate: [authGuard]},
    {path: 'similar-by-email', component: SimilarByEmailComponent, canActivate: [authGuard]},
    {path: 'similar-by-name', component: SimilarByNameComponent, canActivate: [authGuard]},
    {path: 'approaching-one-year', component: ApproachingOneYearMarkComponent, canActivate: [authGuard]},
    {path: 'edit-user/:user_id', component: EditUserComponent, canActivate: [authGuard]},
    {path: 'edit-production/:production_id', component: EditProductionComponent, canActivate: [authGuard]},

    {path: 'edit-user-assignment/:production_assignment_id', component: EditUserAssignmentComponent, canActivate: [authGuard]},
    {path: 'edit-production-assignment/:production_assignment_id', component: EditProductionAssignmentComponent, canActivate: [authGuard]},
    
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
    EditProductionComponent,
    HealthComponent,
    ActivityComponent,
    DuplicatesByEmailComponent,
    DuplicatesByNameComponent,
    UnassignedUsersComponent,
    InactiveUsersComponent,
    SimilarByEmailComponent,
    SimilarByNameComponent,
    ApproachingOneYearMarkComponent
]