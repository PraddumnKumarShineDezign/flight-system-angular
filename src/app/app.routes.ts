import { Routes } from '@angular/router';
import { LoginComponent } from './modules/onboarding/login/login.component';
import { ForgotPasswordComponent } from './modules/onboarding/forgotPassword/forgotPassword.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    // {
    //     path: '',
    //     loadChildren: () => import('./modules/user/user.router').then(m => m.routes)
    // }
];
