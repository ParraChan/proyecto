package com.example.springboot.financiera.creditapp.entities;

import static jakarta.persistence.GenerationType.IDENTITY;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;


    @Entity
    @Table(name = "usuarios")
    public class Usuario {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id_usuario;

    @NotEmpty(message = "El nombre no puede estar vacio")
    private String nombre; 

    @NotEmpty(message = "El apellido paterno no puede estar vacio")
    private String apellido_paterno;

    @NotEmpty(message = "El apellido materno no puede estar vacio")
    private String apellido_materno;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fecha_nacimiento;

    @NotNull(message = "La fecha de ingreso es obligatoria")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate fecha_ingreso;
     
    @JsonIgnoreProperties("usuarios") 
    @NotNull(message = "El rol es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol puesto;
 
    @OneToMany(mappedBy = "usuario")
    private List<Credito> creditos;

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
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

    public LocalDate getFecha_ingreso() {
        return fecha_ingreso;
    }

    public void setFecha_ingreso(LocalDate fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }


    public Rol getPuesto() {
        return puesto;
    }

    public void setPuesto(Rol puesto) {
        this.puesto = puesto;
    }


    public List<Credito> getCreditos() {
        return creditos;
    }

    public void setCreditos(List<Credito> creditos) {
        this.creditos = creditos;
    }
        

    

}
