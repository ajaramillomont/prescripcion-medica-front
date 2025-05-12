import { Routes } from '@angular/router';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent},

  { path: 'register', component: RegisterComponent},

  { path: 'recover-password', component: RecoverPasswordComponent },

  { path: 'reset-password', component: ResetPasswordComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'patients', component: PatientsComponent},

  { path: 'about-s', component: AboutUsComponent},

  { path: '**', redirectTo: '' }
];
