import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'password-reset/:token', component: PasswordResetComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'u', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    {path: 'a', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
];
