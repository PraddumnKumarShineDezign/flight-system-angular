import { Routes } from '@angular/router';
import { LoginComponent } from './modules/onboarding/login/login.component';
import { ForgotPasswordComponent } from './modules/onboarding/forgotPassword/forgotPassword.component';
import { AuthGuard } from './guards/auth.guard';

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
    {
        path: 'flight',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/flights/flights.router').then(m => m.routes)
    }
];


