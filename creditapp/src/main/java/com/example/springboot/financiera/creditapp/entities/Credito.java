package com.example.springboot.financiera.creditapp.entities;

import static jakarta.persistence.GenerationType.IDENTITY;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.example.springboot.financiera.creditapp.exceptions.EstatusPagoConverter;
import com.example.springboot.financiera.creditapp.exceptions.FrecuenciaPagosConverter;
import com.example.springboot.financiera.creditapp.exceptions.NumeroPagosConverter;
import com.fasterxml.jackson.annotation.JsonCreator;

@Entity
@Table(name = "creditos")
public class Credito {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id_credito;

    @NotEmpty(message = "monto de credito es obligatiorio")
    private BigDecimal monto_credito;

    @NotNull(message = "Seleccione una fecha de entrega")
    private LocalDate fecha_entrega;

    @Convert(converter = NumeroPagosConverter.class)
    @NotNull(message = "no puede ser nulo")
    private NumeroPagos numero_pagos;

    @Convert(converter = EstatusPagoConverter.class)
    @NotNull(message = "no puede ser nulo")
    private FrecuenciaPagos frecuencia_pagos;

    @Convert(converter = FrecuenciaPagosConverter.class)
    @NotNull(message = "no puede ser nulo")
    private EstatusPago estatus_pago;

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

    public NumeroPagos getNumero_pagos() {
        return numero_pagos;
    }

    public void setNumero_pagos(NumeroPagos numero_pagos) {
        this.numero_pagos = numero_pagos;
    }

    public FrecuenciaPagos getFrecuencia_pagos() {
        return frecuencia_pagos;
    }

    public void setFrecuencia_pagos(FrecuenciaPagos frecuencia_pagos) {
        this.frecuencia_pagos = frecuencia_pagos;
    }

    public EstatusPago getEstatus_pago() {
        return estatus_pago;
    }

    public void setEstatus_pago(EstatusPago estatus_pago) {
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

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    
    public enum NumeroPagos {
    DIEZ("10"),
    DOCE("12"),
    DIECISEIS("16"),
    VEINTICUATRO("24");

    private final String value;

    NumeroPagos(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static NumeroPagos fromValue(String value) {
        for (NumeroPagos np : NumeroPagos.values()) {
            if (np.value.equals(value)) {
                return np;
            }
        }
        throw new IllegalArgumentException("Valor desconocido: " + value);
    }
}
 



    public enum FrecuenciaPagos {
    DIARIO,
    SEMANAL,
    MENSUAL
}


    public enum EstatusPago {
    Pagado("Pagado"),
    Pendiente_de_pago("Pendiente de pago");

    private final String descripcion;

    EstatusPago(String descripcion) {
        this.descripcion = descripcion;
    }

    @JsonValue
    public String getDescripcion() {
        return descripcion;
    }

    @JsonCreator
    public static EstatusPago fromDescripcion(String descripcion) {
        for (EstatusPago e : EstatusPago.values()) {
            if (e.descripcion.equals(descripcion)) {
                return e;
            }
        }
        throw new IllegalArgumentException("Valor desconocido: " + descripcion);
    }
}





}
