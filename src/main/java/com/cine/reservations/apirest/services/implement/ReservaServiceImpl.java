package com.cine.reservations.apirest.services.implement;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cine.reservations.apirest.models.dao.IDetalleReservaDAO;
import com.cine.reservations.apirest.models.dao.IReservaDAO;
import com.cine.reservations.apirest.models.entities.DetalleReserva;
import com.cine.reservations.apirest.models.entities.Reserva;
import com.cine.reservations.apirest.services.interfaces.IReservaService;

@Service
public class ReservaServiceImpl implements IReservaService {

	@Autowired
	private IReservaDAO reservaDAO;
	
	@Autowired
	private IDetalleReservaDAO detalleReservaDAO;

	@Override
	@Transactional(readOnly = true)
	public List<Reserva> findAllActivas(Date fechaInicio) {
		Date fechaFin = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFin = c.getTime();
			return reservaDAO.findAllActivasWithRangoFechas(fechaInicio, fechaFin);
		}
		return reservaDAO.findAllActivas();
	}

	@Override
	public List<Reserva> findAllDespachadas(Date fechaInicio) {
		Date fechaFin = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFin = c.getTime();
			return reservaDAO.findAllDespachadasWithRangoFechas(fechaInicio, fechaFin);
		}
		return reservaDAO.findAllDespachadas();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Reserva> findAllCanceladas(Date fechaInicio) {
		Date fechaFin = null;
		if(fechaInicio != null) {
			Calendar c = Calendar.getInstance();
			c.setTime(fechaInicio);
			c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
			fechaFin = c.getTime();
			return reservaDAO.findAllCanceladasWithRangoFechas(fechaInicio, fechaFin);
		}
		return reservaDAO.findAllCanceladas();
	}


	@Override
	public Reserva saveOrUpdate(Reserva reserva) {
		Reserva reservaPersisted = null;
		try {
			if(reserva.getId() == null) {
				List<DetalleReserva> detalleReserva = reserva.getDetalleReserva();
				reserva.setDetalleReserva(new ArrayList<DetalleReserva>());
				reservaPersisted = reservaDAO.save(reserva);
				
				for(DetalleReserva detalle: detalleReserva) {
					detalle.setReserva(reservaPersisted);
				}
				detalleReservaDAO.saveAll(detalleReserva);
				
			}else {
				for(DetalleReserva detalle: reserva.getDetalleReserva()) {
					detalle.setReserva(reserva);
				}
				reservaDAO.save(reserva);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return reservaPersisted;
	}

	@Override
	public Reserva changeState(Reserva reserva) {
		return reservaDAO.save(reserva);
	}

	@Override
	public Reserva findById(Long id) {
		return reservaDAO.findById(id).orElse(null);
	}

	

}
