import { Component, OnInit } from '@angular/core';
import { Sala } from './sala';
import { SalaService } from './sala.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  public sala: Sala = new Sala();

  salas: Sala[];

  constructor(private salaService: SalaService) { }

  ngOnInit(): void {
    this.salaService.getAll().subscribe(
      response => {
        this.salas = response as Sala[];
        console.log(response);
      }
    );
  }

  delete(sala: Sala){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro/a?',
      text: "¿Seguro/a que desea eliminar esta Sala!?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaService.delete(sala.id).subscribe(
          response => {
            this.salas = this.salas.filter(sal => sal !== sala);
          }
        )
        swalWithBootstrapButtons.fire(
          'Sala Eliminada!!',
          'success'
        )
      } 
    })
  }

}
