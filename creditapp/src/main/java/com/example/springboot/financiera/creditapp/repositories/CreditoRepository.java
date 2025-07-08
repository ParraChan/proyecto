package com.example.springboot.financiera.creditapp.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Credito;

public interface CreditoRepository extends CrudRepository<Credito, Long> {

    List<Credito> findByUsuarioIdUsuario(Long idUsuario);

}
