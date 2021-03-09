import { RegistroModel } from 'src/app/models/registro.model';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit(): void {


    
  }

  

}
