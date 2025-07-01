package com.example.springboot.financiera.creditapp.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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



     private ResponseEntity<?> validation(BindingResult result) {
    Map<String, String> errors = new HashMap<>();
    result.getFieldErrors().forEach(error -> {
        errors.put(error.getField(), "El campo " + error.getField() + " " + error.getDefaultMessage());
    });
    return ResponseEntity.badRequest().body(errors);
    }



}
