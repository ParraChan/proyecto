package com.example.springboot.financiera.creditapp.services.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.example.springboot.financiera.creditapp.entities.Usuario;
import com.example.springboot.financiera.creditapp.models.UsuarioRequest;

public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(@NonNull Long id_usuario);

    Usuario save(Usuario usuario);

    Optional<Usuario> update(UsuarioRequest usuario, Long id);

    void deleteById(Long id_usuario);


     // ajusta al nombre real del campo
}

    

    


