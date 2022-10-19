package com.cine.reservations.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.cine.reservations.apirest.models.entities.Pelicula;

public interface IPeliculaDAO extends CrudRepository<Pelicula, Long>{
	
	@Query("FROM Pelicula p WHERE p.nombre=:#{#pelicula.nombre} and p.sinopsi=:#{#pelicula.sinopsi}")
	List<Pelicula> findByNombreSinopsis(Pelicula pelicula);
	
	@Query("FROM Pelicula p WHERE p.estado= 'D' ORDER BY p.id DESC")
	List<Pelicula> findAll();
	
	@Query("FROM Pelicula p WHERE p.estado= 'I' ORDER BY p.id DESC")
	List<Pelicula> findAllNoDisponibles();
	

}
