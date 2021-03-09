import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroModel } from 'src/app/models/registro.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  idToken = localStorage.getItem('token');
  id = localStorage.getItem('idUsuario');
  //usuarios: RegistroModel[] = [];
  usuari: Object;

  constructor(public authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) { }

   usuario: RegistroModel = {
    id: '',
    nombre: '',
    apellido: '',
    correo: ''
  };
  usuarioA: RegistroModel = {
    id: '',
    nombre: '',
    apellido: '',
    correo: ''
  }

  registro: RegistroModel;

  ngOnInit(): void {
      this.authService.getUsuario( this.id )
        .subscribe( (resp: RegistroModel) => {
          this.registro = resp;
          this.registro.id = this.id;
          //console.log(resp);
          //console.log(this.registro);
        } );

    this.usuarioA.nombre = localStorage.getItem('name');
//    this.usuarioA.correo = localStorage.getItem('email');
    this.usuario.id = localStorage.getItem('idUsuario');
  }

  verificarCorreo(){
    this.authService.verificarCorreoAuth(this.idToken).subscribe();
  }

  actualizarSubmit( form: NgForm){

    console.log(this.registro);
    
    if( form.invalid ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.actualizarUsuario(this.registro).subscribe( resp => {

      Swal.close();
      Swal.fire(
        'Actualizado!',
        'Datos correctamente actualizados!',
        'success'
      )
      this.router.navigateByUrl('/home');
      },  ( err ) =>{
        console.log( err.error.error.message );
        Swal.fire({
          icon: 'error',
          title:'Error al actualizar datos',
          text:err.error.error.message
        });        
      }
      );  
  }//Termina el submit*/


}
