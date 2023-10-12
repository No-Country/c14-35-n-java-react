package com.learning.simplified.services;

import com.learning.simplified.dto.DatosLoginUsuarioDTO;
import com.learning.simplified.dto.RespuestaUsuarioDTO;
import com.learning.simplified.dto.RolDTO;
import com.learning.simplified.entidades.Usuario;
import com.learning.simplified.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private  RolService rolService;


    @Transactional
    public Usuario registrarUsuario(Usuario usuario) {
        if(usuarioRepository.findByEmail(usuario.getEmail())!= null){
            throw new RuntimeException("El mail ingresado ya está registrado en la base de datos");
        }

        rolService.guardarRol(usuario.getRol());
        Usuario usuarioDevuelto = usuarioRepository.save(usuario);
        return usuario;
    }

    public RespuestaUsuarioDTO login(DatosLoginUsuarioDTO datosLoginUsuarioDTO) {
        Usuario usuarioRecibido = new Usuario(datosLoginUsuarioDTO);
        Usuario usuarioEncontrado = usuarioRepository.findByEmail(usuarioRecibido.getEmail());

        if(usuarioEncontrado == null){
            throw new RuntimeException("Usuario no encontrado en la base de datos");
        }

        if(!usuarioRecibido.getPassword().equals(usuarioEncontrado.getPassword())){
            throw new RuntimeException("La contraseña ingresada es incorrecta");
        }


        return new RespuestaUsuarioDTO(usuarioEncontrado.getNombre(), usuarioEncontrado.getApellido(), usuarioEncontrado.getEmail(), usuarioEncontrado.getAlta(), new RolDTO(usuarioEncontrado.getRol().getEstudiante(), usuarioEncontrado.getRol().getEducador(),usuarioEncontrado.getRol().getAdministrador()));
    }
}
