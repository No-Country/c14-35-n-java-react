package com.learning.simplified.controllers;

import com.learning.simplified.dto.*;
import com.learning.simplified.entidades.Usuario;
import com.learning.simplified.services.UsuarioService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping()
    @Transactional
    public ResponseEntity<DatosUsuarioCreado> registrarUsuario(@RequestBody @Valid DatosCrearUsuarioDTO datosCrearUsuarioDTO,
                                                                UriComponentsBuilder uriComponentsBuilder) {
        Usuario usuario = usuarioService.registrarUsuario(new Usuario(datosCrearUsuarioDTO));
        DatosUsuarioCreado datosUsuarioCreado = new DatosUsuarioCreado(
                usuario.getEmail(),
                new RolDTO(
                            usuario.getRol().getEstudiante(),
                            usuario.getRol().getEducador(),
                            usuario.getRol().getAdministrador()
                            )
        );

        URI url = uriComponentsBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(url).body(datosUsuarioCreado);

    }

    @GetMapping()
    public ResponseEntity<RespuestaUsuarioDTO> register(@RequestBody @Valid DatosLoginUsuarioDTO datosLoginUsuarioDTO){
        return ResponseEntity.ok(usuarioService.login(datosLoginUsuarioDTO));
    }






}
