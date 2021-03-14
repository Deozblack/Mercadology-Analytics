import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroModel } from 'src/app/models/registro.model';
import { FormControl, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
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

  imageForm: FormGroup

  file: any;

  nombreImg: any;
  altMediaImg: any;
  constructor(public authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) { }

  usuario: RegistroModel = {
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    urlPhoto: "../../../assets/imagenes/imagenPerfil/avatar.jpg"
  }

  registro: RegistroModel;

  ngOnInit(): void {
    
    this.imageForm = new FormGroup({
      file: new FormControl(null, Validators.required)
    })

      this.authService.getUsuario( this.id )
        .subscribe( (resp: RegistroModel) => {
          this.registro = resp;
          this.registro.id = this.id;
          if(resp.urlPhoto){
            this.usuario.urlPhoto = resp.urlPhoto;
          }
          console.log(this.usuario.urlPhoto);
        } );

    this.usuario.nombre = localStorage.getItem('name');
//    this.usuarioA.correo = localStorage.getItem('email');
    this.usuario.id = localStorage.getItem('idUsuario');
  }

  verificarCorreo(){
    this.authService.verificarCorreoAuth(this.idToken).subscribe();
  }

  onfileChange(event){
    console.log('entro');
    console.log('img: ', event);
    
    
    if(event.target.files && event.target.files.length > 0 ){
      console.log('entro al if');
      const file = event.target.files[0];
      if(file.type.includes("image")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function load(){
          this.usuario.urlPhoto = reader.result;
        }.bind(this);

        this.file = file;

        }else{
          console.log('Hay un error');
        }
      }else{
        console.log('No entro' + event.target.files + event.target.files.lenght);
      }
    }

    
    onSubmit(){
      let imagenNueva;
      const form = this.imageForm;
      if(form.valid){
        this.authService.uploadImage(this.file)
        .subscribe(data =>{
          imagenNueva = data;
          this.imageForm = new FormGroup({
            file: new FormControl(null),
          })
          console.log(imagenNueva);
          let urlImagen = imagenNueva.contentDisposition;
          let longitudUrl = urlImagen.length;
//          console.log(longitudUrl);
          
          const url = urlImagen.slice(25, longitudUrl);
          
          this.nombreImg = url;
//          console.log('Nombre imagen::.. ' + this.nombreImg);
          
          this.altMediaImg = imagenNueva.downloadTokens;

          const urlFirebase = this.authService.urlStorage + '/o/photosProfile%2F' + this.nombreImg + '?alt=media&token=' + this.altMediaImg;
          this.registro.urlPhoto = urlFirebase;
          this.authService.actualizarUsuario(this.registro).subscribe();
        })
      }
    }

  actualizarSubmit( form: NgForm){
    
    if( form.invalid ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    //Este se modifica su displayName el primero porque tiene el idToken de el mismo
    this.authService.modificarUsuarioAuth(this.idToken, this.registro).subscribe();
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
