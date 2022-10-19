import { Injectable } from '@angular/core';
import { Sala } from './sala';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  public sala: Sala = new Sala();
  // Punto de consumismo para una api rest proveniente del backend !urlEndPoint!
  private urlEndPoint: string = 'http://localhost:8080/api/salas';
  private httpHeaders: HttpHeaders = new HttpHeaders({'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) { }

    
  private addAuthorizatiobHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization',  'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  
  private isNoAuthorized(e): boolean{
    if(e.status == 401){
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status == 403){
     Swal.fire('Prohibido', `${this.authService.usuario.username} no tiene accesso a este recurso`, 'warning');
      this.router.navigate(['/peliculas'])
      return true;
    }
    return false;
  }


  getAll(): Observable<Sala[]>{   
    return this.http.get<Sala[]>(this.urlEndPoint, {headers: this.addAuthorizatiobHeader()}).pipe(
    catchError(e =>{
      this.isNoAuthorized(e);
      return throwError(() => e);
    })
    );
  }

  create(sala: Sala): Observable<Sala>{
    return this.http.post(this.urlEndPoint, sala, {headers: this.addAuthorizatiobHeader()}).pipe(
      map((response: any) => response.sala as Sala),
      catchError( e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        // Controlando posibles errores que devuelve el backend
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire("Advertencia", "Sala existente!!!", "warning");
        }
        console.log(e.message);
        // Emitir message de error al usurio
        return throwError(() => e)
      })
    )
  }

  // Obtener una sala
  getSala(id: any): Observable<Sala>{
    return this.http.get<Sala>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError( e =>{
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        this.router.navigate(['/salas'])
        console.error(e.message);
        //Mostrar mensaje de 
        return throwError(() => e)
      })
    )
  }

  //actualizar categoria
  update(sala: Sala): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${sala.id}`, sala, {headers: this.addAuthorizatiobHeader()}).pipe(

      catchError( e =>{
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        //Controlando posibles errores que devuelve el backend
        if(e.status == 400){
          return throwError(() => e)
        }
        console.log(e.message);
        // Emitir message de error al usurio
        return throwError(() => e)

      })
    )
  }

  // Eliminar categoria
  delete(id:number): Observable<Sala>{
    return this.http.delete<Sala>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError( e =>{
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        console.log(e.message);
        // Emitir message de error al usurio
        return throwError(() => e)
      })
    )
  }
}
