package com.cine.reservations.apirest.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.cine.reservations.apirest.models.entities.Categoria;

public interface ICategoriaDAO extends CrudRepository<Categoria,Long>{
	
	List<Categoria> findByNombreIgnoreCase(String cadena);

}
