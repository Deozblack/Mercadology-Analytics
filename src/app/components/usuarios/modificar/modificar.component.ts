import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroModel } from 'src/app/models/registro.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  registro: RegistroModel; //Este es para modificar cuando ya tengo los usuarios
  idToken: string;

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
                private router: Router) { 
                  this.idToken = localStorage.getItem('token')
                  console.log(this.idToken);
                }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

      this.auth.getUsuario( id )
        .subscribe( (resp: RegistroModel) => {
          this.registro = resp;
          console.log(resp);
          
          this.registro.id = id;
        } )
  }

  modificarSubmit( form: NgForm){

    if( form.invalid ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    //No se puede actualizar el nombre de usuario en el Auth porque necesto el idToken del usuario y no se tiene el idToken desde otro usuario
    //this.auth.modificarUsuarioAuth(this.idToken, this.registro).subscribe();
    this.auth.actualizarUsuario(this.registro ).subscribe( resp => {

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
  }//Termina el submit  


}
