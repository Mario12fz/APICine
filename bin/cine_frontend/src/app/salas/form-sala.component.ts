import { Component, OnInit } from '@angular/core';
import { Sala } from './sala';
import { SalaService } from './sala.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-sala',
  templateUrl: './form-sala.component.html',
  styleUrls: ['./form-sala.component.css']
})
export class FormSalaComponent implements OnInit {

   
  public sala: Sala = new Sala();
  public title: string = "Registrar Sala";

  public errors: string[];

  constructor(private salaService: SalaService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarSala();
  }

  
  cargarSala(): void{
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.salaService.getSala(id).subscribe((sala) => this.sala = sala);
      }
    })
  } 

  create(): void{
    this.salaService.create(this.sala)
    .subscribe({
      next: (sala) => {
        this.router.navigate(['/salas'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sala registrada con exito...',
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
    this.salaService.update(this.sala)
    .subscribe({
      next: (sala) => {
        this.router.navigate(['/salas'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sala actualizada con exito...',
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
