import { Categoria } from "../categorias/categoria";
import { Sala } from "../salas/sala";

export class Pelicula{
    id?:number;
    nombre?:string;
    sinopsi?:string;
    precio?:number;
    imagen?:string;
    estado?:string;
    fecha_inicio?:Date;
    fecha_fin?:Date;
    hora_proyeccion?:string;
    sala?: Sala;
    categoria?:Categoria;
}