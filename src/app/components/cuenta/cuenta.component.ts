import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteModel } from '../../models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import  Swal  from 'sweetalert2'; 
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  cliente: ClienteModel = new ClienteModel;

  constructor( private AuthService: AuthService, 
                private route: ActivatedRoute  ) { }

  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('ids');

    if ( id !== 'add' ) {

      this.AuthService.getClient( id )
        .subscribe( (resp: ClienteModel) => {
          this.cliente = resp;
          this.cliente.ids = id;
        });

    }

  }
  
  guardar(form: NgForm){
    
    if( form.invalid){
      console.log("es invalido el fomulario");
      return;
    }
    
    Swal.fire({
      title:'Espere',
      text:'Guardando informacion',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion: Observable<any>;


    if ( this.cliente.ids ) {
      peticion = this.AuthService.UpdatCliente( this.cliente);
       

    }else{
      peticion = this.AuthService.saveCuenta(this.cliente);
      
    }
    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.nomcli,
        text: 'Se actualizó correctamente',
      });

    });
  }

}
