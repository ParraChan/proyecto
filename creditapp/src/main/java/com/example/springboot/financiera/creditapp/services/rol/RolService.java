package com.example.springboot.financiera.creditapp.services.rol;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.example.springboot.financiera.creditapp.entities.Rol;

@Service
public interface RolService {

    List<Rol> findAll();
    
    Optional<Rol> findById(@NonNull Long id_rol);

}
