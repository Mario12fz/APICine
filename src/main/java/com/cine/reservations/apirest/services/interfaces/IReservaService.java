package com.cine.reservations.apirest.services.interfaces;

import java.util.Date;
import java.util.List;
import com.cine.reservations.apirest.models.entities.Reserva;


public interface IReservaService {
	
	public List<Reserva> findAllActivas(Date fecha);
	    
	public List<Reserva> findAllDespachadas(Date fecha);
	
	public List<Reserva> findAllCanceladas(Date fecha);
	
	public Reserva saveOrUpdate(Reserva reserva);
	
	public Reserva changeState(Reserva reserva);
	
	public Reserva findById(Long id);
}
