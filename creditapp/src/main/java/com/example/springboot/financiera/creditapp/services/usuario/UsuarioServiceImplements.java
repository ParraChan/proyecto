package com.example.springboot.financiera.creditapp.services.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.example.springboot.financiera.creditapp.entities.Usuario;
import com.example.springboot.financiera.creditapp.repositories.UsuarioRepository;

@Service
public class UsuarioServiceImplements implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> findAll() {
        return (List) usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(@NonNull Long id_usuario) {
        return usuarioRepository.findById(id_usuario);
    }

    @Override
    public Usuario save(Usuario usuario) {
        validarDuplicados(usuario);
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteById(Long id_usuario) {
        usuarioRepository.deleteById(id_usuario);
    }

    private void validarDuplicados(Usuario usuario){
        Optional<Usuario> existente = usuarioRepository.findByNombreusuario(usuario.getNombreusuario());

    if (existente.isPresent() && !existente.get().getId_usuario().equals(usuario.getId_usuario())) {    
    throw new IllegalArgumentException("El usuario ya existe");
}
    }

    

}
