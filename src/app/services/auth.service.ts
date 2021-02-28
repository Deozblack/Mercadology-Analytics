import { UsuarioModel } from './../models/usuario.model';
import { RegistroModel } from './../models/registro.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apikey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk';
  private userToken: string;
 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk
  
  private apiKey2 = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;
  //Crear usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  private urlDatos = 'https://mercadology-analytics-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {
  //  localStorage.getItem('token');
    this.leerToken();
  }


  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  Login(usuario: UsuarioModel){
    
    const authData = {
      email: usuario.correo,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apikey}`,
      authData
    ).pipe(map(resp =>{
      console.log('Entro al mapa RXJS');
      this.guardarToken(resp);
      return resp;
    })
    );
  }

  private guardarToken(idToken: object){
    this.userToken = idToken['idToken'];
    localStorage.setItem('token', idToken['idToken']);
    localStorage.setItem('email', idToken['email']);
    console.log(idToken);
  }

  leerToken (){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado():boolean{
    return this.userToken.length > 2;
  }
  
/**Registrar al usuario en Auth **/
  registrarUsuario( usuario: RegistroModel){

    const authData = {
      email: usuario.correo,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apiKey2}`, 
      authData
    ).pipe(
      map(( resp: any ) => {
        console.log(resp['idToken']);
        usuario.correo = resp.email;
        return usuario;
      }) 
    );
  };/**Cierra el registro del usuario**/

  /**Registrar al usuario en la base de datos **/
  registrarDatosUsuario( usuario: RegistroModel){

    const authData = {
//      email: usuario.correo,
//      password: usuario.password,
      id:usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      puesto: usuario.puesto,
      rol: usuario.rol,
      depto: usuario.depto,
      returnSecureToken: true
    };

    delete usuario.password;

    return this.http.post(
      `${this.urlDatos}/Usuario.json`, 
      usuario
    ).pipe(
      map(( resp: any ) => {
        //this.guardarToken(resp['idToken']);
        console.log(resp['idToken']);
        return usuario;
      }) 
    );

  };/**Cierra el Registrar datos usuario**/


  /**Hacer un get de todos los usuarios**/
  getUsuarios(){
    return this.http.get( `${this.urlDatos}/Usuario.json` )
    .pipe(
      map( this.crearArreglo )
    );
  }

  private crearArreglo( usuarioObj: object){
    const usuarios: RegistroModel[] = [];
    //console.log(usuarioObj);

    if( usuarioObj === null ){ return[]; }

    Object.keys( usuarioObj ).forEach( key => {

      const usuario = usuarioObj[key];
      usuario.id = key;
      usuarios.push (usuario);
      
    });


    return usuarios;

  }

  /**Retonar mis usuarios**/
  getUsuario( id: string ){
    return this.http.get( `${ this.urlDatos }/Usuario/${ id }.json` );
  }


  actualizarUsuario( usuario: RegistroModel){

    const usuarioTemp = {
      ...usuario
    };

    delete usuarioTemp.id;

    return this.http.put( `${this.urlDatos}/Usuario/${ usuario.id }.json`, usuarioTemp );
  }

  eliminarUsuario( id: string){
    return this.http.delete( `${this.urlDatos}/Usuario/${ id }.json`);
  }

  
}/**Cierra el export data**/
