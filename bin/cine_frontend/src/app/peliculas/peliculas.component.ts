import { Component, OnInit } from '@angular/core';
import { Pelicula } from './pelicula';
import { Categoria } from '../categorias/categoria';
import { PeliculaService } from './pelicula.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../categorias/categoria.service';
import { ConfirmationService } from 'primeng/api';
import  Swal  from 'sweetalert2';
import { Sala } from '../salas/sala';
import { SalaService } from '../salas/sala.service';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
styleUrls: ['./peliculas.component.css'],
providers: [MessageService,ConfirmationService]
})
export class PeliculasComponent implements OnInit {

   productDialog: boolean;
   peliculas: Pelicula[];
   categorias: Categoria[];

   salas: Sala[];
 
   categoriaSelected: Categoria;

   salaSelected: Sala;

   selectedPeliculas: Pelicula[];
   
   title: String;

   public pelicula: Pelicula = new Pelicula();
   
   estado: string;
 
   private imagen: File;
 
   indexEdited: number = -1;
 
   errors: string[];
 
   checked: boolean= false;
 
   submitted: boolean;

  constructor(private peliculaService: PeliculaService, private categoriaService: CategoriaService,
   private  salaService: SalaService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
     this.getDisponibles();
     this.getCategorias();
     this.getSalas();
  }

  
  getDisponibles(): void{
    this.peliculaService.getAllDisponibles().subscribe(
      response =>{
        console.log(response);
        this.peliculas = response as Pelicula[];
      }
    );
  }
 
  getInactivas(): void{
    this.peliculaService.getAllInactivas().subscribe(
      response =>{
        console.log(response);
        this.peliculas = response as Pelicula[];
      }
    );
  }

  getCategorias(): void{
    this.categoriaService.getAll().subscribe(
      response =>{
        console.log(response);
        this.categorias = response as Categoria[];
      }
    );
  }

  getSalas(): void{
    this.salaService.getAll().subscribe(
      response =>{
        console.log(response);
        this.salas = response as Sala[];
      }
    );
  }

  
  openNew() {
    this.pelicula = {};
     this.submitted = false;
     this.productDialog = true;
     this.title = "Nueva pelicula";
   }
 
   hideDialog() {
     this.productDialog = false;
     this.submitted = false;
   }
 
   editMovie(pelicula: Pelicula) {
 //   this.selectedPeliculas = pelicula.categoria;
     this.pelicula = {...pelicula};
     this.productDialog = true;
     this.indexEdited = this.peliculas.indexOf(pelicula);
   }
 
   createFormData(): FormData{
     let formData = new FormData();
     if(this.imagen == null){
       if(this.pelicula.id == null){
         this.pelicula.imagen = null;
         formData.append("imagen", null);
       }
      
     }else{
       formData.append("imagen", this.imagen);
     }
     formData.append("pelicula",
       new Blob([JSON.stringify(this.pelicula)], {type: "application/json"})
       );
       return formData;
   } 
  
   create():void{
       this.submitted = true;
       this.peliculaService.create(this.createFormData() as Pelicula).subscribe({
         next: (json)=>{
           this.peliculas.unshift(json.pelicula);
           //Swal.fire('Nuevo Producto', `${json.message}: ${json.producto.nombre}`);
           this.messageService.add({severity:'success', summary: 'Successful', detail: 'Película Registrada con exito...', life: 3000});
         },
         error: (err)=>{
           this.errors = err.message as string[];
           console.log('code status')
         }
       })
         this.productDialog = false;
         this.pelicula = null;
         this.imagen = null;
   }
 
   update():void{
     this.submitted = true;
     let id = this.pelicula.id;
     this.peliculaService.update(this.createFormData() as Pelicula,id).subscribe({
       next: (json)=>{
        Object.assign(this.peliculas[this.indexEdited],json.pelicula);
         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Película Actualizada con exito...', life: 3000});
       },
       error: (err)=>{
         this.errors = err.message as string[];
         console.log('code status')
       }
     })
       this.productDialog = false;
       this.pelicula = null;
       this.imagen = null;
     
   }
 
 deleteMovie(estado: string, pelicula: Pelicula) {
     this.confirmationService.confirm({
         message: 'Esta seguro/a de Desactivar está película ' + pelicula.nombre + '?',
         header: 'Confirm',
         icon: 'pi pi-exclamation-triangle',
         accept: () => {
           this.peliculaService.changeState(estado,pelicula).subscribe({
             next: (response) =>{
               this.peliculas = this.peliculas.filter(val => val.id !== pelicula.id);
               this.pelicula = null;
               this.messageService.add({severity:'success', summary: 'Successful', detail: 'Película cambiado a estado I', life: 3000});
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
 
  deleteMovie2(estado: string, pelicula: Pelicula) {
    this.confirmationService.confirm({
        message: 'Esta seguro/a de activar ' + pelicula.nombre + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.peliculaService.changeState(estado,pelicula).subscribe({
            next: (response) =>{
              this.peliculas = this.peliculas.filter(val => val.id !== pelicula.id);
              this.pelicula = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Película cambiado a estado Disponible', life: 3000});
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
 
  checkChanged(event){
   if(event)
   this.getInactivas();
   else
   this.getDisponibles();

  }
 
  seleccionarImagen(event){
   this.imagen = event.target.files[0];
   console.log(this.imagen);
  }
 
  getEventValue($event:any): string{
   return $event.target.value;
  }
 


  



}
