package com.learning.simplified.controllers;

import com.learning.simplified.dto.BloqueDTO;
import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.services.BloqueService;
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
@RequestMapping("/bloque")
public class BloqueController {
    @Autowired
    BloqueService bloqueService;
    @Autowired
    CursoService cursoService;

    @PostMapping("/add")
    public ResponseEntity<CursoDTO> addBloque(@RequestBody @Valid BloqueDTO bloqueDTO,
                                             UriComponentsBuilder uriComponentsBuilder){
        CursoDTO course = cursoService.addBloqueToCurso(bloqueDTO);
        return ResponseEntity.ok().body(course);

    }

}
