package com.cine.reservations.apirest.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cine.reservations.apirest.models.entities.Pelicula;
import com.cine.reservations.apirest.services.interfaces.IPeliculaService;
import com.cine.reservations.apirest.services.interfaces.IUploadFileService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api")
public class PeliculaController {
	@Autowired
	private IPeliculaService peliculaService;
	
	@Autowired
	private IUploadFileService uploadService;
	
	private Logger logger =  LoggerFactory.getLogger(PeliculaController.class);
	
	@GetMapping("/peliculas/disponibles")
	public List<Pelicula> getAllDisponibles(){
		return peliculaService.findAllDisponibles();
	}
	

	@GetMapping("/peliculas/inactivas")
	public List<Pelicula> getAllNoDisponibles(){
		return peliculaService.findAllNoDisponibles();
	}
	// Matodo get

	@GetMapping("/peliculas/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		Pelicula pelicula = null;
		Map<String, Object> response = new HashMap<>();
		try {
			pelicula = peliculaService.findById(id);
		}catch(DataAccessException e) {
			response.put("message", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage());
		}
		if(pelicula == null) {
			response.put("message", "La película con ID: " .concat(id.toString().concat(" No existen en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Pelicula>(pelicula,HttpStatus.OK);
	}
	

	@PostMapping("/peliculas")
	public ResponseEntity<?> save(@RequestPart Pelicula pelicula, @RequestPart(name= "imagen", required = false) MultipartFile imagen) throws IOException{
		String imageNewName = null;
		Map<String, Object> response = new HashMap<>();
		try {
			if(peliculaService.isExist(pelicula).size() > 0 && pelicula.getId()== null) {
				response.put("message", "Ya existe un registro con este nombre y sinopsis en la base de datos");
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CONFLICT);
			}else {
				if(imagen != null) imageNewName = uploadService.copyFile(imagen);
				pelicula.setImagen(imageNewName);
				peliculaService.save(pelicula);
			}
			
		}catch(DataAccessException e){
			response.put("message", "Error al insertar registro en la base de datos");
			logger.error("ERROR: ".concat(e.getMessage()));
			uploadService.deleteFile(imageNewName);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
			
		}
		response.put("message", "Película registrada con éxito...");
		response.put("pelicula", pelicula);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	

	@PutMapping("/peliculas/{id}")
	public ResponseEntity<?> update(@RequestPart Pelicula pelicula, @PathVariable Long id, @RequestPart(name = "imagen", required = false) MultipartFile imagen)throws IOException{
		
		String imageNewName = null;
		Pelicula peliculaActual = peliculaService.findById(id);
		Pelicula peliculaUpdated = null;
		Map<String, Object> response = new HashMap<>();
			if(peliculaActual == null) {
				response.put("message", "Error: no se puede editar, La película con ID: ".concat(id.toString().concat("no existe en la base de datos")));
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
			}
			try {
				peliculaActual.setNombre(pelicula.getNombre());
				peliculaActual.setSinopsi(pelicula.getSinopsi());
				peliculaActual.setCategoria(pelicula.getCategoria());
				peliculaActual.setSala(pelicula.getSala());
				peliculaActual.setFecha_inicio(pelicula.getFecha_inicio());
				peliculaActual.setFecha_fin(pelicula.getFecha_fin());
				peliculaActual.setHora_proyeccion(pelicula.getHora_proyeccion());
				peliculaActual.setPrecio(pelicula.getPrecio());
				if(imagen != null) {
					if(peliculaActual.getImagen() != null && peliculaActual.getImagen().length()> 0) {
						String imgAnterior = peliculaActual.getImagen();
						Path rutaImgAnterior = uploadService.getPath(imgAnterior);
						File archivoImgAnterior = rutaImgAnterior.toFile();
						if(archivoImgAnterior.exists() && archivoImgAnterior.canRead()) {
							archivoImgAnterior.delete();
						}
					}
					imageNewName = uploadService.copyFile(imagen);
					peliculaActual.setImagen(imageNewName);
				} 
				peliculaUpdated = peliculaService.save(peliculaActual);
				
			}catch(DataAccessException e) {
				response.put("message", "Error al actualizar La película");
				logger.error("ERROR: ".concat(e.getMessage()));
				uploadService.deleteFile(imageNewName);
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message", "Película actualizada con exito..");
			response.put("pelicula", peliculaUpdated);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/peliculas/change-state")
	public ResponseEntity<?> changeState(@RequestBody Pelicula pelicula, @RequestParam(name = "estado") String estado){
			
		Map<String, Object> response = new HashMap<>();
			try {
				pelicula.setEstado(estado);
				peliculaService.save(pelicula);
				
			}catch(DataAccessException e) {
				response.put("message", "Error al cambiar estado de la película");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			response.put("message", "El estado de la película ha sido cambiado a"+estado.toString());
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@PostMapping("/imagen/delete/{name}")
	public ResponseEntity<?> deleteImagen(@PathVariable(name = "name") String imagen){
		if(uploadService.deleteFile(imagen))
			return ResponseEntity.ok().build();
		else
			return ResponseEntity.status(500).build();
	}
	

	
}
