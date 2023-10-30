package com.learning.simplified.dto;

import com.learning.simplified.entities.*;

import java.time.LocalDate;
import java.util.List;

/**
 * RECORD PARA PRUEBAS
 * @param id
 * @param nombre
 * @param descripcion
 * @param rutaAprendizaje
 * @param usuario
 * @param profesor
 * @param activo
 * @param categorias
 * @param bloques
 * @param alta
 * @param url_video_presentacion
 * @param url_imagen_presentacion
 * @param auto_activate
 * @param subtitle
 */

public record CursoDTOtemp(

        Long id,
        String nombre,
        String descripcion,
        RutaAprendizaje rutaAprendizaje,
        List<Usuario> usuario,
        Usuario profesor,
        Boolean activo,
        List<Categoria> categorias,
        List <Bloque> bloques,
        LocalDate alta,
        String url_video_presentacion,
        String url_imagen_presentacion,
        Boolean auto_activate,
        String subtitle
) {
    public CursoDTOtemp(Curso course) {
        this(course.getId(), course.getNombre(), course.getDescripcion(), course.getRutaAprendizaje(), course.getUsuario(), course.getProfesor(),
                course.getActivo(), course.getCategorias(), course.getBloques(), course.getAlta(), course.getUrl_imagen_presentacion(),
                course.getUrl_video_presentacion(), course.getAuto_activate(), course.getSubtitle());
    }
}
