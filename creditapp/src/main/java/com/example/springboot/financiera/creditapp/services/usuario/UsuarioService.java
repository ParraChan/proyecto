package com.example.springboot.financiera.creditapp.services.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.example.springboot.financiera.creditapp.entities.Usuario;

public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(@NonNull Long id_usuario);

    Usuario save(Usuario usuario);

    void deleteById(Long id_usuario);
}

