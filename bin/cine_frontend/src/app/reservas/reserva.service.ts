import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Reserva } from './reserva';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  
   // Punto de consumismo para una api rest proveniente del backend !urlEndPoint!
   private urlEndPoint: string = 'http://localhost:8080/api/reservas';
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
    
    private isNoAuthorized(e): boolean {
      if (e.status === 401) {
        this.authService.logout()
        this.router.navigate(['/login']);
        return true;
      }
  
      if (e.status === 403) {
        Swal.fire("Prohibido",`${this.authService.usuario.username} no tiene acceso a este recurso`, 'warning')
        this.router.navigate(['/home']);
      }
  
      return false;
    }

  
  getAllActivas(): Observable<Reserva[]>{   
    return this.http.get<Reserva[]>(this.urlEndPoint, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError(e => {
        this.isNoAuthorized(e)
        return throwError(() => e)
      })
    );
  }

  getAllDespachadas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/despachadas' , {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError(e => {
        this.isNoAuthorized(e)
        return throwError(() => e)
      })
    );
  }

  getAllCanceladas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.urlEndPoint + '/canceladas' , {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError(e => {
        this.isNoAuthorized(e)
        return throwError(() => e)
      })
    );
  }

  
  createReservaCustomer(reserva: Reserva): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`, reserva , {headers: this.addAuthorizatiobHeader()}).pipe(
        //map((response:any)=> response.producto as Producto),
        catchError( e=>{
          if (this.isNoAuthorized(e)) {
            return throwError(() => e);
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

  
  changeState(estado:string, reserva:Reserva): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`,
    reserva, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError(e => {
        if (this.isNoAuthorized(e)) {
          return throwError(() => e);
        }
        console.log(e.message);
        return throwError(() => e)
      })
    );

  }
}
