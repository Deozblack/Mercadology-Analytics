import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { GeneradorReportesComponent } from './components/generador-reportes/generador-reportes.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { ModificarComponent } from './components/usuarios/modificar/modificar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'cuentas', component: CuentasComponent,canActivate: [AuthGuard]},
  {path: 'generadorReportes', component: GeneradorReportesComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [AuthGuard]},
  {path: 'modificar/:id', component: ModificarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent, canActivate: [AuthGuard]},
  {path: '**' , redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
