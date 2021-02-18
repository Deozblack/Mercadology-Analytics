import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apikey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmvkHWhK6TV-6K3KtF-Zui0D17hCuqzEk';
  private userToken: string;
 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

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
}
