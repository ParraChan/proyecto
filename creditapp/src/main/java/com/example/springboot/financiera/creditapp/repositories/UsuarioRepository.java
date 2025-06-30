package com.example.springboot.financiera.creditapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

}
