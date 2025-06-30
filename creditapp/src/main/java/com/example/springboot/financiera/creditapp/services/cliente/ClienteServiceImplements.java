package com.example.springboot.financiera.creditapp.services.cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Cliente;
import com.example.springboot.financiera.creditapp.repositories.ClienteRepository;

@Service
public class ClienteServiceImplements implements ClienteService {
   
    @Autowired
    private ClienteRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        return (List) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Cliente> findById(@NonNull Long id_cliente) {
        return repository.findById(id_cliente);
    }

    @Override
    @Transactional
    public Cliente save(Cliente cliente) {
        return repository.save(cliente);
    }

    @Override
    @Transactional
    public void deleteById(Long id_cliente) {
         repository.deleteById(id_cliente);
    }



}
