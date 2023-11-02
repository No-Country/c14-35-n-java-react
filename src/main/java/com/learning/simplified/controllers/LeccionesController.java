package com.learning.simplified.controllers;


import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.LeccionDTO;
import com.learning.simplified.services.CursoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/leccion")
public class LeccionesController {
    @Autowired
    private CursoService cursoService;
    @PostMapping("/add")
    public ResponseEntity<CursoDTO> addLeccion(@RequestBody @Valid LeccionDTO leccionDTO,
                                              UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.addLeccionToCurso(leccionDTO);
        return ResponseEntity.ok().body(course);

    }
}
