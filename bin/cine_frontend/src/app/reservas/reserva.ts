import { Cliente } from "../clientes/cliente";
import { DetalleReservas } from "./detallereserva";

export class Reserva{
    id?:number;
    fecha?:Date;
    fechaDespacho?: Date;
    total?: number;
    estado?:string;
    cliente?: Cliente;
    detalleReserva?:DetalleReservas[];
    
}