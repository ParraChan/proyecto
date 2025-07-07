package com.example.springboot.financiera.creditapp.services.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Usuario;
import com.example.springboot.financiera.creditapp.models.UsuarioRequest;
import com.example.springboot.financiera.creditapp.repositories.UsuarioRepository;

@Service
public class UsuarioServiceImplements implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Usuario> findAll() {
        return (List) usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(@NonNull Long id_usuario) {
        return usuarioRepository.findById(id_usuario);
    }

    @Override
    @Transactional
    public Usuario save(Usuario usuario) {
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
       
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

    @Override
    public Optional<Usuario> update(UsuarioRequest usuario, Long id) {
         
         Optional<Usuario> usuarOptional = usuarioRepository.findById(id);
        if(usuarOptional.isPresent()){
            Usuario usuarioDb= usuarOptional.get();
            usuarioDb.setNombre(usuario.getNombre());
            usuarioDb.setApellido_paterno(usuario.getApellido_paterno());
            usuarioDb.setApellido_materno(usuario.getApellido_materno());
            usuarioDb.setFecha_nacimiento(usuario.getFecha_nacimiento());
            usuarioDb.setFecha_ingreso(usuario.getFecha_ingreso());
          //  usuarioDb.setPuesto(usuario.getPuesto());
            //usuarioDb.setNombreusuario(usuario.getNombreusuario());

                        return Optional.of(usuarioRepository.save(usuarioDb));

        }
        return Optional.empty();

    }

    

}
