package com.example.springboot.financiera.creditapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.springboot.financiera.creditapp.entities.Credito;

public interface CreditoRepository extends CrudRepository<Credito, Long> {

}
