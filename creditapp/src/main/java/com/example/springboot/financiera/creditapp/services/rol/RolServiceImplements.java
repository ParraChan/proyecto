package com.example.springboot.financiera.creditapp.services.rol;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Rol;
import com.example.springboot.financiera.creditapp.repositories.RolRepository;

@Service
public class RolServiceImplements implements RolService {


    @Autowired
    private RolRepository rolRepository;

    @Override
    @Transactional(readOnly=true)

    public List<Rol> findAll() {
        return (List) rolRepository.findAll();
    }

    @Override
    @Transactional(readOnly=true)

    public Optional<Rol> findById(@NonNull Long id_rol) {
        return rolRepository.findById(id_rol);
    }

}
