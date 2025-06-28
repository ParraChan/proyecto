package com.example.springboot.financiera.creditapp.entities;

import static jakarta.persistence.GenerationType.IDENTITY;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "creditos")
public class Credito {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id_credito;

    @NotEmpty(message = "monto de credito es obligatiorio")
    private BigDecimal monto_credito;

    @NotEmpty(message = "Seleccione una fecha de entrega")
    private LocalDate fecha_entrega;

    @Enumerated(EnumType.STRING)
    @NotEmpty(message = "no puede ser nulo")
    private NumeroPagos numero_pagos;

    @Enumerated(EnumType.STRING)
    @NotEmpty(message = "no puede ser nulo")
    private FrecuenciaPagos frecuencia_pagos;

    @Enumerated(EnumType.STRING)
    @NotEmpty(message = "no puede ser nulo")
    private EstatusPago estatus_pago;

    public enum NumeroPagos {
    _10, _12, _16, _24;

    @Override
    public String toString() {
        return name().substring(1); 
    }
    }

    public enum FrecuenciaPagos {
        semanal, quincenal, mensual
    }

    public enum EstatusPago {
        Pagado,
        Pendiente_de_pago 
    }





}
