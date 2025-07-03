package com.example.springboot.financiera.creditapp.services.credito;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Credito;
import com.example.springboot.financiera.creditapp.repositories.CreditoRepository;


@Service
public class CreditoServiceImplements implements CreditoService {

    @Autowired
    private CreditoRepository creditoRepository;

    @Override
    @Transactional(readOnly=true)
    public List<Credito> findAll() {
        return (List) creditoRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)
    public Optional<Credito> findById(@NonNull Long id_credito) {
        return creditoRepository.findById(id_credito);
    }

    @Override
    public Credito save(Credito credito) {
        return creditoRepository.save(credito);
    }

    @Override
    public void deleteById(Long id_credito) {
        creditoRepository.deleteById(id_credito);
    }

}
