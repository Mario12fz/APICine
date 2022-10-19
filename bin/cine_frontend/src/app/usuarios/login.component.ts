import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Iniciar Sesión";

  usuario: Usuario

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      
      if(this.authService.hasRole('ROLE_ADMIN')){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/reservaMovie']);
      }
    }
  }

  login(): void{
    //console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null ){
      Swal.fire('Error', 'UserName o Password vacios!', 'error');
      return;
    }
    
    this.authService.login(this.usuario).subscribe(response => {
      //console.log(response);
      //let payLoad = JSON.parse(window.atob(response.access_token.split(".")[1]));
      //console.log(payLoad)
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

     // this.router.navigate(['/home']);
      Swal.fire('Aviso', `Hola ${usuario.username} has iniciado sesion con exito`, 'success');

      if(this.authService.hasRole('ROLE_ADMIN')){
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/reservaMovie']);
      }

  }, err => {
    if(err.status == 400){
      Swal.fire('Acceso Incorrecto', 'Usuario o clave incorrectos', 'error');
      }
    }
    );
  }
}
