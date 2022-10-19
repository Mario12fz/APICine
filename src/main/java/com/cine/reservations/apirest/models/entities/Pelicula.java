package com.cine.reservations.apirest.models.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="peliculas", schema = "public", catalog = "db_cine")
public class Pelicula implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", nullable = false, length = 50)
	private String nombre;
	
	@Column(name = "sinopsi", nullable = false, length = 200)
	private String sinopsi;
	
	@Column(name = "imagen", nullable = true, length = 100)
	private String imagen;
	
	@Column(name = "precio", nullable = false, precision = 2)
	private Double precio;
	
	@Column(name = "fecha_inicio", nullable = false)
	private Date fecha_inicio;
	
	@Column(name = "fecha_fin", nullable = false)
	private Date fecha_fin;
	
	@Column(name = "hora_proyeccion", nullable = false, length = 15)
	private String hora_proyeccion;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name = "sala_id", referencedColumnName = "id", nullable = false)
	private Sala sala;
	
	
	@Column(name = "estado", nullable = false, length = 1)
	private String estado;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	@JoinColumn(name = "categoria_id", referencedColumnName = "id", nullable = false)
	private Categoria categoria;
	

	@PrePersist
	private void setEstado() {
		this.estado = "D";
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getSinopsi() {
		return sinopsi;
	}

	public void setSinopsi(String sinopsi) {
		this.sinopsi = sinopsi;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public Date getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}

	public Date getFecha_fin() {
		return fecha_fin;
	}

	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}

	public String getHora_proyeccion() {
		return hora_proyeccion;
	}

	public void setHora_proyeccion(String hora_proyeccion) {
		this.hora_proyeccion = hora_proyeccion;
	}

	public Sala getSala() {
		return sala;
	}

	public void setSala(Sala sala) {
		this.sala = sala;
	}
	
	
	
	
	
}
