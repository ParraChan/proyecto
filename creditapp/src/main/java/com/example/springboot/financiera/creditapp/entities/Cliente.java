package com.example.springboot.financiera.creditapp.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import  static jakarta.persistence.GenerationType.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id_cliente;

    @NotEmpty(message = "El nombre no puede estar vacio")
    private String nombre; 

    @NotEmpty(message = "El apellido paterno no puede estar vacio")
    private String apellido_paterno;

    @NotEmpty(message = "El apellido materno no puede estar vacio")
    private String apellido_materno;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento es en el pasado")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fecha_nacimiento;

    @NotNull(message = "debes agregar tus ingresos")
    private BigDecimal ingresos_mensuales;

    @OneToMany(mappedBy = "cliente")
    private List<Credito> creditos = new ArrayList<>();
    

    public Long getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido_paterno() {
        return apellido_paterno;
    }

    public void setApellido_paterno(String apellido_paterno) {
        this.apellido_paterno = apellido_paterno;
    }

    public String getApellido_materno() {
        return apellido_materno;
    }

    public void setApellido_materno(String apellido_materno) {
        this.apellido_materno = apellido_materno;
    }

    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public BigDecimal getIngresos_mensuales() {
        return ingresos_mensuales;
    }

    public void setIngresos_mensuales(BigDecimal ingresos_mensuales) {
        this.ingresos_mensuales = ingresos_mensuales;
    }

    public List<Credito> getCreditos() {
        return creditos;
    }

    public void setCreditos(List<Credito> creditos) {
        this.creditos = creditos;
    }


    



}
