/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entities;

import com.learning.simplified.dto.DatosCrearUsuarioDTO;
import com.learning.simplified.dto.DatosLoginUsuarioDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author laura
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre; 
    private String apellido;
    private String email;
    private String password; 
    @Temporal(TemporalType.DATE)
    private LocalDate alta;
    @OneToOne
    private Rol rol;
    @ManyToMany
    private List<Curso> curso;

    public Usuario(DatosCrearUsuarioDTO datosCrearUsuarioDTO) {
        this.nombre="";
        this.apellido="";
        this.email=datosCrearUsuarioDTO.email();
        this.password=datosCrearUsuarioDTO.password();
        this.alta=LocalDate.now();
        this.rol= new Rol(datosCrearUsuarioDTO.rol());
        this.curso= new ArrayList<>();

    }

    public Usuario(DatosLoginUsuarioDTO datosLoginUsuarioDTO) {
        this.nombre="";
        this.apellido="";
        this.email=datosLoginUsuarioDTO.email();
        this.password=datosLoginUsuarioDTO.password();
        this.alta=null;
        this.rol= null;
        this.curso= new ArrayList<>();
    }

    ;

    
    
    
    
}