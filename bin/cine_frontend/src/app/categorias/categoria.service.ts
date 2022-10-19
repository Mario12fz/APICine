import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, map } from 'rxjs';
import { Categoria } from './categoria';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public categoria: Categoria = new Categoria();
  // Punto de consumismo para una api rest proveniente del backend !urlEndPoint!
  private urlEndPoint: string = 'http://localhost:8080/api/categorias';
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

  
  getAll(): Observable<Categoria[]>{   
    return this.http.get<Categoria[]>(this.urlEndPoint, {headers: this.addAuthorizatiobHeader()}).pipe(
    catchError(e =>{
      this.isNoAuthorized(e);
      return throwError(() => e);
    })
    );
  }
  
  
  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post(this.urlEndPoint, categoria, {headers: this.addAuthorizatiobHeader()}).pipe(
      map((response: any) => response.categoria as Categoria),
      catchError( e => {
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        // Controlando posibles errores que devuelve el backend
        if(e.status == 400){
          return throwError(() => e)
        }
        if(e.status == 409){
          Swal.fire("Advertencia", "Categoria existente!!!", "warning");
        }
        console.log(e.message);
        // Emitir message de error al usurio
        return throwError(() => e)
      })
    )
  }
  
  // Obtener una categoria
  getCategoria(id: any): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError( e =>{
        if(this.isNoAuthorized(e)){
          return throwError(() => e );
        }
        this.router.navigate(['/categorias'])
        console.error(e.message);
        //Mostrar mensaje de 
        return throwError(() => e)
      })
    )
  }

  //actualizar categoria
  update(categoria: Categoria): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${categoria.id}`, categoria, {headers: this.addAuthorizatiobHeader()}).pipe(

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
  delete(id:number): Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.urlEndPoint}/${id}`, {headers: this.addAuthorizatiobHeader()}).pipe(
      catchError( e =>{
        console.log(e.message);
        // Emitir message de error al usurio
        return throwError(() => e)
      })
    )
  }

}
