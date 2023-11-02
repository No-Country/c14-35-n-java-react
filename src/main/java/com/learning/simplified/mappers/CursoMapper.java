package com.learning.simplified.mappers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.UsuarioDTOTemp;
import com.learning.simplified.entities.Curso;
import com.learning.simplified.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CursoMapper {
    @Autowired
    private UsuarioRepository usuarioRepository;
    public Curso dtoToCurso(CursoDTO cursoDTO){
        Curso course = new Curso();
        course.setId(cursoDTO.id());
        course.setRutaAprendizaje(cursoDTO.rutaAprendizaje());
        course.setDescripcion(cursoDTO.descripcion());
        course.setNombre(cursoDTO.nombre());
        course.setProfesor(usuarioRepository.getReferenceById(cursoDTO.profesor().id()));
        course.setUsuario(cursoDTO.usuario());
        course.setActivo(cursoDTO.activo());
        course.setCategorias(cursoDTO.categorias());
        course.setBloques(cursoDTO.bloques());
        course.setAlta(cursoDTO.alta());
        course.setUrl_imagen_presentacion(cursoDTO.url_imagen_presentacion());
        course.setUrl_video_presentacion(cursoDTO.url_video_presentacion());
        course.setAuto_activate(cursoDTO.auto_activate());
        course.setSubtitle(cursoDTO.subtitle());

        return course;
    }

    public CursoDTO cursoToCursoDTO(Curso course){
        return new CursoDTO(
                course.getId(),
                course.getNombre(),
                course.getDescripcion(),
                course.getRutaAprendizaje(),
                course.getUsuario(),
                new UsuarioDTOTemp(course.getProfesor()),
                course.getActivo(),
                course.getCategorias(),
                course.getBloques(),
                course.getAlta(),
                course.getUrl_video_presentacion(),
                course.getUrl_imagen_presentacion(),
                course.getAuto_activate(),
                course.getSubtitle()
        );
    }
}
