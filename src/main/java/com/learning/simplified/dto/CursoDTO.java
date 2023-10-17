package com.learning.simplified.dto;

import com.learning.simplified.entidades.Bloque;
import com.learning.simplified.entidades.Categoria;
import com.learning.simplified.entidades.RutaAprendizaje;
import com.learning.simplified.entidades.Usuario;
import jakarta.persistence.*;

import java.util.List;

public record CursoDTO(
        Long id,
        String nombre,
        String descripcion,
        RutaAprendizaje rutaAprendizaje,
        List<Usuario> usuario,
        Long id_profesor,
        Boolean activo,
        List<Categoria> categorias,
        List <Bloque> bloques
) {
}
