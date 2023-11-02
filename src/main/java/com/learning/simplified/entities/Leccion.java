/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.learning.simplified.entities;

import com.learning.simplified.dto.LeccionDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


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


    public Leccion(LeccionDTO leccionDTO) {
        this.num_leccion= leccionDTO.num_leccion();
        this.titulo = leccionDTO.titulo();
        this.url_recurso= leccionDTO.url_recurso();
    }
}
    

