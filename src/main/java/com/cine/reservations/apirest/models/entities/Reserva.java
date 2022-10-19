package com.cine.reservations.apirest.models.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name="reservas", schema = "public", catalog = "db_cine")
public class Reserva implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	

	@Column(name = "fecha_despacho", nullable = true)
	private Date fechaDespacho;
	
	@Column(name = "total", nullable = false, precision = 2)
	private Double total;
	
	
	@Column(name = "estado", nullable = false, length = 1)
	private String estado;
	
	@ManyToOne 
	@JoinColumn(name = "cliente_id", referencedColumnName = "id", nullable = false)
	private Cliente cliente;
	
	
	//relacion 1:n con detalleReserva
		@OneToMany(mappedBy = "reserva", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
		private List<DetalleReserva> detalleReserva;
		
		@PrePersist
		private void setEstado() {
			this.estado = "A";
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Date getFecha() {
			return fecha;
		}

		public void setFecha(Date fecha) {
			this.fecha = fecha;
		}
		
		public Date getFechaDespacho() {
			return fechaDespacho;
		}

		public void setFechaDespacho(Date fechaDespacho) {
			this.fechaDespacho = fechaDespacho;
		}

		public Double getTotal() {
			return total;
		}

		public void setTotal(Double total) {
			this.total = total;
		}

		public Cliente getCliente() {
			return cliente;
		}

		public void setCliente(Cliente cliente) {
			this.cliente = cliente;
		}

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}

		public List<DetalleReserva> getDetalleReserva() {
			return detalleReserva;
		}

		public void setDetalleReserva(List<DetalleReserva> detalleReserva) {
			this.detalleReserva = detalleReserva;
		}

	
		

}
