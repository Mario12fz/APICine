package com.cine.reservations.apirest.services.interfaces;

import java.util.List;

import com.cine.reservations.apirest.models.entities.Sala;

public interface ISalaService {
	

	public List<Sala> findAll ();
	
	public Sala findById(Long id);
	
	public Sala save(Sala sala);
	
	public void delete (Long id);
	
	public List<Sala> findByCodigo(String codigo);
}
