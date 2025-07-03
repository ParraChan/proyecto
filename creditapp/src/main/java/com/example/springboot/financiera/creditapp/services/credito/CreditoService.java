package com.example.springboot.financiera.creditapp.services.credito;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

import com.example.springboot.financiera.creditapp.entities.Credito;

public interface CreditoService {

    List<Credito> findAll();

    Optional<Credito> findById(@NonNull Long id_credito);

    Credito save(Credito credito);

    void deleteById(Long id_credito);

}
