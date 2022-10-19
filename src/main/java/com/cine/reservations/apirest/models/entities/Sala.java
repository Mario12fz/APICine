package com.cine.reservations.apirest.models.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="salas", schema ="public", catalog = "db_cine")
public class Sala implements Serializable {
private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="id", nullable=false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="codigo", nullable=false, length=10)
	private String codigo;
	
	@Column(name="numero_Asientos", nullable=false, length=10)
	private int numero_asientos;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public int getNumero_asientos() {
		return numero_asientos;
	}

	public void setNumero_asientos(int numero_asientos) {
		this.numero_asientos = numero_asientos;
	}
	
	
}
