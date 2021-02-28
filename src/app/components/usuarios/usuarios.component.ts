import  Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RegistroModel } from 'src/app/models/registro.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: RegistroModel[] = [];


  constructor( private usuarioService: AuthService,
                private route: ActivatedRoute){ }

  ngOnInit(): void {

    this.usuarioService.getUsuarios()
    .subscribe( resp =>this.usuarios = resp );
  }

  eliminarUsuario( usuario: RegistroModel, i: number){
    
    Swal.fire({
      title: '¿Esta seguro?',
      text: `¿Esta seguro que desea borrar a ${usuario.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if( resp.value ){
        this.usuarios.splice(i,1);
        this.usuarioService.eliminarUsuario( usuario.id ).subscribe();
      }

    })
    
  }

}
