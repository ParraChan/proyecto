package com.example.springboot.financiera.creditapp.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.financiera.creditapp.entities.Cliente;
import com.example.springboot.financiera.creditapp.services.cliente.ClienteService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping
    public List<Cliente> list(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> showCliente(@PathVariable Long id){
         Optional<Cliente> clienteOpcional =service.findById(id);
         if(clienteOpcional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(clienteOpcional.orElseThrow());
         }
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error","No se encontro cliente por id: " + id));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result){
       
         if (result.hasErrors()) {
        return validation(result);
    }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@Valid @RequestBody Cliente cliente, BindingResult result) {
    
    
        if (result.hasErrors()) return validation(result);

        
        Optional<Cliente> clienteOptional = service.update(cliente, id);
        if (clienteOptional.isPresent()) {

            return ResponseEntity.ok(service.save(clienteOptional.orElseThrow()));
            

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro cliente para actualizar "));
    }
/* 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Cliente> clienteOptional = service.findById(id);
        if (clienteOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro cliente para eliminar "));

       
    }*/
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
    Optional<Cliente> clienteOptional = service.findById(id);

    if (!clienteOptional.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Collections.singletonMap("error", "No se encontró el cliente para eliminar."));
    }

    try {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    } catch (DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("error", "No se puede eliminar el cliente porque tiene créditos asociados."));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Error inesperado al eliminar el cliente."));
    }
}

    private ResponseEntity<?> validation(BindingResult result) {
    Map<String, String> errors = new HashMap<>();
    result.getFieldErrors().forEach(error -> {
        errors.put(error.getField(), error.getDefaultMessage());
    });
    return ResponseEntity.badRequest().body(errors);
    }

}
