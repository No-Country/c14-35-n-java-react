package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.entidades.Curso;
import com.learning.simplified.services.CursoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/all")
    public List<Curso> listarCursos(){
        return cursoService.findAll();
    }

    @PutMapping("/activate")
    public ResponseEntity<CursoDTO> activateCurso(@RequestBody @Valid CursoDTO cursoDTO,
                                             UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.activateCurso(cursoDTO);
        return ResponseEntity.ok().body(course);

    }

    @GetMapping("/allActive")
    public List<Curso> shorAllActiveCourse(){
        return cursoService.findAllActiveCourses();
    }








}
