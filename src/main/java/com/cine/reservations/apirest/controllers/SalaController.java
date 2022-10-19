package com.cine.reservations.apirest.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cine.reservations.apirest.models.entities.Sala;
import com.cine.reservations.apirest.services.interfaces.ISalaService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class SalaController {
	
	
	@Autowired 
	private ISalaService salaService;
	

	@GetMapping("/salas")
	public List<Sala> getAll (){
		return salaService.findAll();
	}
	
	@GetMapping("/salas/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Sala sala = null;
		Map<String, Object> response = new HashMap<>();
		try {
			sala = salaService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta con en la base de datos");
			response.put("error", e.getMessage());
		}
		if(sala == null) {							
			response.put("message", "La sala on ID: ".concat(id.toString().concat("no existe en la bse de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Sala>(sala, HttpStatus.OK);
	}
	
	
	@PostMapping("/salas")
	public ResponseEntity<?> save(@RequestBody Sala sala){
		Map<String, Object> response = new HashMap<>();
		try {
			if(salaService.findByCodigo(sala.getCodigo()).size() > 0 && sala.getId() == null) {
				response.put("message", "Ya existe una sala con este codigo en la base de datos");
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CONFLICT);
			}else {
				salaService.save(sala);
			}
			
		}catch(DataAccessException e){
			response.put("message", "Error al insertar registro en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
			
		}
		response.put("message", "Sala registrada con exito...");
		response.put("sala", sala);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/salas/{id}")
	public ResponseEntity<?> update(@RequestBody Sala sala, @PathVariable Long id){
		
		Sala salaActual = salaService.findById(id);
		Sala salaUpdated = null;
		Map<String, Object> response = new HashMap<>();
			if(salaActual == null) {
				response.put("message", "Error: no se puede editar, la sala con ID:".concat(id.toString().concat("No existe en la base de datos")));
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
			}
			try {
				salaActual.setCodigo(sala.getCodigo());
				salaActual.setNumero_asientos(sala.getNumero_asientos());
				salaUpdated = salaService.save(salaActual);
				
			}catch(DataAccessException e) {
				response.put("message", "Error al actualizar la sala");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message", "Sala actualizada con exito..");
			response.put("sala", salaUpdated);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/salas/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		Map<String, Object> response = new HashMap<>();
		
		try {
			salaService.delete(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al eliminar la sala de la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Sala eliminada con exito...");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		
	}
	
	
}
