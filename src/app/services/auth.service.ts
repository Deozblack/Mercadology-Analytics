import { ActivatedRouteSnapshot } from '@angular/router';
import { UsuarioModel } from './../models/usuario.model';
import { RegistroModel } from './../models/registro.model';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //Inicio Sesion Auth
  private apikey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk';
  public userToken: string;
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk
   
  //Crear usuarios Auth
  private apiKey2 = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;

  //Borrar usuario Auth
  private apiKey3 = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;

  //Obtener datos de usuario Auth
  private apiKey4 = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;

  //Actualizar usuario Auth
  private apiKey5 = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;

  //Verificar correo
  private apiKey6 = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk`;

  //RealDataBase
  private urlDatos = 'https://mercadology-analytics-default-rtdb.firebaseio.com';
  //'https://mercadology-analytics-default-rtdb.firebaseio.com';

  //Storage
  public urlStorage = `https://firebasestorage.googleapis.com/v0/b/mercadology-analytics.appspot.com`;
  


  constructor(private http: HttpClient) {
  
    this.leerToken();    
  }

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('idUsuario');
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
//      console.log(resp);      
      return resp;
    })
    );
  }

  public guardarToken(idToken: object){
    this.userToken = idToken['idToken'];
    localStorage.setItem('token', idToken['idToken']);
    localStorage.setItem('email', idToken['email']);
    localStorage.setItem('name', idToken['displayName']);
    localStorage.setItem('idUsuario', idToken['localId']);
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
      displayName: usuario.nombre + ' ' + usuario.apellido,
      email: usuario.correo,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apiKey2}`, 
      authData
    ).pipe(
      map(( resp: any ) => {
//        console.log(resp);
        return resp;
      }) 
    );
  };/**Cierra el registro del usuario**/

  /**Registrar al usuario en la base de datos **/
  registrarDatosUsuario( usuario: RegistroModel, idLocal: string){
  
    let authData = {
        nombre: `${usuario.nombre}`,
        apellido: `${usuario.apellido}`,
        telefono: ``,
        celular: ``,
        correo: `${usuario.correo}`,
        puesto:  `${usuario.puesto}`,
        rol: `${usuario.rol}`,
        depto: `${usuario.depto}`,
        habilitado: `${usuario.habilitado}`
    };

    delete usuario.password;

    return this.http.put(
      `${this.urlDatos}/Usuario/${idLocal}.json`, 
      authData
    ).pipe(
      map(( resp: any ) => {
        //this.guardarToken(resp['idToken']);
        //console.log(resp['idToken']);
        console.log(usuario);        
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

  /**Elimina el usuario, pero el logueado, es por idToken**/
  eliminarUsuarioAuth( id: string){
    
    return this.http.post(
      `${this.apiKey3}`,
       {'idToken': id}
    ).pipe(
      map(( resp: any ) => {
//        console.log(resp);
        return resp;
      }) 
    );
  }

  obtenerUsuarioAuth( idToken: string ){

    return this.http.post(
      `${this.apiKey4}`,
      {'idToken': idToken}
    ).pipe(
      map(( resp: any ) => {
//        console.log(resp);
        return resp;
      }) 
    );
  }

  modificarUsuarioAuth(idToken:string, usuario: RegistroModel ){

    let nombre = usuario.nombre + ' ' + usuario.apellido;

    return this.http.post(
      `${this.apiKey5}`,
      {'idToken': idToken, 'displayName': nombre}
    ).pipe(
      map(( resp: any ) => {
        console.log('imprimir usuario modificado-----');
        console.log(resp);
        localStorage.setItem('name', nombre);        
        return resp;
      }) 
    );
  }

  verificarCorreoAuth(idToken: string){
    return this.http.post(
      `${this.apiKey6}`,
      {"requestType":"VERIFY_EMAIL", 'idToken': idToken}
    ).pipe(
      map(( resp: any ) => {
        console.log('nviamos verificacion-----');
        console.log(resp);
        return resp;
      }) 
    );
  }

  getImagen(){
    return this.http.get(`${this.urlDatos}/Usuario.json`);
  }

  uploadImage(file: File){    
    return this.http.post(`${this.urlStorage}/o/photosProfile%2F${file.name}`,file);
  }


}/**Cierra el export data**/