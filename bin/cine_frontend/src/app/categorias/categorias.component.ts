import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categoria: Categoria = new Categoria();

  categorias: Categoria[];
  
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe(
      response => {
        this.categorias = response as Categoria[];
        console.log(response);
      }
    );
  }

  delete(categoria: Categoria){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro/a?',
      text: "¿Seguro/a que desea eliminar esta categoria!?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(categoria.id).subscribe(
          response => {
            this.categorias = this.categorias.filter(cat => cat !== categoria);
          }
        )
        swalWithBootstrapButtons.fire(
          'Categoria Eliminada!!',
          'success'
        )
      } 
    })
  }
 


}
