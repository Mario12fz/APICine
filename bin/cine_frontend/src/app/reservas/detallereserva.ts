import { Pelicula } from "../peliculas/pelicula";
import { Reserva } from "./reserva";


export class DetalleReservas{
    id?:number;
    boletos?:number;
    pelicula?:Pelicula;
    reserva?:Reserva;    
}