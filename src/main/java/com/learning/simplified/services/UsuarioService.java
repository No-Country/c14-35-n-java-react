package com.learning.simplified.services;

import com.learning.simplified.entidades.Usuario;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private  RolService rolService;


    @Transactional
    public Usuario registrarUsuario(Usuario usuario) {
        rolService.guardarRol(usuario.getRol());
        Usuario usuarioDevuelto = usuarioRepository.save(usuario);
        return usuario;
    }
}
