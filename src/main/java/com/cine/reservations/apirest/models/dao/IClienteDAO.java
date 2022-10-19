package com.cine.reservations.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cine.reservations.apirest.models.entities.Cliente;


public interface IClienteDAO extends JpaRepository<Cliente,Long> {
	
	@Query("FROM Cliente c WHERE c.telefono=:#{#cliente.telefono}")
	List<Cliente> findByTelefono(Cliente cliente);
}
