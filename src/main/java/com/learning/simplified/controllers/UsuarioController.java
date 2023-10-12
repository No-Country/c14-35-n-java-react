package com.learning.simplified.controllers;

import com.learning.simplified.dto.DatosCrearUsuarioDTO;
import com.learning.simplified.dto.DatosUsuarioCreado;
import com.learning.simplified.entidades.Usuario;
import com.learning.simplified.services.UsuarioService;
import jakarta.transaction.Transactional;
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
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    @Transactional
    public ResponseEntity<DatosUsuarioCreado> registrarUsuario(@RequestBody @Valid DatosCrearUsuarioDTO datosCrearUsuarioDTO,
                                                                UriComponentsBuilder uriComponentsBuilder) {
        Usuario usuario = usuarioService.registrarUsuario(new Usuario(datosCrearUsuarioDTO));
        DatosUsuarioCreado datosUsuarioCreado = new DatosUsuarioCreado(usuario.getEmail());

        URI url = uriComponentsBuilder.path("/medicos/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(url).body(datosUsuarioCreado);

    }




}
