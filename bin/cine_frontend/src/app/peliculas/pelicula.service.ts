import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, map, throwError } from 'rxjs';
import { Pelicula } from './pelicula';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  
  private urlEndPoint: string = 'http://localhost:8080/api/peliculas';
  private httpHeaders: HttpHeaders = new HttpHeaders();
  private headers2: HttpHeaders = new HttpHeaders({ 'content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService) { }

    addAuthorizationHeaders(image: boolean = false) {
      let token = this.authService.token
      if (image) {
        if (token != null) {
          return this.httpHeaders.append('Authorization', 'Bearer ' + token)
        }
        else {
          return this.httpHeaders
        }
      }
      if (token != null) {
        return this.headers2.append('Authorization', 'Bearer ' + token)
      }
      return this.headers2
    }

    
  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.headers2.append('Authorization', 'Bearer' + token);
    }
    return this.headers2;
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

  
  getAllDisponibles():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.urlEndPoint+ '/disponibles');
}

  getAllInactivas():Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.urlEndPoint+ '/inactivas' , {headers: this.addAuthorizationHeader()});
  }

  create(pelicula: Pelicula): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`,pelicula, {headers: this.addAuthorizationHeaders(true)}).pipe(
        catchError( e=>{
          if(this.isNoAuthorized(e)){
            return throwError(() => e );
          }
          if (e.status == 400){
            return throwError(() => e)
          }
          if(e.status == 409){
            console.log(e.message);
          }
          return throwError(()=>e)
        })
    );
  }

  update(pelicula: Pelicula, id:number): Observable<any>{
    return this.http.put(`${this.urlEndPoint}/${id}`, pelicula, {headers: this.addAuthorizationHeaders(true)}).pipe(
        //map((response:any)=> response.producto as Producto),
        catchError( e=>{
          if (e.status == 400){
            return throwError(() => e)
          }
          if(e.status == 409){
            console.log(e.message);
          }
          return throwError(()=>e)
        })
    );
  }

  // Cambiar Estado
  changeState(estado:string, pelicula:Pelicula): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,
    pelicula,{headers: this.addAuthorizationHeader()}).pipe(
      catchError(e => {
        console.log(e.message);
        return throwError(() => e)
      })
    );

  }

}
