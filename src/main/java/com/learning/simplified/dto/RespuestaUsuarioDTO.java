package com.learning.simplified.dto;

import com.learning.simplified.entidades.Rol;

import java.time.LocalDate;

public record RespuestaUsuarioDTO(
                                    String nombre,
                                  String apellido,
                                  String email,
                                  LocalDate alta,
                                  RolDTO rol
    ){
}
