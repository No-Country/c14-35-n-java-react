package com.learning.simplified.dto;


import com.learning.simplified.enumeraciones.Rol;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRegistroDTO {

    String nombre;
    String apellido;
    String email;
    String password;
    String password2;
    Rol rol;

}
