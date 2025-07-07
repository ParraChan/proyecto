package com.example.springboot.financiera.creditapp.services.cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Cliente;
import com.example.springboot.financiera.creditapp.repositories.ClienteRepository;

import io.jsonwebtoken.security.Password;

@Service
public class ClienteServiceImplements implements ClienteService {
   
    @Autowired
    private ClienteRepository repository;

    @Autowired

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

    @Override
    @Transactional
    public Optional<Cliente> update(Cliente cliente, Long id) {
        Optional<Cliente> clienteOptional = repository.findById(id);
        if (clienteOptional.isPresent()) {
            Cliente clienteDb = clienteOptional.get();
            clienteDb.setNombre(cliente.getNombre());
            clienteDb.setApellido_paterno(cliente.getApellido_paterno());
            clienteDb.setApellido_materno(cliente.getApellido_materno());
            clienteDb.setFecha_nacimiento(cliente.getFecha_nacimiento());
            clienteDb.setIngresos_mensuales(cliente.getIngresos_mensuales());
            ;
            return Optional.of(repository.save(clienteDb));
        }
        return Optional.empty();
    }



}
