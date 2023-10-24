package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.entities.Curso;
import com.learning.simplified.services.CursoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    private CursoService cursoService;

    @PostMapping("/add")
    public ResponseEntity<CursoDTO> addCurso(@RequestBody @Valid CursoDTO cursoDTO,
                                                         UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.createCurso(cursoDTO);
        URI url = uriComponentsBuilder.path("/curso/{id}").buildAndExpand(course.id()).toUri();
        return ResponseEntity.created(url).body(course);

    }

    //Muestra todos los cursos
    @GetMapping("/all")
    public List<Curso> listarCursos(){
        return cursoService.findAll();
    }

    //Activa un curso, requiere el id del curso en el body

    @PutMapping("/activate")
    public ResponseEntity<CursoDTO> activateCurso(@RequestBody @Valid CursoDTO cursoDTO,
                                             UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.activateCurso(cursoDTO);
        return ResponseEntity.ok().body(course);

    }

    //Muestra todos los cursos activos. Devuelve una lista de cursos, no está paginado

    @GetMapping("/allActive")
    public List<Curso> showAllActiveCourse(){
        return cursoService.findAllActiveCourses();
    }

    //TODO Armar un método para devolver todos los cursos activos paginados
    @GetMapping("/allCourses")
    public ResponseEntity<Page<Curso>> showActiveCourses(@PageableDefault(size = 10) Pageable paginacion) {
        return ResponseEntity.ok(cursoService.findActiveCourses(paginacion));

    }
    //Busca los cursos activos de un profesor por id, los devuelve ordenados de a 10
    @GetMapping("/active-teacher/{id}")
    public ResponseEntity<Page<Curso>> findActiveCoursesByTeacher(@PageableDefault(size = 10) Pageable paginacion, @PathVariable Long id) {
        return ResponseEntity.ok(cursoService.findByActivoTrue(paginacion, id));

    }

    //Buscar todos los cursos de un profesor, activos e inactivos

    @GetMapping("/teacher/{id}")
    public ResponseEntity<Page<Curso>> findAllCoursesByTeacher(@PageableDefault(size = 10) Pageable paginacion, @PathVariable Long id) {
        return ResponseEntity.ok(cursoService.findByTeacher(paginacion, id));

    }
}
