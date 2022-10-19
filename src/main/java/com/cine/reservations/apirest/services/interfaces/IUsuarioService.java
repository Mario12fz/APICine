package com.cine.reservations.apirest.services.interfaces;

import com.cine.reservations.apirest.models.entities.Usuario;

public interface IUsuarioService {
	
	public Usuario findByuserName(String username);

}
