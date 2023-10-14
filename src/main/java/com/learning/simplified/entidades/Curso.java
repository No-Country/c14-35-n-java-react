/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entidades;

import jakarta.persistence.*;

import java.util.List;


/**
 *
 * @author laura
 */
@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nombre; 
    private String descripcion;

    @ManyToOne
    private RutaAprendizaje rutaAprendizaje;
    @ManyToMany
    private List<Usuario> usuario;

    //TODO Agregar atributo categoria o tipo para etiquetar los cursos

   
    
}
