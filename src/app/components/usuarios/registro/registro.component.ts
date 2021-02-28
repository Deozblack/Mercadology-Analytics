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
//  router: any;

  constructor( private auth: AuthService,
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


    this.auth.registrarUsuario(this.registro ).subscribe( resp => {

/*      Swal.close();
      Swal.fire(
        'Registrado!',
        'Bienvenido a Mercadology!',
        'success'
      )*/
      //this.router.navigateByUrl('/registroDatos');

      if(this.paso == true){
        console.log('Entro');
        this.auth.registrarDatosUsuario(this.registro ).subscribe( resp => {

          Swal.close();
          Swal.fire(
            'Registrado!',
            'Bienvenido a Mercadology!',
            'success'
          )
          this.paso = false;
          this.router.navigateByUrl('/usuarios');
          console.log(resp);
          console.log("Despues del resp");
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


      console.log(resp);
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

/**
 this.auth.registrarDatosUsuario(this.registro ).subscribe( resp => {

          Swal.close();
          Swal.fire(
            'Registrado!',
            'Bienvenido a Mercadologyyyyy!',
            'success'
          )
          this.paso = false;
          this.router.navigateByUrl('/home');
          console.log(resp);
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

**/