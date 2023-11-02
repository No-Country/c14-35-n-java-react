package com.learning.simplified.controllers;

import com.learning.simplified.dto.CursoDTO;
import com.learning.simplified.dto.InscripcionDTO;
import com.learning.simplified.entities.Usuario;
import com.learning.simplified.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RequestMapping("/estudiante")
@RestController
public class UserControlador {

    @Autowired
    UsuarioService usuarioService;
    @PostMapping("/inscripcion")
    public ResponseEntity<Usuario> inscripcionCurso(@RequestBody InscripcionDTO inscripcionDTO) throws Exception {
        Usuario usuario = null;
        usuario = usuarioService.inscripcion(inscripcionDTO.getId_curso(),inscripcionDTO.getId_usuario());
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/abandonar-curso")
    public ResponseEntity<Usuario> desinscripcionCurso(@RequestBody InscripcionDTO inscripcionDTO) throws Exception {
        Usuario usuario = null;
        usuario = usuarioService.desinscripcion(inscripcionDTO.getId_curso(), inscripcionDTO.getId_usuario());

        return ResponseEntity.ok(usuario);
    }
}
