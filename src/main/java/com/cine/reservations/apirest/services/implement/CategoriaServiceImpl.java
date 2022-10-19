package com.cine.reservations.apirest.services.implement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cine.reservations.apirest.models.dao.ICategoriaDAO;
import com.cine.reservations.apirest.models.entities.Categoria;
import com.cine.reservations.apirest.services.interfaces.ICategoriaService;

@Service
public class CategoriaServiceImpl implements ICategoriaService{

	@Autowired
	private ICategoriaDAO categoriaDAO;
	
	@Override
	public List<Categoria> findAll() {
		return (List<Categoria>)categoriaDAO.findAll();
		
	}

	@Override
	public Categoria findById(Long id) {
		return categoriaDAO.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Categoria save(Categoria categoria) {
		
		return categoriaDAO.save(categoria);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		categoriaDAO.deleteById(id);
		
	}

	@Override
	public List<Categoria> findByNombre(String nombre) {		
		return categoriaDAO.findByNombreIgnoreCase(nombre);
	}

}
