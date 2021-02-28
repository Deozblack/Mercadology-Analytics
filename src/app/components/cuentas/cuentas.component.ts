import { RegistroModel } from 'src/app/models/registro.model';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
})
export class CuentasComponent implements OnInit {

public tokenUsu: string;

  constructor( public auth: AuthService) { }

  usuario: RegistroModel = {
    id: '',
    nombre: '',
    apellido: '',
    correo: ''
  }

  ngOnInit(): void {
  
    this.tokenUsu = localStorage.getItem('email');
    console.log(this.tokenUsu);

  }

  

}
