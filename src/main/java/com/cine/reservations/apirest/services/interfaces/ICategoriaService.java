package com.cine.reservations.apirest.services.interfaces;

import java.util.List;

import com.cine.reservations.apirest.models.entities.Categoria;

public interface ICategoriaService {
	
	public List<Categoria> findAll ();
	
	public Categoria findById(Long id);
	
	public Categoria save(Categoria categoria);
	
	public void delete (Long id);
	
	public List<Categoria> findByNombre(String nombre);

}
