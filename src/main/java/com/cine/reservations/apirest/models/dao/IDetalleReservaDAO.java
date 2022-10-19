package com.cine.reservations.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.cine.reservations.apirest.models.entities.DetalleReserva;


public interface IDetalleReservaDAO extends CrudRepository<DetalleReserva, Long> {

}
