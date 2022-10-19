package com.cine.reservations.apirest.services.interfaces;

import java.util.List;

import com.cine.reservations.apirest.models.entities.Cliente;


public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Cliente findById(Long id);
	
	public Cliente save(Cliente cliente);
	
	public void delete(Long id);
	
	public List<Cliente> isExist(Cliente cliente);

}
