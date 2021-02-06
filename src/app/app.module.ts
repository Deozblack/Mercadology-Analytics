import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { CuentasService} from './servicio.service';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DialogoComponent } from './components/dialogo/dialogo.component';
import { ListasComponent } from './components/listas/listas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    CuentasComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    DialogoComponent,
    ListasComponent
  ],
  imports: [
    HttpModule,
    //HttpClient,
    //HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [CuentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
