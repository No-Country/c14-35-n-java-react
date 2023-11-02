package com.learning.simplified.dto;

import com.learning.simplified.entities.Curso;
import com.learning.simplified.entities.Imagen;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.enumeraciones.Rol;

import java.time.LocalDate;
import java.util.List;

public record UsuarioDTOTemp(
        Long id,
        String nombre,
        String apellido,
        String email,
        String password,
        LocalDate alta,
        Rol rol,
        List<Curso> curso,
        Imagen imagen

) {
    public UsuarioDTOTemp(Usuario user) {
        this(user.getId(), user.getNombre(),user.getApellido(), user.getEmail(), "", user.getAlta(),
                user.getRol(), user.getCurso(), user.getImagen());
    }
}
