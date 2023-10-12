/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entidades;

import com.learning.simplified.dto.DatosCrearUsuarioDTO;
import com.learning.simplified.dto.RolDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


/**
 *
 * @author laura
 */
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private Boolean estudiante;
    private Boolean educador;
    private Boolean administrador;

    public Rol(RolDTO rol) {
        this.estudiante= rol.estudiante();
        this.educador = rol.educador();
        this.administrador=rol.administrador();

    }
}
