package com.learning.simplified.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DatosCrearUsuarioDTO(
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Size(min = 0, max = 15)
        String password,
        @NotNull
        @Valid
        RolDTO rol

) {
}
