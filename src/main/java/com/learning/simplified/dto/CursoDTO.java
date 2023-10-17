package com.learning.simplified.dto;

import com.learning.simplified.entidades.Bloque;
import com.learning.simplified.entidades.Categoria;
import com.learning.simplified.entidades.RutaAprendizaje;
import com.learning.simplified.entidades.Usuario;
import jakarta.persistence.*;

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
        String url_imagen_presentacion

) {
}
