package com.learning.simplified.dto;

import com.learning.simplified.entidades.RutaAprendizaje;
import com.learning.simplified.entidades.Usuario;
import jakarta.persistence.*;

import java.util.List;

public record CursoDTO(
                Long id,
                String nombre,
                String descripcion,
                RutaAprendizaje rutaAprendizaje,
                List<Usuario> usuario
) {
}
