import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import {  map, delay} from 'rxjs/operators';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apikey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk';
  private userToken: string;
 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://mercadology-analytics-default-rtdb.firebaseio.com';
  
  constructor(private http: HttpClient) {
    this.leerToken();
   }

  Logout(){
    localStorage.removeItem('token');
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
      this.guardarToken(resp['idToken']);
      return resp;
    })
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
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
  
  saveCuenta( cliente: ClienteModel){
    return this.http.post(`${ this.url }/cliente.json`, cliente)
    .pipe(
      map( (resp: any) => {
        cliente.ids = resp.name;
        return cliente;
      })
    );
  }
   UpdatCliente( cliente: ClienteModel ) {
    const ClienteTemp = {
      ...cliente
    };
    delete ClienteTemp.ids;

    return this.http.put(`${ this.url }/cliente/${ cliente.ids }.json`, ClienteTemp);


  }
  DeleteClient( ids: string ) {

    return this.http.delete(`${ this.url }/cliente/${ ids }.json`);

  }
  getClient( ids: string ) {

    return this.http.get(`${ this.url }/cliente/${ ids }.json`);

  }
  getShow( ids: string ) {

    return this.http.get(`${ this.url }/mostrar/${ ids }.json`);

  }
  
  getCliente() {
    return this.http.get(`${ this.url }/cliente.json`)
            .pipe(
              map(this.CrearArre),
              delay(1500)
            );
  }
  private CrearArre( ClienteObj: object ) {
    

    const Cliente: ClienteModel[] = [];
    
    console.log(ClienteObj);

    if(ClienteObj === null){
      return [];
    }
    
    Object.keys( ClienteObj).forEach( key => {

      const clientes: ClienteModel = ClienteObj[key];
      clientes.ids = key;
      
      Cliente.push(clientes);
    });

    return Cliente;

  }
}
