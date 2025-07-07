package com.example.springboot.financiera.creditapp.models;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class UsuarioRequest {
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
     
    

    

}
