import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token : string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario'));
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  
  login(usuario: Usuario): Observable<any>{
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = window.btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 
  'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
      params.set('grant_type', 'password');
      params.set('username', usuario.username);
      params.set('password', usuario.password);
      //console.log(params.toString());
    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders})
  }

  guardarUsuario(access_token: string): void{
    let payLoad = this.obtenerDatosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.username = payLoad.user_name;
    this._usuario.nombre = payLoad.nombre;
    this._usuario.email = payLoad.email;
    this._usuario.roles = payLoad.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }

  guardarToken(access_token: string): void{
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  
  obtenerDatosToken(access_token: string): any{
    if(access_token != null){
      return JSON.parse(window.atob(access_token.split(".")[1]));
    }
    return null;
  }

  
  isAuthenticated(): boolean{
    let payLoad = this.obtenerDatosToken(this.token);
    if(payLoad != null && payLoad.user_name && payLoad.user_name.length > 0){
      return true;
    }
    return false;
  }

  
  logout(): void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear(); // Elimina todos los items de la sesion
   // sessionStorage.removeItem('token'); // Elimina uno
  }

  hasRole(role: string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}
