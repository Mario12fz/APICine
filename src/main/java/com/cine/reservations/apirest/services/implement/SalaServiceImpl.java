package com.cine.reservations.apirest.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cine.reservations.apirest.models.dao.ISalaDAO;
import com.cine.reservations.apirest.models.entities.Sala;
import com.cine.reservations.apirest.services.interfaces.ISalaService;

@Service
public class SalaServiceImpl implements ISalaService {

	@Autowired
	private ISalaDAO salaDAO;
	
	@Override
	public List<Sala> findAll() {
		return (List<Sala>)salaDAO.findAll();

	}

	@Override
	public Sala findById(Long id) {
		return salaDAO.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Sala save(Sala sala) {
		return salaDAO.save(sala);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		salaDAO.deleteById(id);
	}

	@Override
	public List<Sala> findByCodigo(String codigo) {
		return salaDAO.findByCodigo(codigo);
	}

	

}
