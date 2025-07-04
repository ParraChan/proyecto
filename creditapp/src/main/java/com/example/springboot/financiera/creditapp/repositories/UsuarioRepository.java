package com.example.springboot.financiera.creditapp.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Usuario;


public interface UsuarioRepository extends CrudRepository<Usuario, Long> {



    boolean existsByNombreusuario (String nombreusuario);

    Optional<Usuario> findByNombreusuario(String nombreusuario);

}
