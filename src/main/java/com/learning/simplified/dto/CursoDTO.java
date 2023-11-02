package com.learning.simplified.dto;

import com.learning.simplified.entities.*;

import java.time.LocalDate;
import java.util.List;

public record CursoDTO(
        Long id,
        String nombre,
        String descripcion,
        RutaAprendizaje rutaAprendizaje,
        List<Usuario> usuario,
        UsuarioDTOTemp profesor,
        Boolean activo,
        List<Categoria> categorias,
        List <Bloque> bloques,
        LocalDate alta,
        String url_video_presentacion,
        String url_imagen_presentacion,
        Boolean auto_activate,
        String subtitle

) {
    public CursoDTO(Curso course) {
        this(course.getId(), course.getNombre(), course.getDescripcion(), course.getRutaAprendizaje(), course.getUsuario(), new UsuarioDTOTemp(course.getProfesor()),
                course.getActivo(), course.getCategorias(), course.getBloques(), course.getAlta(), course.getUrl_imagen_presentacion(),
                course.getUrl_video_presentacion(), course.getAuto_activate(), course.getSubtitle());
    }
}
