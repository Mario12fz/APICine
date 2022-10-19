import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../peliculas/pelicula';
import { PeliculaService } from '../peliculas/pelicula.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  peliculas: Pelicula[];

  private imagen: File;
  
	responsiveOptions;

  constructor(private peliculaService: PeliculaService) { 

    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.getDisponibles();
  }

  getDisponibles(): void{
    this.peliculaService.getAllDisponibles().subscribe(
      response =>{
        console.log(response);
        this.peliculas = response as Pelicula[];
      }
    );
  }

}
