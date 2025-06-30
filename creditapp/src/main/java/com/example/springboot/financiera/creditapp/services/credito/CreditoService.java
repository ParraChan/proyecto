package com.example.springboot.financiera.creditapp.services.credito;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.example.springboot.financiera.creditapp.entities.Credito;

@Service
public interface CreditoService {

    List<Credito> findAll();

    Optional<Credito> findById(@NonNull Long id_cliente);

    Credito save(Credito cliente);

    void deleteById(Long id_credito);

}
