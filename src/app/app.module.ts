import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { CuentasService} from './servicio.service';

import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/lista/lista.component';
import { DialogoComponent } from './components/dialogo/dialogo.component';

@NgModule({
  declarations: [
    AppComponent,
    CuentasComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    ListaComponent,
    DialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [CuentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
