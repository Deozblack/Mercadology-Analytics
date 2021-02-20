import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../services/auth.service';
import{ClienteModel}from "../../models/cliente.model";
import  Swal  from 'sweetalert2'; 

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  Cliente: ClienteModel[] = [];
  cargando = false;





  constructor( private AuthService: AuthService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.AuthService.getCliente()
      .subscribe( resp => { 
        this.Cliente = resp;
        this.cargando = false;

      });
  }
  borrarClient( cliente: ClienteModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ cliente.nomcli }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.Cliente.splice(i, 1);
        this.AuthService.DeleteClient( cliente.ids ).subscribe();

      }

    });
       

  }
}
