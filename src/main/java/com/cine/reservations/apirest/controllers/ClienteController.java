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
import com.cine.reservations.apirest.models.entities.Cliente;
import com.cine.reservations.apirest.services.interfaces.IClienteService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class ClienteController {

	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/clientes")
	public List<Cliente> getAll(){
		return clienteService.findAll();
	}
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		try {
			cliente = clienteService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(cliente == null) {
			response.put("message", "El ciente con ID: ".concat(id.toString().concat("No existen en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Cliente>(cliente,HttpStatus.OK);
	}
	@PostMapping("/clientes")
	public ResponseEntity<?> save(@RequestBody Cliente cliente) {
		Map<String, Object> response = new HashMap<>();
		try {
			if(clienteService.isExist(cliente).size() > 0 && cliente.getId()== null) {
				response.put("message", "Este numero de telefono ya existe");
				return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CONFLICT);			
			}else {
				clienteService.save(cliente);
			}
		}catch(DataAccessException e) {
			response.put("message", "Error al insertar registro en la base de datos");
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Cliente registrado con ??xito...");
		response.put("cliente", cliente);
		return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);		
	}
	
	// Actualizar cliente
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@RequestBody Cliente cliente, @PathVariable Long id){
		
		Cliente clienteActual = clienteService.findById(id);
		Cliente clienteUpdated = null;
		Map<String, Object> response = new HashMap<>();
			if(clienteActual == null) {
				response.put("message", "Error: no se puede editar, el cliente ID:".concat(id.toString().concat("No existe en la base de datos")));
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
			}
			try {
				clienteActual.setNombre(cliente.getNombre());
				clienteActual.setFecha_nac(cliente.getFecha_nac());
				clienteActual.setTelefono(cliente.getTelefono());			
				clienteActual.setCreateAt(cliente.getCreateAt());				
				clienteUpdated = clienteService.save(clienteActual);
				
			}catch(DataAccessException e) {
				response.put("message", "Error al actualizar el cliente");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message", "Cliente actualizado con exito..");
			response.put("cliente", clienteUpdated);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		Map<String, Object> response = new HashMap<>();
		
		try {
			clienteService.delete(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al eliminar el cliente de la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("message", "Cliente eliminado con exito...");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
		
	}
}
