import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { HomeComponent } from './home/home.component';
import { SalasComponent } from './salas/salas.component';
import { FormComponent } from './categorias/form.component';
import { FormSalaComponent } from './salas/form-sala.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservaMovieComponent } from './reserva-movie/reserva-movie.component';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categorias/form', component: FormComponent},
  {path: 'categorias/form/:id', component: FormComponent},
  {path: 'salas', component: SalasComponent},
  {path: 'salas/form-sala', component: FormSalaComponent},
  {path: 'salas/form-sala/:id', component: FormSalaComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'reservaMovie', component: ReservaMovieComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
