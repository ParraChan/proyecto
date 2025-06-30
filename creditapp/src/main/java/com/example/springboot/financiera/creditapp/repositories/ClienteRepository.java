package com.example.springboot.financiera.creditapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Cliente;
//cudrepositoru y entre pacman la clase entity con su llave primaria 
public interface ClienteRepository extends CrudRepository<Cliente, Long>{

    

}
