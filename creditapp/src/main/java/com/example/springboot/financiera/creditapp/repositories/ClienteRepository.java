package com.example.springboot.financiera.creditapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Long>{

    

}
