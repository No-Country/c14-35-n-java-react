/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.learning.simplified.dto.LeccionDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


/**
 *
 * @author laura
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Leccion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer num_leccion;
    private String titulo;
    private String url_recurso;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_bloque")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Bloque bloque;

    public Leccion(LeccionDTO leccionDTO) {
        this.num_leccion= leccionDTO.num_leccion();
        this.titulo = leccionDTO.titulo();
        this.url_recurso= leccionDTO.url_recurso();
    }
}
