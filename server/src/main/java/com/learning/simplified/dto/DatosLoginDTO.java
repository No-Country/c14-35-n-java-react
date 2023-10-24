package com.learning.simplified.dto;

import com.learning.simplified.entities.Curso;
import com.learning.simplified.entities.Imagen;
import com.learning.simplified.enumeraciones.Rol;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

public record DatosLoginDTO(
        Long id,
        String nombre,
        String apellido,
        String email,
        LocalDate alta,
        Rol rol,

        List<Curso> curso,
        Imagen imagen
) {
}
