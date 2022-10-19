package com.cine.reservations.apirest.services.interfaces;

import java.util.List;

import com.cine.reservations.apirest.models.entities.Pelicula;

public interface IPeliculaService {
	
	 public List<Pelicula> findAllDisponibles();
	    
	 public List<Pelicula> findAllNoDisponibles();
		
	 public Pelicula findById(Long id);
		
	 public Pelicula save(Pelicula pelicula);
		
	 public Pelicula changeEstate(Pelicula pelicula);
		
	 public List<Pelicula> isExist(Pelicula pelicula);

}
