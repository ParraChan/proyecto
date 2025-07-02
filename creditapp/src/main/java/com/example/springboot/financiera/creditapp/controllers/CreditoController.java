package com.example.springboot.financiera.creditapp.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.financiera.creditapp.entities.Credito;
import com.example.springboot.financiera.creditapp.services.credito.CreditoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/creditos")
public class CreditoController {

    @Autowired
    private CreditoService creditoService;

    @GetMapping
    public List<Credito> list(){
        return creditoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCredito(@PathVariable Long id){
        Optional<Credito> creditoOptional = creditoService.findById(id);
        if(creditoOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(creditoOptional.orElseThrow());
         }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error","No se encontro credito por id: " + id));

    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Credito credito, BindingResult result){

         if (result.hasErrors()) {
        return validation(result);
    }
        return ResponseEntity.status(HttpStatus.CREATED).body(creditoService.save(credito));

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Credito credito, BindingResult result){
        if (result.hasErrors()) return validation(result);

        Optional<Credito> credOptional = creditoService.findById(id);
        if(credOptional.isPresent()){
            Credito creditoDb = credOptional.get();
            creditoDb.setMonto_credito(credito.getMonto_credito());
            creditoDb.setFecha_entrega(credito.getFecha_entrega());
            creditoDb.setNumero_pagos(credito.getNumero_pagos());
            creditoDb.setFrecuencia_pagos(credito.getFrecuencia_pagos());
            creditoDb.setEstatus_pago(credito.getEstatus_pago());
            creditoDb.setCliente(credito.getCliente());
            creditoDb.setUsuario(credito.getUsuario());

            return ResponseEntity.ok(creditoService.save(creditoDb));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro Credito para actualizar "));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Credito> credOptional = creditoService.findById(id);
        if(credOptional.isPresent()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro Credito para Eliminar "));


    }



     private ResponseEntity<?> validation(BindingResult result) {
    Map<String, String> errors = new HashMap<>();
    result.getFieldErrors().forEach(error -> {
        errors.put(error.getField(), "El campo " + error.getField() + " " + error.getDefaultMessage());
    });
    return ResponseEntity.badRequest().body(errors);
    }



}
