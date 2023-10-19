package com.learning.simplified.dto;

import java.time.LocalDate;

public record RespuestaUsuarioDTO(
                                    Long id,
                                    String nombre,
                                  String apellido,
                                  String email,
                                  LocalDate alta,
                                  RolDTO rol
    ){
}
