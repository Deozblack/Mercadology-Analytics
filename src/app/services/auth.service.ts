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
  
  //Inicio Sision Auth
  private apikey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU';
  public userToken: string;
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk
   
  //Crear usuarios Auth
  private apiKey2 = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU`;

  //Borrar usuario Auth
  private apiKey3 = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU`;

  //Obtener datos de usuario Auth
  private apiKey4 = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU`;

  //Actualizar usuario Auth
  private apiKey5 = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU`;

  //Verificar correo
  private apiKey6 = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCv_KWilNMN2J_qgwW4hIiYzEU-NyCS_IU`;


  //RealDataBase
  private urlDatos = 'https://registro-e4f18-default-rtdb.firebaseio.com/';
  //'https://mercadology-analytics-default-rtdb.firebaseio.com';


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
    //console.log(idToken);
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
//      puesto: usuario.puesto,
//      photoUrl: `https://www.google.com/search?q=fotos&rlz=1C1CHBD_esMX810MX810&sxsrf=ALeKk02IMUzTLthrz0GqgUUh4YuJW2TUAg:1614918779816&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjIz9ihqZjvAhUBKKwKHXMaBMYQ_AUoAXoECAcQAw&biw=1296&bih=665#imgrc=clrmJBtqd035WM`,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.apiKey2}`, 
      authData
    ).pipe(
      map(( resp: any ) => {
        console.log(resp['idToken']);
        console.log('imprimir resp del registro');
        console.log(resp);
        return resp;
      }) 
    );
  };/**Cierra el registro del usuario**/

  /**Registrar al usuario en la base de datos **/
  registrarDatosUsuario( usuario: RegistroModel, idLocal: string){
  
    let authData = {
//        idToken: `${idTok}`, 
        nombre: `${usuario.nombre}`,
        apellido: `${usuario.apellido}`,
        telefono: ``,
        celular: ``,
        correo: `${usuario.correo}`,
        puesto:  `${usuario.puesto}`,
        rol: `${usuario.rol}`,
        depto: `${usuario.depto}`
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

  /**Elimina el usuario, pero el logueado, es por idToken**/
  eliminarUsuarioAuth( id: string){
      console.log(id);
    
    //return idToken;
    return this.http.post(
      `${this.apiKey3}`,
       {'idToken': id}
    ).pipe(
      map(( resp: any ) => {
        //console.log(resp['idToken']);
        //console.log('imprimir resp del eliminado');
        console.log(resp);
        return resp;
      }) 
    );
  }

  obtenerUsuarioAuth( idToken: string ){
    console.log('IDTOKEN:' + idToken);
    //return idToken;

    return this.http.post(
      `${this.apiKey4}`,
      {'idToken': idToken}
    ).pipe(
      map(( resp: any ) => {
        //console.log(resp['idToken']);
        console.log('imprimir usuario Retornado');
        console.log(resp);
        return resp;
      }) 
    );
  }

  modificarUsuarioAuth(idToken:string, usuario: RegistroModel ){
//    console.log('IDTOKEN:' + idToken);
//    console.log(usuario.nombre + " " + usuario.apellido);

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
  
}/**Cierra el export data**/
