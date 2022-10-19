
package com.cine.reservations.apirest.models.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cine.reservations.apirest.models.entities.Reserva;


public interface IReservaDAO extends CrudRepository<Reserva, Long> {
	

	@Query("FROM Reserva r WHERE r.estado = 'A' ORDER BY r.fecha DESC")
	List<Reserva> findAllActivas();
	
	@Query("FROM Reserva r WHERE r.estado = 'D' ORDER BY r.fecha DESC")
	List<Reserva> findAllDespachadas();
	
	@Query("FROM Reserva r WHERE r.estado = 'C' ORDER BY r.fecha DESC")
	List<Reserva> findAllCanceladas();
	
	@Query("FROM Reserva r WHERE r.estado = 'A' AND r.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY r.fecha DESC")
	List<Reserva> findAllActivasWithRangoFechas(@Param("fechaInicio") Date fechaInicio,@Param("fechaFin") Date fechaFin);
	
	@Query("FROM Reserva r WHERE r.estado = 'D' AND r.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY r.fecha DESC")
	List<Reserva> findAllDespachadasWithRangoFechas(@Param("fechaInicio") Date fechaInicio,@Param("fechaFin") Date fechaFin);
	
	@Query("FROM Reserva r WHERE r.estado = 'C' AND r.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY r.fecha DESC")
	List<Reserva> findAllCanceladasWithRangoFechas(@Param("fechaInicio") Date fechaInicio,@Param("fechaFin") Date fechaFin);
	
}
