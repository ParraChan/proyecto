package com.example.springboot.financiera.creditapp.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.financiera.creditapp.entities.Usuario;
import com.example.springboot.financiera.creditapp.models.UsuarioRequest;
import com.example.springboot.financiera.creditapp.repositories.UsuarioRepository;
import com.example.springboot.financiera.creditapp.services.usuario.UsuarioService;

import jakarta.validation.Valid;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

  

    @GetMapping
    @PreAuthorize("hasRole('SUPERVISOR')")
    public List<Usuario> list(){
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('SUPERVISOR')")
    public ResponseEntity<?> showUsuario(@PathVariable Long id){
        Optional<Usuario> usuarOptional = usuarioService.findById(id);
        if(usuarOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(usuarOptional.orElseThrow());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro usuario por id " + id));
    }

    @PostMapping
    @PreAuthorize("hasRole('SUPERVISOR')")
    public ResponseEntity<?> create(@Valid @RequestBody Usuario usuario, BindingResult result){
        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuario));        
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SUPERVISOR')")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody UsuarioRequest usuario, BindingResult result){
        if (result.hasErrors()) return validation(result);

        Optional<Usuario> usuarOptional = usuarioService.update(usuario, id);
        if(usuarOptional.isPresent()){
           
            return ResponseEntity.ok((usuarOptional.orElseThrow()));

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro usuario para actualizar "));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPERVISOR')")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Usuario> usuarOptional = usuarioService.findById(id);
        if(usuarOptional.isPresent()){
            usuarioService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "No se encontro usuario para eliminar "));

    }
    @GetMapping("/usuario/{username}")
    @PreAuthorize("hasRole('SUPERVISOR')")
public ResponseEntity<Usuario> findByUsername(@PathVariable String username) {
    Usuario usuario = usuarioRepository.findByNombreusuario(username).orElseThrow();
    if (usuario != null) {
        return ResponseEntity.ok(usuario);
    } else {
        return ResponseEntity.notFound().build();
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
