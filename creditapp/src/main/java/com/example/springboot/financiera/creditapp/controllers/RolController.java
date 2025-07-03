package com.example.springboot.financiera.creditapp.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.financiera.creditapp.entities.Rol;
import com.example.springboot.financiera.creditapp.services.rol.RolService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public List<Rol> list(){
        return rolService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCliente(@PathVariable Long id){
    Optional<Rol> rolOptional = rolService.findById(id);
    if(rolOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(rolOptional.orElseThrow());

        }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error","No se encontro rol por id: " + id));

    }

}
