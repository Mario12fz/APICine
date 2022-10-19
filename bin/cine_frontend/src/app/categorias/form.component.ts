import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public categoria: Categoria = new Categoria();
  public title: string = "Registrar Categoria";

  public errors: string[];

  constructor(private categoriaService: CategoriaService, private router: Router,
    private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.cargarCategoria();
  }

  
  cargarCategoria(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.categoriaService.getCategoria(id).subscribe((categoria) => this.categoria = categoria);
      }
    })
  } 

  create(): void{
    this.categoriaService.create(this.categoria)
    .subscribe({
      next: (categoria) => {
        this.router.navigate(['/categorias'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Categoria registrada con exito...',
          showConfirmButton: false,
          timer: 1500
        })
        // Emitir mensaje al usuario, categoria registrada
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+ err.Status);
        console.log(err.message);
      }
    })
  }

  update(): void{
    this.categoriaService.update(this.categoria)
    .subscribe({
      next: (categoria) => {
        this.router.navigate(['/categorias'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Categoria actualizada con exito...',
          showConfirmButton: false,
          timer: 1500
        })
        // Emitir mensaje al usuario, categoria registrada
      },
      error: (err) => {
        this.errors = err.message as string[];
        console.error('Code Status: '+ err.Status);
        console.log(err.message);
      }
    })
  }

}
