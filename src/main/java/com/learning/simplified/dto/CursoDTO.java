package com.learning.simplified.dto;

import com.learning.simplified.entities.Bloque;
import com.learning.simplified.entities.Categoria;
import com.learning.simplified.entities.RutaAprendizaje;
import com.learning.simplified.entities.Usuario;

import java.time.LocalDate;
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
        List <Bloque> bloques,
        LocalDate alta,
        String url_video_presentacion,
        String url_imagen_presentacion,
        Boolean auto_activate,
        String subtitle

) {
}
