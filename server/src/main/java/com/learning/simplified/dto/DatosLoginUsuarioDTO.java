package com.learning.simplified.dto;

import jakarta.validation.constraints.NotBlank;

public record DatosLoginUsuarioDTO(@NotBlank String email, @NotBlank String password) {
}
