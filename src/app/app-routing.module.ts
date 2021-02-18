import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
<<<<<<< HEAD
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'cuentas', component: CuentasComponent,canActivate: [AuthGuard]},
=======
import { GeneradorReportesComponent } from './components/generador-reportes/generador-reportes.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'cuentas', component: CuentasComponent},
  {path: 'generadorReportes', component: GeneradorReportesComponent},
>>>>>>> bc8ac3a76d18cb435214c937f16149df135431a7
  {path: '**' , redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
