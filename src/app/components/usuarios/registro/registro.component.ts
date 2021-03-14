import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegistroModel } from 'src/app/models/registro.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: RegistroModel; //Registrar
  paso = false;
  idLocal;
  idTok

  constructor( private authS: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.registro = new RegistroModel();
  }

  registrarSubmit( form: NgForm){

    if( form.invalid ){ return; }

    this.paso = true;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authS.registrarUsuario(this.registro ).subscribe( resp => {

      this.idLocal = resp['localId'];
      this.idTok = resp['idToken'];
//      console.log('localID: ' + this.idLocal);
//      console.log('IdToken:' + this.idTok);
      
      if(this.paso == true){
        console.log('Entro');
        this.authS.registrarDatosUsuario(this.registro, this.idLocal).subscribe( resp => {

          Swal.fire(
            'Registrado!',
            'Bienvenido a Mercadology!',
            'success'
          )
          this.paso = false;
          this.router.navigateByUrl('/usuarios');
          
          },  ( err ) =>{
            console.log( err.error.error.message );
    
            Swal.fire({
              icon: 'error',
              title:'Error al registrarse',
              text:err.error.error.message
            });
            
          }
          );

      }

//      console.log(resp);
      },  ( err ) =>{
        console.log( err.error.error.message );

        Swal.fire({
          icon: 'error',
          title:'Error al registrarse',
          text:err.error.error.message
  
        });
        
      }
      );

  }

}