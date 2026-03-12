import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'u', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    {path: 'a', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
];
