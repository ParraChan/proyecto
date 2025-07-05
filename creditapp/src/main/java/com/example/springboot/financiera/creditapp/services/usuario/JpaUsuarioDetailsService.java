package com.example.springboot.financiera.creditapp.services.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.springboot.financiera.creditapp.entities.Usuario;
import com.example.springboot.financiera.creditapp.repositories.UsuarioRepository;

@Service
public class JpaUsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String nombreusuario) throws UsernameNotFoundException {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByNombreusuario(nombreusuario);

        if (optionalUsuario.isEmpty()) {
            throw new UsernameNotFoundException("El usuario " + nombreusuario + " no existe en el sistema");
        }

        Usuario usuario = optionalUsuario.get();

        List<GrantedAuthority> authorities = List.of(
            new SimpleGrantedAuthority(usuario.getPuesto().getNombre_rol()) 
        );

        return new org.springframework.security.core.userdetails.User(
            usuario.getNombreusuario(),
            usuario.getContrasena(),
            true, true, true, true,
            authorities
        );
    }
}
