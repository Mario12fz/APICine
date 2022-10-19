import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { Cliente } from '../clientes/cliente';
import { ReservaService } from './reserva.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  title:string;
  reservas: Reserva[];
  clientes: Cliente[];
  reserva: Reserva;

  estado: string;

  detalleReservaDialog: boolean = false;

  selectedValue: string = 'val1';

  errors: string[];

  constructor(private reservaService: ReservaService,
    private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router ) { }

  ngOnInit(): void {
    this.getActivas();
  }

  
  getActivas(): void{
    this.reservaService.getAllActivas().subscribe({
      next: (json)=>{
        this.reservas = json as Reserva[];

      },
      error: (err)=>{
        this.messageService.add({severity:'error', summary: 'resultado', detail:`${err.message}`});
        console.error('code status' + err.status);
      } 
    });
  }

  
  getDespachadas(): void{
    this.reservaService.getAllDespachadas().subscribe({
      next: (json)=>{
        this.reservas = json as Reserva[];

      },
      error: (err)=>{
        this.messageService.add({severity:'error', summary: 'resultado', detail:`${err.message}`});
        console.error('code status' + err.status);
      }   
    });
  }

  getCanceladas(): void{
    this.reservaService.getAllCanceladas().subscribe({
      next: (json)=>{
        this.reservas = json as  Reserva[];
      },
      error: (err)=>{
        this.messageService.add({severity:'error', summary: 'resultado', detail:`${err.message}`});
        console.error('code status' + err.status);
      }   
    });
  }

  
  changeState(estado: string, reserva: Reserva) {
    let estadoText = estado=='D' ? 'Despachar' : 'Cancelar';
    this.confirmationService.confirm({
        message: `Esta seguro/a de ${estadoText} la Reserva ?`,
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.reservaService.changeState(estado,reserva).subscribe({
            next: (response) =>{
              this.reservas = this.reservas.filter(val => val.id !== reserva.id);
              this.reserva = {};
              this.messageService.add({severity:'success', summary: 'Confirmado', detail: `{${response.message}}`, life: 3000});
            },
            error: (err) =>{
              this.messageService.add({severity:'error', summary: 'Resulatdo', detail: `${err.message}}`});
              console.log('code status: ' + err.status);
              console.log(err.message);
            }
          })
           
        }
    });
 }

 
 hideDialog(): void{
  this.detalleReservaDialog = false;
 }

 verDetalleReserva(reserva: Reserva){
  this.reserva = {...reserva};
  this.detalleReservaDialog = true;
  this.title = "Detalle de la Reserva";
 }

 getEventValue($event:any): string{
  return $event.target.value;
 }


}
