package com.cine.reservations.apirest.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cine.reservations.apirest.models.entities.Reserva;
import com.cine.reservations.apirest.services.interfaces.IReservaService;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class ReservaController {
	@Autowired
	private IReservaService reservaService;
	
	
	@GetMapping("/reservas")
	public List<Reserva> getAllActivas(@RequestParam(name = "fecha", required = false) Date fecha){
		return reservaService.findAllActivas(fecha);
	}
	

	@GetMapping("/reservas/canceladas")
	public List<Reserva> getAllCanceladas(@RequestParam(name = "fecha", required = false) Date fecha){
		return reservaService.findAllCanceladas(fecha);
	}
	

	@GetMapping("/reservas/despachadas")
	public List<Reserva> getAllDespachadas(@RequestParam(name = "fecha", required = false) Date fecha){
		return reservaService.findAllDespachadas(fecha);
	}
	
	
	@GetMapping("/reservas/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Reserva reserva = null;
		Map<String, Object> response = new HashMap<>();
		try {
			reserva = reservaService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(reserva == null) {
			response.put("message", "La reserva con ID: " .concat(id.toString().concat(" No existen en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Reserva>(reserva,HttpStatus.OK);
	}
	
	
	@PostMapping("/reservas")
	public ResponseEntity<?> saveOrUpdate(@RequestBody Reserva reserva){
		Map<String, Object> response = new HashMap<>();
		try {
			reservaService.saveOrUpdate(reserva);
		}catch(RuntimeException e) {
			response.put("error", "Error al insertar esta reserva en la base de datos: "+e.getMessage());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Reserva registrada con exito...");
		response.put("reserva", reserva);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);
	}
	

	@PutMapping("/reservas/change-state")
	public ResponseEntity<?> changeState(@RequestBody Reserva reserva, @RequestParam(name = "estado") String estado){
			
		Map<String, Object> response = new HashMap<>();
		try {
			reserva.setEstado(estado);
			if(estado.equals("D")) {
				Date fechaDesp = new Date();
				reserva.setFechaDespacho(fechaDesp);
			}
			reservaService.saveOrUpdate(reserva);
			
		}catch(DataAccessException e) {
			response.put("message", "Error al cambiar estado de la orden");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(estado.equals("D"))
			estado = "Despachada";
		else
			estado = "Cancelada";
		response.put("message", "El estado de la reserva ha sido cambiado a: "+estado.toString());
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
}

}
