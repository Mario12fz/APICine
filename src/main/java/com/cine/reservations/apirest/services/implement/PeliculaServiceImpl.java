package com.cine.reservations.apirest.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cine.reservations.apirest.models.dao.IPeliculaDAO;
import com.cine.reservations.apirest.models.entities.Pelicula;
import com.cine.reservations.apirest.services.interfaces.IPeliculaService;

@Service
public class PeliculaServiceImpl implements IPeliculaService {

	@Autowired
	private IPeliculaDAO peliculaDAO;
	
	@Override
	public List<Pelicula> findAllDisponibles() {
		return peliculaDAO.findAll();
	}

	@Override
	public List<Pelicula> findAllNoDisponibles() {
		return peliculaDAO.findAllNoDisponibles();
	}

	@Override
	public Pelicula findById(Long id) {
		return peliculaDAO.findById(id).orElse(null);
	}

	@Override
	public Pelicula save(Pelicula pelicula) {
		return peliculaDAO.save(pelicula);
	}

	@Override
	public Pelicula changeEstate(Pelicula pelicula) {
		return peliculaDAO.save(pelicula);
	}

	@Override
	public List<Pelicula> isExist(Pelicula pelicula) {
		return peliculaDAO.findByNombreSinopsis(pelicula);
	}

}
