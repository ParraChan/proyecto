package com.example.springboot.financiera.creditapp.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "creditos")
public class Credito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_credito")
    private Long id_credito;

    @Column(name = "monto_credito", nullable = false)
    @NotNull(message = "El monto no puede estar vacio")
    private BigDecimal monto_credito;

    @Column(name = "fecha_entrega", nullable = false)
    @NotNull(message = "La fecha no puede estar vacia")
    private LocalDate fecha_entrega;

    // Usamos String para enums para mantener simple y evitar clases extra
    @Column(name = "numero_pagos", nullable = false, columnDefinition = "ENUM('10', '12', '16', '24')")
    @NotEmpty(message = "Numero de pagos no puede estar vacio")
    @JsonFormat(pattern = "Solo pueden ser '10', '12', '16', '24'")
    private String numero_pagos;

    @Column(name = "frecuencia_pagos", nullable = false, columnDefinition = "ENUM('semanal', 'quincenal', 'mensual')")
    @NotEmpty(message = "Frecuencia de pagos no puede estar vacio")
    @JsonFormat(pattern = "Solo pueden ser 'semanal', 'quincenal', 'mensual'")
    private String frecuencia_pagos;

    @Column(name = "estatus_pago", nullable = false, columnDefinition = "ENUM('Pagado', 'Pendiente')")
    @NotEmpty(message = "Estatus de pago no puede estar vacio")
    @JsonFormat(pattern = "Solo pueden ser 'Pagado', 'Pendiente'")
    private String estatus_pago;
    
    @JsonIgnoreProperties("creditos")
    @NotNull(message = "Es necesario seleccionar un cliente")
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;


    @JsonIgnoreProperties("creditos")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = true)
    private Usuario usuario;


    public Long getId_credito() {
        return id_credito;
    }


    public void setId_credito(Long id_credito) {
        this.id_credito = id_credito;
    }


    public BigDecimal getMonto_credito() {
        return monto_credito;
    }


    public void setMonto_credito(BigDecimal monto_credito) {
        this.monto_credito = monto_credito;
    }


    public LocalDate getFecha_entrega() {
        return fecha_entrega;
    }


    public void setFecha_entrega(LocalDate fecha_entrega) {
        this.fecha_entrega = fecha_entrega;
    }


    public String getNumero_pagos() {
        return numero_pagos;
    }


    public void setNumero_pagos(String numero_pagos) {
        this.numero_pagos = numero_pagos;
    }


    public String getFrecuencia_pagos() {
        return frecuencia_pagos;
    }


    public void setFrecuencia_pagos(String frecuencia_pagos) {
        this.frecuencia_pagos = frecuencia_pagos;
    }


    public String getEstatus_pago() {
        return estatus_pago;
    }


    public void setEstatus_pago(String estatus_pago) {
        this.estatus_pago = estatus_pago;
    }


    public Cliente getCliente() {
        return cliente;
    }


    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }


    public Usuario getUsuario() {
        return usuario;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    
   

}
