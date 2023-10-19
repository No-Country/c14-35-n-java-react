/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.learning.simplified.dto.CursoDTO;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 *
 * @author laura
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;

    @ManyToOne
    private RutaAprendizaje rutaAprendizaje;
    @ManyToMany
    private List<Usuario> usuario;
    @ManyToOne
    private Usuario profesor;
    private Boolean activo;
    @ManyToMany
    private List<Categoria> categorias;
    @OneToMany
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Bloque> bloques;
    @Temporal(TemporalType.DATE)
    private LocalDate alta;
    private String url_imagen_presentacion;
    private String url_video_presentacion;



    public Curso(CursoDTO curso, Usuario teacher) {
        this.nombre = curso.nombre();
        this.descripcion= curso.descripcion();
        this.rutaAprendizaje = null;
        this.usuario = new ArrayList<>();
        this.profesor= teacher;
        this.activo=false;
        this.categorias= new ArrayList<>();
        this.bloques=new ArrayList<>();
        this.alta=LocalDate.now();
        this.url_imagen_presentacion=curso.url_imagen_presentacion();
        this.url_video_presentacion=curso.url_video_presentacion();


    }

}
