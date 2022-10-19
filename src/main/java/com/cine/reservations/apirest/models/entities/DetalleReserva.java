package com.cine.reservations.apirest.models.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name="detalle_reservas", schema = "public", catalog = "db_cine")
public class DetalleReserva  implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "boletos", nullable = false)
	private Integer boletos;
	
	@ManyToOne
	@JoinColumn(name = "pelicula_id", referencedColumnName = "id", nullable = false)
	private Pelicula pelicula;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "reserva_id", referencedColumnName = "id", nullable = false)
	private Reserva reserva;
					

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Integer getBoletos() {
		return boletos;
	}

	public void setBoletos(Integer boletos) {
		this.boletos = boletos;
	}


	public Reserva getReserva() {
		return reserva;
	}

	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}

	public Pelicula getPelicula() {
		return pelicula;
	}

	public void setPelicula(Pelicula pelicula) {
		this.pelicula = pelicula;
	}
	

}
