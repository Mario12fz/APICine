import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Pelicula } from '../peliculas/pelicula';
import { Reserva } from '../reservas/reserva';
import { Cliente } from '../clientes/cliente';
import { DetalleReservas } from '../reservas/detallereserva';
import { PeliculaService } from '../peliculas/pelicula.service';
import { PrimeNGConfig } from 'primeng/api';
import { ReservaService } from '../reservas/reserva.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-reserva-movie',
  templateUrl: './reserva-movie.component.html',
  styleUrls: ['./reserva-movie.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ReservaMovieComponent implements OnInit {

  boletos: number;

  peliculas: Pelicula[];

  sortOptions: SelectItem[];
  
  submitted: boolean;

  sortOrder: number;

  title: string;

  sortField: string;

  reserva: Reserva = new Reserva();

  detalleReservaDialog: boolean;

  cliente: Cliente = {id:1, nombre: "Juan", telefono: "64537364", fecha_nac: 13082003}

  //boletos: number;  

  detalle: DetalleReservas[] = [];

  constructor(private peliculaService: PeliculaService, private primengConfig: PrimeNGConfig,
    private reservaService: ReservaService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.peliculaService.getAllDisponibles().subscribe(
      response =>{
        this.peliculas = response as Pelicula[];
      }
    );
    this.reserva.cliente = this.cliente;
    this.reserva.fecha = new Date();
    console.log(this.reserva);
  }

  
  addToReserva(pelicula: Pelicula, boletos: number, $event: MouseEvent): void {
    this.detalle.push({
      boletos: boletos,
      pelicula: pelicula,
      reserva: {},
    } as DetalleReservas);
    this.reserva.detalleReserva = this.detalle;
    let precio = 0;
    this.reserva.detalleReserva.forEach((or) => {
      if (or.boletos > 0) {
        precio += or.pelicula.precio * or.boletos;
      }
    });
    this.reserva.total = pelicula.precio;
    precio = 0;
    console.log(this.reserva);
    ($event.target as HTMLButtonElement).disabled = true;
    console.log(this.cliente);
  }

  
 hideDialog(): void{
  this.detalleReservaDialog = false;
 }

 verDetalleReserva(){
  this.detalleReservaDialog = true;
  this.title = "Detalle de la Reserva";
  this.reserva.total = this.calcTotal();
 }

  getEventValue($event:any): string{
    return $event.target.value;
   }

   calcTotal():number{
    let totalReserva: number = 0;
    if(this.reserva.detalleReserva.length>0){
      this.detalle.forEach(element =>{
        totalReserva += (element.boletos * element.pelicula.precio);
      })
    }
    return totalReserva;
   }
  
   quitarItem(item):void{
      let index = this.reserva.detalleReserva.indexOf(item);
      this.reserva.detalleReserva.splice(index,1);
      this.reserva.total = this.calcTotal();
   }

   saveReserva(){
      this.confirmationService.confirm({
        message: 'Esta seguro/a de confirmar la Reserva?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.submitted = true;
          this.reservaService.createReservaCustomer(this.reserva).subscribe({
            next: (response) =>{
              this.messageService.add({severity:'success', summary: 'Confirmado', detail: 'Reserva Confirmada', life: 3000});
            },
            error: (err) =>{
              this.messageService.add({severity:'error', summary: 'Cancelada', detail: 'Reserva Cancelada', life: 3000});
              console.log('code status: ' + err.status);
              console.log(err.message);
            }
          })
          this.detalleReservaDialog = false;
          this.reserva = null;
           
        }
    });   
      
  }
  
}
