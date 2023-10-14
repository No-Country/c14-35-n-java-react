package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.DatosCrearUsuarioDTO;
import com.learning.simplified.dto.DatosUsuarioCreado;
import com.learning.simplified.services.CursoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    private CursoService cursoService;

    @PostMapping("/add")
    public ResponseEntity<CursoDTO> crearCurso(@RequestBody @Valid CursoDTO cursoDTO,
                                                         UriComponentsBuilder uriComponentsBuilder){
        URI url = uriComponentsBuilder.path("/cursos/{id}").buildAndExpand(usuario.getId()).toUri();
        return return ResponseEntity.created(url).body();

    }




}
