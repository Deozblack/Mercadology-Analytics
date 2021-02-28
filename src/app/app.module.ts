import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GeneradorReportesComponent } from './components/generador-reportes/generador-reportes.component';
import { RegistroComponent } from './components/usuarios/registro/registro.component';
import { ModificarComponent } from './components/usuarios/modificar/modificar.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HomeComponent } from './components/home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    CuentasComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    GeneradorReportesComponent,
    RegistroComponent,
    UsuariosComponent,
    ModificarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
