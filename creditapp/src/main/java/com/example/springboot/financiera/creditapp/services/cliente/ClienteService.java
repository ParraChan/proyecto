package com.example.springboot.financiera.creditapp.services.cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.example.springboot.financiera.creditapp.entities.Cliente;

public interface ClienteService {

    List<Cliente> findAll();

    Optional<Cliente> findById(@NonNull Long id_cliente);

    Cliente save(Cliente cliente);

    void deleteById(Long id_cliente);

    Optional<Cliente> update(Cliente cliente, Long id);



}
