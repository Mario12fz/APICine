package com.cine.reservations.apirest.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.cine.reservations.apirest.models.entities.Sala;


public interface ISalaDAO  extends CrudRepository<Sala,Long> {
	List<Sala> findByCodigo(String cadena);
}
